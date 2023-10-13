// app.js
const app = new Vue({
    el: '#app',
    data() {
        return {
            students: [], // 学生数据
            courses: [], // 课程数据
            tableTitles: ["学生数据", "课程数据", "选课数据"],
            inputValues: "", // 搜索框数据
            curTableIndex: 0,
            selected: false, // 是否开启选择模式
            selectedArr: [],// 被选中的id数组
            isShowOperate: true,
            stuFormData: {
                id: "", // 学号
                name: "", // 姓名
                sex: 1, // 性别 0mmo女 1男
                speciality: "" // 专业
            },
            courseFormData: {
                id: "", //  
                name: "", // 课程名称
                teacher: "", // 授课老师
                time: "" // 授课时间
            },
            scFormData: {
                cou_id: '',
                cou_name: "",
                cou_teacher: "",
                cou_time: "",
                stu_name: "",
                stu_id: "",
            },
            scForm: {
                stu_id: "", // 学号
                cou_id: ""   // 课程号
            },
            isEditing: false, // 当前是否处于编辑模式
        };
    },
    created() {
        this.getStuData()
    },
    mounted() {
        this.startObserve()
    },
    methods: {
        // 开始监听两个属性
        startObserve() {
            // 配置观察器以监视属性变化
            const config = { attributes: true };
            const stuModalObserver = this.observeModal("stuModal")
            const CourseModalObserver = this.observeModal("courseModal")
            // 开始观察DOM元素
            const stuModalEle = document.getElementById("stuModal")
            const courseModalEle = document.getElementById("courseModal")
            stuModalObserver.observe(stuModalEle, config);
            CourseModalObserver.observe(courseModalEle, config)
        },

        // 监听modal
        observeModal(idName) {
            // 获取要监听的DOM元素
            const myElement = document.getElementById(idName);
            // 创建一个MutationObserver实例
            return new MutationObserver((mutationsList) => {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'aria-hidden') {
                        // 当指定属性发生变化时，执行你的逻辑
                        if (myElement.hasAttribute('aria-hidden')) {
                            this.isEditing = false
                            this.clearStuForm()
                            this.clearCourseForm()
                        }
                    }
                }
            });
        },

        // 搜索功能（包括模糊搜索
        search(idx) {
            const values = this.inputValues // 搜索框内容
            const query = { keyword: values }
            switch (idx) {
                case 0:
                    // 学生搜索
                    this.searchStu(query)
                    break;
                case 1:
                    // 课程搜索
                    this.searchCourse(query)
                    break;
                case 2:
                    alert("功能还在开发中...")
                    break
                default:
                    break;
            }
        },

        // 获取学生数据
        getStuData() {
            _getStu().then(res => {
                this.isShowOperate = res.length != 0
                this.students = res
            })
        },

        // 学生搜索
        searchStu(query = { keyword: this.inputValues }) {
            _searchStu(query).then(res => {
                this.isShowOperate = res.length != 0
                this.students = res
            })
        },

        // 删除学生提醒
        delItemsWarning() {
            alert("你确定要删除这些数据，删除后不可恢复")
            if (this.curTableIndex == 0)
                this.delStu()
            else if (this.curTableIndex == 1) {
                this.delCourse()
            }
        },

        // 删除学生
        delStu() {
            for (let i = 0; i < this.selectedArr.length; i++) {
                let id = this.selectedArr[i]
                let query = { id: id }
                _delStu(query).then(res => {
                    console.log('res', res)
                })
            }
            this.students = this.searchStu({ keyword: this.inputValues })
            this.clearSelectedArr()
        },

        // 提交学生信息
        submitStu(isEditing = false) {
            const formData = this.stuFormData
            if (!this.areAllPropertiesNotEmpty(formData)) return
            if (isEditing) {
                _editStu(formData).then(res => {
                    console.log('res', res)
                    this.$refs.closeStuModalBtn.click() // 关闭模态框
                    this.searchStu() // 重新获取当前学生列表
                }).catch(err => {
                    alert("未知错误,添加失败")
                    console.log('err', err)
                })
            } else {
                _addStu(formData).then(res => {
                    console.log('res', res)
                    this.$refs.closeStuModalBtn.click() // 关闭模态框
                    this.searchStu() // 重新获取当前学生列表
                }).catch(err => {
                    alert("未知错误,添加失败")
                    console.log('err', err)
                })
            }


        },

        // 清除学生表单
        clearStuForm() {
            this.stuFormData = {
                id: "",
                name: "",
                sex: 1,
                speciality: ""
            }
        },

        // 获取课程数据
        getCourseData() {
            _getCourse().then(res => {
                this.isShowOperate = res.length != 0
                this.courses = res
            })
        },

        // 课程搜索
        searchCourse(query = { keyword: this.inputValues }) {
            _searchCourse(query).then(res => {
                this.isShowOperate = res.length != 0
                this.courses = res
            })
        },

        // 删除课程
        delCourse() {
            const arr = this.selectedArr
            arr.forEach(id => {
                let query = { id: id }
                _delCourse(query).then(res => {
                    console.log('res', res)
                }).catch(err => {
                    alert("未知错误，删除失败")
                    console.log('err', err)
                })
            });
            this.courses = this.searchCourse({ keyword: this.inputValues })
        },

        // 清空当前课程表单
        clearCourseForm() {
            this.courseFormData = {
                id: "", // 课程号
                name: "", // 课程名称
                teacher: "", // 授课老师
                time: "" // 授课时间
            }
        },

        // 提交添加课程
        submitCourse(isEditing = false) {
            const formData = this.courseFormData
            if (!this.areAllPropertiesNotEmpty(formData)) return
            if (isEditing) {
                _editCourse(formData).then(res => {
                    console.log('res', res)
                    this.$refs.closeCourseModalBtn.click()
                    this.searchCourse()
                }).catch(err => {
                    alert("未知错误，添加失败")
                    console.error(err);
                })
            } else {
                _addCourse(formData).then(res => {
                    console.log('res', res)
                    this.$refs.closeCourseModalBtn.click()
                    this.searchCourse()
                }).catch(err => {
                    alert("未知错误，添加失败")
                    console.error(err);
                })
            }


        },

        // 修改表格
        editForm() {
            this.isEditing = true
            switch (this.curTableIndex) {
                case 0: // 修改学生
                    this.editStu()
                    break;
                case 1: // 修改课程
                    this.editCourse()
                    break;
                default:
                    break;
            }

        },

        // 修改学生信息 因为要立即使用请求到的学生信息 所以需要处理异步问题
        async editStu() {
            if (!this.isEditing) return
            // 获取当前该学生的信息
            const curSelectedId = this.selectedArr[0]
            await _searchStu({ keyword: curSelectedId }).then(res => {
                this.stuFormData = res[0]
            })
            this.$refs.openStuModalBtn.click()
        },

        async editCourse() {
            if (!this.isEditing) return
            // 获取当前课程信息
            const curSelectedId = this.selectedArr[0]
            await _searchCourse({ keyword: curSelectedId }).then(res => {
                this.courseFormData = res[0]
            })
            this.$refs.openCourseModalBtn.click()
        },

        // 切换表格
        changeTable(idx) {
            this.clearSelectedArr()
            this.selected = false
            this.inputValues = ''
            this.curTableIndex = idx
            switch (idx) {
                case 0:
                    this.getStuData()
                    break;
                case 1:
                    this.getCourseData()
                    break;
                case 2:
                    this.getScAllData()
                    break
            }
        },

        // 复选框修改时做出操作
        checkBoxChanged(id) {
            var arr = this.selectedArr
            if (arr.includes(id)) {
                this.selectedArr = arr.filter(item => item !== id)
            } else {
                arr.push(id)
            }
        },

        // 清除已选item
        clearSelectedArr() {
            this.selectedArr = []
        },

        // 判断对象中的属性不为空
        areAllPropertiesNotEmpty(obj) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (obj[key] === null || obj[key] === undefined || obj[key] === "") {
                        return false;
                    }
                }
            }
            return true;
        },

        // 清空sc表单
        clearScForm() {
            this.scForm = {
                cou_id: '',
                cou_name: "",
                cou_teacher: "",
                cou_time: "",
                stu_name: "",
                stu_id: "",
            }
        },

        // 获取sc全部信息
        getScAllData() {
            _getScAllData().then(res => {
                this.scFormData = res
            })

        },

        // 提交sc表单
        submitScForm() {
            const formData = this.scForm
            if (!this.areAllPropertiesNotEmpty(formData)) return
            _addSc(formData).then(res => {
                console.log('res', res)
                this.getScAllData()
            })
        },
    }
});