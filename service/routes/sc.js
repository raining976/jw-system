// routes/sc.js
const express = require("express")
const router = express.Router()
const scDB = require("../db/scDB")
const stuDB = require("../db/stuDB")
const courseDB = require("../db/courseDB")


router.get("/all", (req, res)=>{
    const keyword = req.query.keyword
    // 空表示全部匹配
    scDB.queryAll((err,results)=>{
        if(err){
            res.status(500).send("查询选课表信息失败")
        }else{
            res.status(200).json(results)
        }
    })

})

router.post('/add', (req,res)=>{
    const stu_id = req.body.stu_id
    const cou_id = req.body.cou_id
    if(stu_id && cou_id){
        scDB.addSc(stu_id,cou_id,(err,result)=>{
            if(err){
                res.status(500).send("添加选课信息失败")
            }else{
                res.status(200).send("添加选课信息成功")
            }
        })
    }
})



module.exports = router