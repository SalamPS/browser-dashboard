// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mysql from 'mysql'
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  const cookie = req.cookies;
  const { dest, id, type, list, token } = req.query;

  let sql = ''
  const ALLOW = cookie.id_user
  
  try {
    switch(req.method) {
      case 'GET' : 
        if (ALLOW) {
          sql = `SELECT \`id_${dest}\``
          
          const coll = ['todo', 'short', 'widget']
          switch (dest) {
            case 'todo' : sql +=', `title`, `Desc`, `dead`, `Index`, `clear`'
            break
            case 'short' : sql +=', `name`, `url`, `favicon`'
            break
            case 'widget' : sql +=', `type`'
            break

            case 'widget_spotTask' : sql +=`, \`name\`, \`matkul\`, \`part\`, \`url\`, \`dead\` FROM ${dest} WHERE NIM = ${cookie.NIM}`
            break
          }
          if (coll.find(item => item == dest)) sql += ` FROM ${dest} WHERE id_user = '${ALLOW}'`
        }
        else if (dest == 'user') sql =`SELECT \`id_${dest}\`, \`nama\`, \`token\` FROM ${dest} WHERE id_user = '${id}'`
        else res.status(200).send({guest: true})
      break

      case 'PUT':
        if (ALLOW) {
          const data = req.body;
          sql += `UPDATE ${dest} SET `
          if (dest == 'todo') {
            switch (type) {
              case 'merge' : 
              data.forEach(data => {
                sql += `\`title\`='${data.title}', \`Desc\`='${data.Desc}', \`dead\`=${data.dead}, \`Index\`=${data.Index}, \`clear\`=${data.clear} WHERE id_todo=${data.id_todo} AND id_user='${ALLOW}'; `
              })
              break

              case 'single' : 
                sql += `\`title\`='${data.title}', \`Desc\`='${data.Desc}', \`dead\`=${data.dead}`
              break

              default:
                sql += `clear=${2}`
            }
          } 
          else if (dest == 'short') {
            switch (type) {
              case 'merge' : 
              data.forEach(data => {
                sql += `name='${data.name}', url='${data.url}', id_user='${ALLOW}' `
              })
              break
            }
          } 
          else if (dest == 'widget') {
            sql = `
              -- UPDATE todo SET title='title', Desc='desc', dead=dead, \`Index\`=Index, clear=Clear WHERE id_todo=id_todo AND id_user='${ALLOW}'
            `;
          }

          if (type != 'merge') sql += ` WHERE id_todo=${data[`id_${dest}`]} AND id_user='${ALLOW}'`
        }
      break

      case 'POST':
        if (ALLOW) {
          const data = req.body;
          if (dest == 'todo') {
            if (type == 'merge') data.forEach(data => {
              sql += `INSERT INTO todo (\`id_todo\`, \`title\`, \`Desc\`, \`dead\`, \`Index\`, \`clear\`, \`id_user\`) VALUES (${data.id_todo},'${data.title}','${data.Desc}',${data.dead},${data.Index},${data.clear},'${ALLOW}'); `
            })
            else sql = `INSERT INTO todo (\`id_todo\`, \`title\`, \`Desc\`, \`dead\`, \`Index\`, \`clear\`, \`id_user\`) VALUES (${data.id_todo},'${data.title}','${data.Desc}',${data.dead},${data.Index},${data.clear},'${ALLOW}')`
          }
          else if (dest == 'short') {
            if (type == 'merge') data.forEach(data => {
              sql += `INSERT INTO short (id_short, name, url, favicon, id_user) VALUES (${data.id_short}, '${data.name}', '${data.url}', ${data.favicon}, '${ALLOW}'); `
            })
            else sql = `INSERT INTO short (id_short, name, url, favicon, id_user) VALUES (${data.id_short}, '${data.name}', '${data.url}', ${data.favicon}, '${ALLOW}')`
          }
          else if (dest == 'widget')
            if (type == 'merge') data.forEach(data => {
              sql += `INSERT INTO widget (id_widget, type, id_user) VALUES (${data.id_widget}, '${data.type}', '${ALLOW}'); `
            })
            else sql = `INSERT INTO widget (id_widget, type, id_user) VALUES (${data.id_widget}, '${data.type}', '${ALLOW}')`
        }
      break

      case 'DELETE':
        if (ALLOW) {
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
    const HOST = process.env.SQL_HOST || 'localhost'
    const USER = process.env.SQL_USER || 'user'
    const PASSWORD = process.env.SQL_PASSWORD || 'password'
    const DATABASE = process.env.SQL_DATABASE || 'database'
    const db = mysql.createConnection({
      host: HOST,
      user: USER,
      password: PASSWORD,
      database: DATABASE,
    });
    db.connect((err) => {
      if (err) {
        console.error('Koneksi ke database gagal:', err);
        return;
      }
      console.log('Terhubung ke database MySQL');
    });
    db.query(sql, async (err, results) => {
      if (err) {
        console.error('Error while Querying Data:', err);
        res.status(500).send('Error while Querying Data');
        return;
      }
      if (req.method == 'GET' && dest != 'user') res.status(200).json(results)
      else if (dest == 'user') {
        const isMatch = await bcrypt.compare(token, results[0].token);
        if (isMatch) {
          res.status(200).json(results);
        } else {
          res.status(401).json([])
        }
      }
    });
    switch(req.method) {
      case 'PUT' : res.status(200).send({put: true}); break;
      case 'POST' : res.status(201).send({posted: true}); break;
      case 'DELETE' : res.status(204).send(); break;
    }
    db.end((err) => {
      if (err) {console.error('Error saat menutup koneksi:', err);
        return;
      }
      console.log('Koneksi ke database ditutup');
    });
  }
}
