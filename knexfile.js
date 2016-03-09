module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost:5432/password_validate'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
