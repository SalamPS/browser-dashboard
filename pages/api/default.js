// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const AF = process.env.AF || ''
const SP = process.env.SP || ''
const host = process.env.SQL_HOST || ''
const user = process.env.SQL_USER || ''
const password = process.env.SQL_PASSWORD || ''
const database = process.env.SQL_DATABASE || ''
import mysql from 'mysql'

export default function handler(req, res) {
  let sql = ''
  const cookie = req.cookies.token;
  const db = mysql.createConnection({
    host: host,  
    user: user,
    password: password,
    database: database, 
  });
  db.connect((err) => {
    if (err) {
      console.error('Koneksi ke database gagal:', err);
      return;
    }
    console.log('Terhubung ke database MySQL');
  });
  if (req.method === 'GET') {
    if (cookie == AF) sql = `SELECT * FROM todo WHERE id_user = 'arijf'`;
    else if (cookie == SP) sql = `SELECT * FROM todo WHERE id_user = 'salamp'`
    else {
      res.status(200).json({
        "todo": [],
        "widget": []
      })
    }
  }
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error saat mengambil data:', err);
      res.status(500).send('Terjadi kesalahan saat mengambil data dari database');
      return;
    }
    res.json(results);
  });
}
