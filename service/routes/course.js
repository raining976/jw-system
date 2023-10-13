// routes/course.js
const express = require('express')
const router = express.Router()
const courseDB = require("../db/courseDB")

// 查询所有课程 ✅
router.get('/', (req, res) => {
    courseDB.queryAll((err, results) => {
        if (err) {
            res.status(500).send("查询课程信息失败")
        } else {
            res.status(200).json(results)
        }
    })
})

// 添加课程信息 ✅
router.post('/add', (req, res) => {
    const course = req.body
    courseDB.addCourseInfo(course, (err, result) => {
        if (err) {
            res.status(500).send("添加课程信息失败")
        } else {
            res.status(200).send("添加课程信息成功")
        }
    })
})

// 修改课程信息 ✅
router.post('/edit', (req, res) => {
    const course = req.body
    courseDB.editCourseInfo(course, (err, result) => {
        if (err) {
            res.status(500).send("修改课程信息失败")
        } else {
            res.status(200).send("修改课程信息成功")
        }
    })

})

// 删除课程 ✅
router.get('/del', (req, res) => {
    const id = req.query.id
    courseDB.delCourse(id, (err, result) => {
        if (err) {
            res.status(500).send("删除课程失败")
        } else {
            res.status(200).send("删除课程成功")
        }
    })
})

// 模糊搜索 ✅
router.get('/search', (req, res) => {
    const keyword = req.query.keyword
    console.log('keyword',keyword)
    courseDB.blurSearch(keyword, (err, results) => {
        if (err) {
            res.status(500).send("查询失败")
        } else{
            res.status(200).json(results)
        }
    })
})

module.exports = router