// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const AF = process.env.AF || ''
const SP = process.env.SP || ''
const host = process.env.SQL_HOST || ''
const sqluser = process.env.SQL_USER || ''
const password = process.env.SQL_PASSWORD || ''
const database = process.env.SQL_DATABASE || ''
const user1 = process.env.USER1 || '01'
const user2 = process.env.USER2 || '02'

import mysql from 'mysql'

export default function handler(req, res) {
  const cookie = req.cookies.token;
  const { dest, id, type, list, token } = req.query;

  let sql = ''
  let user = false
  if (cookie == AF) user = user1
  else if (cookie == SP) user = user2
  
  try {
    switch(req.method) {
      case 'GET' : 
        if (cookie == AF || cookie == SP) {
          if (dest == 'todo') sql = `SELECT \`id_todo\`, \`title\`, \`Desc\`, \`dead\`, \`vital\`, \`Index\`, \`clear\``
          else if (dest == 'short') sql = `SELECT \`id_short\`, \`name\`, \`url\`, \`favicon\``
          else if (dest == 'widget') sql = `SELECT \`id_widget\`, \`type\`, \`id_ref\``
          else if (dest == 'widget_spotTask') sql = `SELECT \`id_widget_spotTask\`, \`name\`, \`matkul\`, \`part\`, \`url\`, \`dead\``

          sql += ` FROM ${dest} WHERE id_user = '${user}'`
        }
        else if (dest == 'user') sql = `SELECT \`id_user\`, \`nama\`, \`token\` from user WHERE id_user='${id}' AND token='${token}'`
        else res.status(200).send({guest: true})
      break

      case 'PUT':
        if (user) {
          const data = req.body;
          if (dest == 'todo') {
            if (type == 'merge') data.forEach(data => {
              sql += `UPDATE todo SET \`title\`='${data.title}', \`Desc\`='${data.Desc}', \`dead\`=${data.dead}, \`vital\`=${data.vital}, \`Index\`=${data.Index}, \`clear\`=${data.clear} WHERE id_todo=${data.id_todo} AND id_user='${user}'; `
            })
            else sql = `UPDATE todo SET clear=${2} WHERE id_todo=${data.id_todo} AND id_user='${user}'`;
          } 
          else if (dest == 'short') {
            if (type == 'merge') data.forEach(data => {
              sql += `(name, url, id_user) VALUES ('${data.name}', '${data.url}', '${user}'); `
            })
            else sql = `UPDATE todo SET clear=${2} WHERE id_todo=${data.id_todo} AND id_user='${user}'`;
          } 
          else if (dest == 'widget') {
            sql = `
              -- UPDATE todo SET title='title', Desc='desc', dead=dead, vital=vital, \`Index\`=Index, clear=Clear WHERE id_todo=id_todo AND id_user='${user}'
            `;
          }
        }
      break

      case 'POST':
        if (user) {
          const data = req.body;
          if (dest == 'todo') {
            if (type == 'merge') data.forEach(data => {
              sql += `INSERT INTO todo (\`id_todo\`, \`title\`, \`Desc\`, \`dead\`, \`vital\`, \`Index\`, \`clear\`, \`id_user\`) VALUES (${data.id_todo},'${data.title}','${data.Desc}',${data.dead},${data.vital},${data.Index},${data.clear},'${user}'); `
            })
            else sql = `INSERT INTO todo (\`id_todo\`, \`title\`, \`Desc\`, \`dead\`, \`vital\`, \`Index\`, \`clear\`, \`id_user\`) VALUES (${data.id_todo},'${data.title}','${data.Desc}',${data.dead},${data.vital},${data.Index},${data.clear},'${user}')`
          }
          else if (dest == 'short') {
            if (type == 'merge') data.forEach(data => {
              sql += `INSERT INTO short (id_short, name, url, favicon, id_user) VALUES (${data.id_short}, '${data.name}', '${data.url}', ${data.favicon}, '${user}'); `
            })
            else sql = `INSERT INTO short (id_short, name, url, favicon, id_user) VALUES (${data.id_short}, '${data.name}', '${data.url}', ${data.favicon}, '${user}')`
          }
          else if (dest == 'widget') 
          sql = `
            -- INSERT INTO todo (id_todo, title, Desc, dead, vital, Index, clear, id_user) 
            -- VALUES (id_todo,'title','desc',dead,vital,Index,Clear,${user})
          `
        }
      break

      case 'DELETE':
        if (cookie == AF || cookie == SP) {
          if (id) sql = `DELETE FROM ${dest} WHERE id_${dest} = ${id}`
          else if (list) sql=`DELETE FROM ${dest} WHERE id_${dest} IN (${list})`
        }
      break
    }
  }
  catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
  if (sql.length) {
    const db = mysql.createConnection({
      host: host,  
      user: sqluser,
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
      if (req.method == 'GET') res.status(200).json(results)
    });
    switch(req.method) {
      case 'PUT' : res.status(200).send({put: true}); break;
      case 'POST' : res.status(201).send({posted: true}); break;
      case 'DELETE' : res.status(204); break;
    }
    db.end((err) => {
      if (err) {console.error('Error saat menutup koneksi:', err);
        return;
      }
      console.log('Koneksi ke database ditutup');
    });
  }
}
