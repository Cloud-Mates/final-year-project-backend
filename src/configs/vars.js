import dotenv from 'dotenv';
dotenv.config();
// await import('./server');

const vars = {
  env: process.env.NODE_ENV || "dev",
  port: process.env.PORT || "4000",
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
};

export default vars;