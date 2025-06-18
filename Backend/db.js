import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://postgres:Test123!@localhost:5432/shopping_cart',
});

export default pool;
