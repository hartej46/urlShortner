import Redis from "ioredis";

const client = new Redis({
    socket: {
        host: process.env.URL_REDIS,
        port: 16132
    },
    username : process.env.USERNAME,
    password: process.env.REDIS_PASSWORD
});

export default client