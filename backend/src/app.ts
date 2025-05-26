import express, { Request, Response } from 'express';
import cors from "cors";
// import { movieRepository } from "./db/data-source";

const countries = [
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia',
  'Brazil', 'Canada', 'Denmark', 'Egypt', 'France', 'Germany',
  'India', 'Indonesia', 'Japan', 'Kenya', 'Mexico', 'Nepal', 'Norway',
  'Pakistan', 'Qatar', 'Russia', 'Singapore', 'Spain', 'Thailand', 'USA'
];

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.get('/country/search', (req: Request, res: Response) => {
  const name = (req.query.name as string || '').toLowerCase();

  if (!name) {
    res.status(400).json({ error: 'Query param "name" is required' });
    return;
  }

  const matches = countries.filter(country =>
    country.toLowerCase().includes(name)
  );

  res.json({ results: matches });
});

export default app;