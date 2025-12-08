const Redis = require("ioredis");
const dotenv = require("dotenv");

dotenv.config();
async function runRedis() {
    const redis=new Redis(process.env.UPSTASH_REDIS_URL);
    
    await redis.set("foo", "bar");
    console.log("Redis Done");
}

module.exports = runRedis;
