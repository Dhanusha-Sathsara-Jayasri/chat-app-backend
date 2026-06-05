import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mnids06@MySQL',
  database: 'chat-app',
});

db.connect(err => {
  if (err) {
    console.log('Database connection failed');
    console.log(err);
  } else {
    console.log('Database connected');
  }
});

export default db;
