import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { join as pathJoin } from 'path';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  logging: true,
  entities: [pathJoin(__dirname, '/entities/**/*.{js,ts}')],
  migrations: [pathJoin(__dirname, '/migration/**/8.{js,ts}')],
});
