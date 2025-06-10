import crypto from "crypto";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { PrismaClient, Prisma } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const countryCache = new Map<
  string,
  { data: any; etag: string; expires: number }
>();

const cacheMaxAge = parseInt(process.env.CACHE_MAX_AGE || "60", 10);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/insert", async (req: Request, res: Response, next: NextFunction) => {
  const { country, capital, lat, lng, population, capitalType } = req.body;

  if (
    !country ||
    !capital ||
    typeof lat !== "number" ||
    typeof lng !== "number" ||
    typeof population !== "number" ||
    !capitalType
  ) {
    res.status(400).json({ error: "Invalid input data" });
    return;
  }

  try {
    const newCountry = await prisma.country.upsert({
      where: { country },
      update: {},
      create: {
        country,
        capital,
        lat,
        lng,
        population,
        capitalType,
      },
    });

    res.status(201).json(newCountry);
  } catch (error) {
    next(error);
  }
});

app.get(
  "/countries",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { search, skip, take } = req.query;

      const where = search
        ? {
            OR: [
              {
                country: {
                  contains: String(search),
                  mode: Prisma.QueryMode.insensitive,
                },
              },
              {
                capital: {
                  contains: String(search),
                  mode: Prisma.QueryMode.insensitive,
                },
              },
            ],
          }
        : {};

      const cacheKey = JSON.stringify({ search, skip, take });
      const now = Date.now();
      const cached = countryCache.get(cacheKey);
      if (cached && cached.expires > now) {
        if (req.headers["if-none-match"] === cached.etag) {
          res.status(304).end();
          return;
        }
        res.setHeader("ETag", cached.etag);
        res.setHeader("Cache-Control", `public, max-age=${cacheMaxAge}`);
        res.status(200).json(cached.data);
        return;
      }

      const countries = await prisma.country.findMany({
        where,
        skip: skip ? Number(skip) : undefined,
        take: take ? Number(take) : undefined,
      });

      // ETag with hash
      const etag = crypto
        .createHash("md5")
        .update(JSON.stringify(countries))
        .digest("hex");

      countryCache.set(cacheKey, {
        data: countries,
        etag,
        expires: now + cacheMaxAge * 1000,
      });

      // Check If-None-Match header
      if (req.headers["if-none-match"] === etag) {
        res.status(304).end();
        return;
      }

      res.setHeader("ETag", etag);
      res.setHeader("Cache-Control", `public, max-age=${cacheMaxAge}`);
      res.status(200).json(countries);
    } catch (error) {
      next(error);
    }
  }
);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: "Internal Server Error" });
});

// Shutdown for Prisma
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export default app;
