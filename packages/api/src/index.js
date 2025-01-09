import dotenv from "dotenv";

console.log(process.env.NODE_ENV, '----process.env')
dotenv.config({
    path: [
        '.env',
        `.env.${process.env.NODE_ENV}`,
    ]
});

setTimeout(() => {
    console.log(process.env.POSTGRESQL_URL, '----process.env.POSTGRESQL_URL')
}, 2000);

import start from './main.js';

const app = start();

export default app;