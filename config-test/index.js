require('dotenv').config({
    path: process.env.NODE_ENVIRONMENT === 'production' ? '.production.env' : '.env',
})

console.log('aaa', process.env.aaa);
console.log('bbb', process.env.bbb)