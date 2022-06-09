import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongoServer = await MongoMemoryServer.create();

export const dbConnect = async () => {
  try {
    await mongoose.connect(mongoServer.getUri(), { dbName: "productsdb" });
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};
