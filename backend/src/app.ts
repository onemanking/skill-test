import express, { Request, Response } from 'express';
import cors from "cors";
import { PrismaClient } from '@prisma/client';
// import { movieRepository } from "./db/data-source";
import { Languages } from './prisma/sql/index';

const countries = [
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia',
  'Brazil', 'Canada', 'Denmark', 'Egypt', 'France', 'Germany',
  'India', 'Indonesia', 'Japan', 'Kenya', 'Mexico', 'Nepal', 'Norway',
  'Pakistan', 'Qatar', 'Russia', 'Singapore', 'Spain', 'Thailand', 'USA'
];

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;