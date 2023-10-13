// routes/students.js
const express = require('express');
const router = express.Router();
const stuDB = require("../db/stuDB")

// 增加学生信息 id name sex speciality ✅
router.post('/add', (req, res) => {
    // 获取请求体中的学生信息
    const student = req.body;
    if (Object.keys(student).length == 0 || !student) {
        console.log("参数不合法", student)
        res.status(400).send('参数不合法');
        return
    }
    // 执行插入操作
    stuDB.addStuInfo(student, (err, result) => {
        if (err) {
            res.status(500).send('添加学生信息失败');
        } else {
            res.status(201).send('学生信息已添加');
        }
    })
});

// 模糊查询 ✅
router.get("/search", (req, res) => {
    const keyword = req.query.keyword
    stuDB.blurSearch(keyword, (err, results) => {
        if (err) {
            res.status(500).send("查询失败")
        } else {
            res.status(200).json(results)
        }
    })
})


// 删除学生信息 ✅
router.get('/del', (req, res) => {
    const studentId = req.query.id;
    stuDB.delStuById(studentId, (err, result) => {
        if (err) {
            res.status(500).send('删除学生信息失败')
        } else {
            res.status(200).send('学生信息已删除')
        }
    })
});

// 更新学生信息 ✅
router.post('/edit', (req, res) => {
    const updatedStudent = req.body;
    stuDB.updateStuInfo(updatedStudent, (err, result) => {
        if (err) {
            res.status(500).send('更新学生信息失败');
        } else {
            res.status(200).send('学生信息已更新');
        }
    })

});

// 查询全部学生信息 ✅
router.get('/', (req, res) => {
    const id = req.query.id
    if (id) {
        stuDB.queryById(id, (err, results) => {
            if (err) {
                res.status(500).send('查询学生信息失败');
            } else {
                res.status(200).json(results);
            }
        })
    } else {
        stuDB.queryAll((err, results) => {
            if (err) {
                res.status(500).send('查询学生信息失败');
            } else {
                res.status(200).json(results);
            }
        })
    }
});



module.exports = router;
