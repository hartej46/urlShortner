import Redis from "ioredis";

const client = new Redis({
    host: process.env.URL_REDIS,
    port: parseInt(process.env.PORT_REDIS) || 19991,
    username : process.env.USERNAME,
    password: process.env.REDIS_PASSWORD
});

export default client