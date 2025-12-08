// backend/lib/redis.js
const Redis = require("ioredis");
const dotenv = require("dotenv");

dotenv.config();

// Create Redis client once
const redis = new Redis(process.env.UPSTASH_REDIS_URL);

redis.on("connect", () => console.log("Redis connected"));
redis.on("error", (err) => console.log("Redis Error:", err));

module.exports = redis;
