import Redis from "ioredis";

const client = new Redis({
    host: process.env.URL_REDIS,
    port: 6379,
    password: process.env.REDIS_PASSWORD
});

export default client