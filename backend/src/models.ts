import { Sequelize, Model, DataTypes, UUID, UUIDV4 } from "sequelize";
import dotenv from "dotenv";
import logger from "./logger";

dotenv.config();

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: (msg) => logger.debug(msg),
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    logger.info(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
    throw error;
  }
}

class Demo extends Model {
  public id!: string;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Demo.init(
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Demo",
  }
);

class Frame extends Model {
  public id!: string;
  public html!: string;
  public order!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Frame.init(
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    html: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Frame",
  }
);

Demo.hasMany(Frame, { as: "frames", foreignKey: "demoId" });
Frame.belongsTo(Demo, { as: "demo", foreignKey: "demoId" });

async function syncModels() {
  try {
    await sequelize.sync({ alter: true });
    logger.info("Models synchronized with the database.");
  } catch (error) {
    logger.error("Error synchronizing models:", error);
    throw error;
  }
}

export { sequelize, Demo, Frame, testConnection, syncModels };
