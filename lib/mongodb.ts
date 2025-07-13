import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) throw new Error("Mongo URI missing");

export async function connectMongo() {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(MONGODB_URI);
}

const BlogSchema = new mongoose.Schema({
  url: String,
  text: String,
  summary: String,
});

export const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
