const BASE_URL = process.env.NODE_ENV === 'development' ? process.env.BASE_URL : process.env.BASE_URL
const API_KEY = process.env.NODE_ENV === 'development' ? process.env.API_KEY : process.env.API_KEY

console.log("MODE : " + process.env.NODE_ENV)

export{BASE_URL,API_KEY}