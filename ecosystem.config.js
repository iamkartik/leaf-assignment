module.exports = {
  apps : [{
    name: 'API',
    script: './bin/www',
    instances: 'max',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      MONGODB_URI:'',
      GOOGLE_CLIENT_ID:'',
      GOOGLE_CLIENT_SECRET:''
    },
    env_production: {
      NODE_ENV: 'production',
      MONGODB_URI:'',
      GOOGLE_CLIENT_ID:'',
      GOOGLE_CLIENT_SECRET:''
    }
  }],
};
