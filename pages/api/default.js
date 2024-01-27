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
  let result = [];
  const cookie = req.cookies.token;
  const { dest, id } = req.query;
  if (req.method === 'GET') {
    if (cookie == AF) sql = `SELECT * FROM todo WHERE id_user = '${user1}'`
    else if (cookie == SP) sql = `SELECT * FROM todo WHERE id_user = '${user2}'`
    else res.status(200).send([]);
  }
  else if (req.method === 'POST') {
    let user = false
    try {
      if (cookie == AF) user = user1
      else if (cookie == SP) user = user2

      if (user) {
        const data = req.body;
        if (dest == 'todo') 
        sql = `INSERT INTO todo (\`id_todo\`, \`title\`, \`Desc\`, \`dead\`, \`vital\`, \`Index\`, \`clear\`, \`id_user\`) VALUES (${data.id_todo},'${data.title}','${data.Desc}',${data.dead},${data.vital},${data.Index},${data.clear},'${user}')`
        else if (dest == 'widget') 
        sql = `
          -- INSERT INTO todo (id_todo, title, Desc, dead, vital, Index, clear, id_user) 
          -- VALUES (id_todo,'title','desc',dead,vital,Index,Clear,${user})
        `
      }
      else res.status(500).json({ error: "Internal Server Error" });
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  else if (req.method === 'PUT') {
    let user = false;
    try {
      if (cookie == AF) user = user1;
      else if (cookie == SP) user = user2;

      if (user) {
        const data = req.body;
        if (dest == 'todo') {
          sql = `UPDATE todo SET clear=${2} WHERE id_todo=${data.id_todo} AND id_user='${user}'`;
        } else if (dest == 'widget') {
          sql = `
            -- UPDATE todo SET title='title', Desc='desc', dead=dead, vital=vital, \`Index\`=Index, clear=Clear WHERE id_todo=id_todo AND id_user='${user}'
          `;
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
  }
  else if (req.method === 'DELETE') {
    try {
      if (cookie == AF || cookie == SP) {
        if (dest == 'todo') 
        sql = `DELETE FROM todo WHERE id_todo = ${id}`
        else if (dest == 'widget') 
        sql = `
          -- INSERT INTO todo (id_todo, title, Desc, dead, vital, Index, clear, id_user) 
          -- VALUES (id_todo,'title','desc',dead,vital,Index,Clear,${user})
        `
      }
      else res.status(500).json({ error: "Internal Server Error" });
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
      result = results;
      if (req.method == 'GET') res.status(200).json(results)
    });
    switch(req.method) {
      case 'PUT' : res.status(200).send({put: true}); break;
      case 'POST' : res.status(201).send({posted: true}); break;
      case 'DELETE' : res.status(204); break;
    }
  }
}
