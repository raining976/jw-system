// 学生相关
const _getStu = (params = {}) => get('/students', params) // 获取学生全部信息
const _searchStu = (params = {})=> get('/students/search',params) // 学生信息模糊搜索
const _delStu = (params)=> get('/students/del',params) // 删除学生信息
const _addStu = (params) => post('/students/add',params) // 添加学生信息
const _editStu = (params) => post('/students/edit',params) // 修改学生信息

// 课程相关
const _getCourse = (params = {}) => get('/course', params) // 获取课程全部信息
const _searchCourse = (params = {}) => get("/course/search",params) // 课程信息模糊搜索
const _delCourse = (params) => get("/course/del", params) // 删除课程信息
const _addCourse = (params) => post('/course/add',params) // 添加课程信息
const _editCourse = (params) => post('/course/edit',params) // 修改课程信息

// 选课表相关
const _addSc = (params) => post('/sc/add',params) // 添加选课信息
const _getScAllData = (params) => get('/sc/all',params) // 获取所有选课信息