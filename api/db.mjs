import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Tools',
  password: '12345',
  port: 5432,
});
// app.listen(8080, (🙁)

export const tools = "./tools.mjs";
export default pool;