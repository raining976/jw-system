const mysql = require('mysql');

// 创建数据库连接
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin123',
  database: 'jw-system'
});

// 连接数据库
connection.connect((err) => {
  if (err) {
    console.error('连接到数据库失败：', err);
  } else {
    console.log('成功连接到数据库');
  }
});

// 执行查询操作
function query(sql, params, callback) {
  connection.query(sql, params, (err, results) => {
    if (err) {
      console.error('数据库查询失败：', err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
}

// 关闭数据库连接
function close() {
  connection.end((err) => {
    if (err) {
      console.error('关闭数据库连接失败：', err);
    } else {
      console.log('成功关闭数据库连接');
    }
  });
}

module.exports = {
  query,
  close
};
