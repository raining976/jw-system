const db = require("./db")

// 查询所有选课
function queryAll(cb) {
    const str = `SELECT student.id AS stu_id, student.name AS stu_name, student.sex AS stu_sex, student.speciality AS stu_speciality, course.id AS cou_id, course.name AS cou_name, course.teacher AS cou_teacher, course.time AS cou_time FROM sc INNER JOIN student ON sc.stu_id = student.id INNER JOIN course ON sc.cou_id = course.id;`
    db.query(str, (err, res) => {
        if (err) {
            console.error(err);
            cb(err, null)
        } else {
            cb(null, res)
        }
    })
}

function addSc(stu_id, cou_id, cb) {
    const str = `insert into sc (stu_id,cou_id) values (${stu_id},${cou_id})`
    db.query(str, (err, res) => {
        if (err) {
            console.error(err);
            cb(err, null)
        } else {
            cb(null, err)
        }
    })
}
module.exports = {
    queryAll,
    addSc
}