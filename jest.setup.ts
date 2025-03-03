import dotenv from 'dotenv';

dotenv.config();

Object.defineProperty(global, 'import', {
  value: {
    meta: {
      env: {
        VITE_APP_VERSION: process.env.VITE_APP_VERSION,
      },
    },
  },
});
