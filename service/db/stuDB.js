const db = require("./db")


// 查询所有
function queryAll(cb) {
    db.query('SELECT * FROM student', (err, res) => {
        if (err) {
            cb(err, null)
        } else {
            cb(null, res)
        }
    })
}

// 根据id查询学生信息
function queryById(id, cb) {
    db.query(`select * from student where id = ${id}`, (err, res) => {
        if (err) {
            console.log('err', err)
            cb(err, null)
        } else {
            cb(null, res)
        }
    })
}

// 更新学生信息
function updateStuInfo(student, cb) {
    const id = student.id
    db.query(`update student set ? where id = ${id}`, student, (err, res) => {
        if (err) {
            console.error(err);
            cb(err, null)
        } else {
            cb(null, res)
        }
    })
}

// 删除学生信息
function delStuById(id, cb) {
    db.query(`delete from student where id = ${id}`, (err, res) => {
        if (err) {
            console.error(err);
            cb(err, null)
        } else {
            cb(null, res)
        }
    })
}

// 添加学生信息
function addStuInfo(student, cb) {
    db.query("insert into student set ?", student, (err, res) => {
        if (err) {
            cb(err, null)
        }
        else {
            cb(null, res)
        }
    })
}

// 模糊查询
function blurSearch(keyword, cb) {
    const sqlStr = `select * from student where speciality like '%${keyword}%' or  name like '%${keyword}%' or id like '%${keyword}%'`
    db.query(sqlStr, (err, res) => {
        if (err) {
            console.error(err);
            cb(err, null)
        } else {
            cb(null, res)
        }
    })
}

module.exports = {
    queryAll,
    queryById,
    updateStuInfo,
    delStuById,
    addStuInfo,
    blurSearch
}