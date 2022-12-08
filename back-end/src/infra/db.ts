import mongoose from "mongoose";

class Database {
  private MONGO_URL = process.env.MONGO_URL || "";

  constructor() {
    this.MONGO_URL;
  }

  connect() {
    mongoose.connect(this.MONGO_URL, () => {
      console.log("Database connected!");
    });
  }
}

export default Database;
