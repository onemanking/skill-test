import request from "supertest";
import app from "../src/app";

describe("Countries API", () => {
  it("GET /countries returns 200 and array", async () => {
    const res = await request(app).get("/countries");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /countries?search returns filtered results", async () => {
    const res = await request(app).get("/countries?search=land");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    if (res.body.length > 0) {
      expect(
        res.body.some(
          (c: any) =>
            c.country.toLowerCase().includes("land") ||
            c.capital.toLowerCase().includes("land")
        )
      ).toBe(true);
    }
  });

  it("POST /insert creates or upserts a country", async () => {
    const payload = {
      country: "Testland",
      capital: "TestCapital",
      lat: 10,
      lng: 20,
      population: 123456,
      capitalType: "primary",
    };
    const res = await request(app).post("/insert").send(payload);
    expect([200, 201]).toContain(res.status);
    expect(res.body.country).toBe("Testland");
  });

  it("GET /countries supports ETag", async () => {
    const first = await request(app).get("/countries");
    expect(first.status).toBe(200);
    const etag = first.headers["etag"];
    expect(etag).toBeDefined();
    const second = await request(app)
      .get("/countries")
      .set("If-None-Match", etag);
    expect(second.status).toBe(304);
  });
});
