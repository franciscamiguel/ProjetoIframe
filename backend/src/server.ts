import app from "./app";
import { testConnection, syncModels } from "./models";
import dotenv from "dotenv";
import logger from "./logger";

dotenv.config();

const PORT = process.env.PORT || 3001;

async function init() {
  try {
    await testConnection();
    await syncModels();

    app.listen(PORT, () => {
      logger.info(`Express App Listening on Port ${PORT}`);
    });
  } catch (error) {
    logger.error(`Failed to start the application:`, error);
    process.exit(1);
  }
}

init();
