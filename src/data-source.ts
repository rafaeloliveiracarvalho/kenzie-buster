import "reflect-metadata";
import { DataSource } from "typeorm";
import * as path from "path";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const AppDataSourceDev = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  logging: true,
  entities: [path.join(__dirname, "./entities/**/*.{js,ts}")],
  migrations: [path.join(__dirname, "./migrations/**/*.{js,ts}")],
});

const AppDataSourceProd = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  logging: true,
  ssl: { rejectUnauthorized: false },
  entities: [path.join(__dirname, "./entities/**/*.{js,ts}")],
  migrations: [path.join(__dirname, "./migrations/**/*.{js,ts}")],
});

export default process.env.NODE_ENV === "development"
  ? AppDataSourceDev
  : AppDataSourceProd;
