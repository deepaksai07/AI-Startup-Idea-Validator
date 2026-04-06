import { Client } from 'pg';
import fs from 'fs';

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  
  try {
    await client.connect();
    console.log("Connected directly! Reading setup.sql framework...");
    let sql = fs.readFileSync('prisma/setup.sql', 'utf16le');
    sql = sql.replace(/^\uFEFF/, '');
    await client.query(sql);
    console.log('Successfully pushed Prisma schema directly to your Neon Database using Native Driver!');
    await client.end();
  } catch (err) {
    console.error('Failed to run setup:', err);
  }
}

main();
