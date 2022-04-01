export default () => ({
  environment: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
  database: {
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN
  }
});
