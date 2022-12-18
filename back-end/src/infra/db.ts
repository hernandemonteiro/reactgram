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

    // let bucket;

    // mongoose.connection.on("open", async () => {
    //   var db = await mongoose.connections[0].db;

    //   bucket = new mongoose.mongo.GridFSBucket(db, {
    //     bucketName: "uploads",
    //   });
    //   console.log("Database connected!");
    //   console.log("Uploads Bucket created!");
    //   console.log(bucket);
    // });
  }
}

export default Database;
