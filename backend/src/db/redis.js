import Redis from "ioredis";
const redisOptions = {
    host: process.env.URL_REDIS,
    port: parseInt(process.env.PORT_REDIS) || 19991,
    username: process.env.REDIS_USERNAME || "default",
    password: process.env.REDIS_PASSWORD,
    connectTimeout: 15000, 
    maxRetriesPerRequest: null, 
    retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);
        return delay; 
    }
};

const client = new Redis(redisOptions);

client.on("connect", () => {
    console.log("🔄 Redis connection initiated...");
});

client.on("ready", () => {
    console.log("✅ Redis client is ready and connected securely!");
});

client.on("error", (err) => {
    console.error("❌ Redis Client Error:", err.message);
});

export default client;