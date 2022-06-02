import app from "./app";
import AppDataSource from "./data-source";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const PORT = process.env.PORT || 3000;

AppDataSource.initialize().then((res) => {
  console.log(`Database is running: ${res.isInitialized}`);

  app.listen(PORT, () => {
    console.log(`App is running!!!\nhttp://localhost:${PORT}`);
  });
});
