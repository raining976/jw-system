// app.js
const express = require('express'); // express 基于node
const bodyParser = require('body-parser');
const app = express();
// 引入cors （允许跨域的中间件） 
const cors = require("cors") // cors 是一个依赖
// 使用cors中间件来允许跨域请求
app.use(cors())

// 使用body-parser中间件来解析请求体
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// 解析表单数据的中间件
app.use(express.urlencoded({ extended: false }));



// 引入学生路由
const studentsRouter = require('./routes/students');
app.use('/students', studentsRouter);
// 引入课程路由
const courseRouter = require("./routes/course")
app.use('/course',courseRouter)
// 引入选课表路由
const scRouter = require("./routes/sc")
app.use("/sc",scRouter)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 127.0.0.1:3000/students
