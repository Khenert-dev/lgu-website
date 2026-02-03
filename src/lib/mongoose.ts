import mongoose from "mongoose"

type MongooseCache = {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined
}

const cache: MongooseCache =
  global.mongooseCache ?? { conn: null, promise: null }

if (!global.mongooseCache) {
  global.mongooseCache = cache
}

function getMongoUri(): string {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error("❌ MONGODB_URI is missing in .env.local")
  }
  return uri
}

export async function connectDB() {
  if (cache.conn) return cache.conn

  if (!cache.promise) {
    const uri = getMongoUri()

    cache.promise = mongoose.connect(uri, {
      dbName: "lgu",
      bufferCommands: false,
    })
  }

  cache.conn = await cache.promise
  return cache.conn
}
