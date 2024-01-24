// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const AF = process.env.AF || ''
const SP = process.env.SP || ''
const host = process.env.SQL_HOST || ''
const user = process.env.SQL_USER || ''
const password = process.env.SQL_PASSWORD || ''
const database = process.env.SQL_DATABASE || ''
const user1 = process.env.USER1 || '01'
const user2 = process.env.USER2 || '02'

import mysql from 'mysql'

export default function handler(req, res) {
  let sql = ''
  const cookie = req.cookies.token;
  const { dest, id } = req.query;
  if (req.method === 'GET') {
    if (cookie == AF) sql = `SELECT * FROM todo WHERE id_user = '${user1}'`
    else if (cookie == SP) sql = `SELECT * FROM todo WHERE id_user = '${user2}'`
    else res.status(200).json([])
  }
  else if (req.method === 'POST') {
    let user = false
    try {
      if (cookie == AF) user = user1
      else if (cookie == SP) user = user2

      if (user) {
        const data = req.body;
        data.id_todo = Math.floor(data.id_todo / 1000)
        data.dead = new Date(data.dead).getTime() / 1000
        if (dest == 'todo') 
        sql = `INSERT INTO todo (\`id_todo\`, \`title\`, \`Desc\`, \`dead\`, \`vital\`, \`Index\`, \`clear\`, \`id_user\`) VALUES (${data.id_todo},'${data.title}','${data.Desc}',${data.dead},${data.vital},${data.Index},${data.clear},'${user}')`
        else if (dest == 'widget') 
        sql = `
          -- INSERT INTO todo (id_todo, title, Desc, dead, vital, Index, clear, id_user) 
          -- VALUES (id_todo,'title','desc',dead,vital,Index,Clear,${user})
        `
      }
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  if (sql.length) {
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
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error while Querying Data:', err);
        res.status(500).send('Error while Querying Data');
        return;
      }
      res.status(200).json(results);
    });
  }
}
