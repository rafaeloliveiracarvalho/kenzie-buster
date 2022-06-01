import "reflect-metadata";
import { DataSource } from "typeorm";
import * as path from "path";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DB_URL,
  logging: true,
  ssl: { rejectUnauthorized: false },
  entities: [path.join(__dirname, "./entities/**/*.{js,ts}")],
  migrations: [path.join(__dirname, "./migrations/**/*.{js,ts}")],
});
