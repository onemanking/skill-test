import { PrismaClient } from "@prisma/client";
import countries from "../mockup/country.json";

const prisma = new PrismaClient();

async function main() {
  for (const c of countries) {
    await prisma.country.upsert({
      where: { country: c.country },
      update: {},
      create: {
        country: c.country,
        capital: c.capital,
        lat: c.lat,
        lng: c.lng,
        population: c.population,
        capitalType: c.capitalType,
      },
    });

    console.log(`Inserted or updated country: ${c.country}`);
  }
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
