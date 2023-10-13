const db = require('./db')

// 查询所有课程
function queryAll(cb) {
    db.query("select * from course", (err, res) => {
        if (err) {
            console.error(err);
            cb(err, null)
        } else {
            cb(null, res)
        }
    })
}

// 根据id查询课程
function queryById(id, cb) {
    db.query("select * from course where id = ?", id, (err, res) => {
        if (err) {
            console.error(err);
            cb(err, null)
        } else {
            cb(null, res)
        }
    })
}

// 添加课程信息
function addCourseInfo(course, cb) {
    db.query('insert into course set ?', course, (err, res) => {
        if (err) {
            console.error(err);
            cb(err, null)
        } else {
            cb(null, res)
        }
    })

}

// 修改课程信息
function editCourseInfo(course, cb) {
    const id = course.id
    db.query('update course set ? where id = ?', [course, id], (err, res) => {
        if (err) {
            console.error(err);
            cb(err, null)
        } else {
            cb(null, res)
        }
    })
}

// 删除课程信息
function delCourse(id, cb) {
    db.query('delete from course where id = ?', id, (err, res) => {
        if (err) {
            console.error(err);
            cb(err, null)
        } else {
            cb(null, res)
        }
    })
}

// 模糊搜索
function blurSearch(keyword, cb){
    const sqlStr = `select * from course where name like '%${keyword}%' or teacher like '%${keyword}%' or time like '%${keyword}%' or id like '%${keyword}%'`
    db.query(sqlStr,(err, res)=>{
        if(err){
            console.error(err);
            cb(err, null)
        } else{
            cb(null, res)
        }

    })
}


module.exports = {
    queryAll,
    queryById,
    addCourseInfo,
    editCourseInfo,
    delCourse,
    blurSearch
}