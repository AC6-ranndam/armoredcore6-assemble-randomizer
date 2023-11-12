import { Sequelize } from 'sequelize';

// PostgreSQLに接続するための設定
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'test',
  database: 'ac6',
});

export async function handle({ event, resolve }) {
  const results = await sequelize.query('SELECT * FROM parts.partslist');

  event.locals.myData = results[0][0];//各種類のパーツを取得できているはず
  console.log(results[0][0]);
  return resolve(event);
}
