<template>
    <div class="student">
        <!-- 面包导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>学生管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/home/studentCourse'}">学生课程</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片 -->
        <el-card class="box-card">
            <!-- 1. 表单区域 -->
            <el-form inline>
                <!-- 一个表单项 -->
                <el-form-item>
                    <el-input v-model="grade" placeholder="请输入班级名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="toAdd">添加</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getStudentList">查询</el-button>
                </el-form-item>
            </el-form>
            <!-- 2. 表格区域 -->
            <el-table  :data="tableData" stripe style="width: 100%" >
                <el-table-column prop="id" label="ID" width="180" />
                <el-table-column prop="name" label="姓名" width="180" />
                <el-table-column prop="age" label="年龄" width="180" />
                <el-table-column prop="sex" label="性别" width="180" />
                <el-table-column prop="grade" label="班级名称" width="180" />
                <el-table-column prop="userName" label="帐号" width="180" />
                <el-table-column prop="passWord" label="密码" width="180" />
                <el-table-column label="操作">
                    <template v-slot="scope">
                        <!-- scope.row 这一行的数据 -->
                        <el-button type="warning" @click="toUpdate(scope.row)">修改</el-button>
                        <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 对话框 ： 添加学生信息 -->
        <el-dialog v-model="isShow" title="添加学生信息">
            <el-form :model="formData">
                <!-- 一个表单项 -->
                <el-form-item label="姓名" label-width="80px">
                    <el-input v-model="formData.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄" label-width="80px">
                    <el-input v-model="formData.age"></el-input>
                </el-form-item>
                <el-form-item label="性别" label-width="80px">
                    <el-input v-model="formData.sex"></el-input>
                </el-form-item>
                <el-form-item label="班级名称" label-width="80px">
                    <el-input v-model="formData.grade"></el-input>
                </el-form-item>
                <el-form-item label="帐号" label-width="80px">
                    <el-input v-model="formData.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="80px">
                    <el-input v-model="formData.passWord"></el-input>
                </el-form-item>
                <el-form-item>
                    <!-- 点击取消关闭对话框 -->
                    <el-button @click="isShow = false">取消</el-button>
                    <el-button type="primary" @click="AddStudent">确认</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 对话框 ： 修改学生信息 -->
        <el-dialog v-model="Show" title="修改学生信息">
            <el-form :model="updateData">
                <!-- 一个表单项 -->
                <el-form-item label="ID" label-width="80px">
                    <el-input v-model="updateData.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名" label-width="80px">
                    <el-input v-model="updateData.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄" label-width="80px">
                    <el-input v-model="updateData.age"></el-input>
                </el-form-item>
                <el-form-item label="性别" label-width="80px">
                    <el-input v-model="updateData.sex"></el-input>
                </el-form-item>
                <el-form-item label="班级名称" label-width="80px" >
                    <el-input v-model="updateData.grade" ></el-input>
                </el-form-item>
                <el-form-item label="帐号" label-width="80px">
                    <el-input v-model="updateData.userName" ></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="80px">
                    <el-input v-model="updateData.passWord" ></el-input>
                </el-form-item>
                <el-form-item>
                    <!-- 点击取消关闭对话框 -->
                    <el-button @click="Show = false">取消</el-button>
                    <el-button type="primary" @click="updateStudent">确认</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { getStudenApi, addStudenApi, updateStudenApi, delStudenApi } from '../api/student.js'
export default {
    data() {
        return {
            grade: '5',
            tableData: [],
            oldGrade: '',
            
            // 控制对话框的显示和隐藏
            isShow: false,
            Show:false,
            // 对话框里的表单数据
            formData: {
                name: '',
                age: '',
                sex: '',
                grade: '',
                userName:'',
                passWord:''
            },
            updateData: {
                id:'',
                name: '',
                age: '',
                sex: '',
                grade: '',
                userName:'',
                passWord:''
            }
        }

    },
    created() {
        // 调用获取班级信息的方法getGradeList
        this.getStudentList();
    },
    methods: {
        //获取学生列表
        getStudentList() {
            console.log(this.grade)
            let params = new URLSearchParams()
            params.append('grade', this.grade)
            getStudenApi(params).then((res) => {
                this.tableData = res
                console.log(res)
                console.log(this.tableData)
            })
            this.oldGrade = this.grade
            this.grade = ''
            // this.isTable = true

        },
        toUpdate(rowData) {
            this.Show = true
            console.log(rowData)
            this.updateData = rowData
        },
        // 修改学生信息
        updateStudent() {
            // 向修改接口发请求
            let params = new URLSearchParams()
            params.append('id', this.updateData.id)
            params.append('name', this.updateData.name)
            params.append('age', this.updateData.age)
            params.append('sex', this.updateData.sex)
            params.append('grade', this.updateData.grade)
            params.append('userName',this.updateData.userName)
            params.append('passWord',this.updateData.passWord)
            updateStudenApi(params).then(res => {
                console.log(res)
                // 进行提示
                if (res>= 0) {
                    this.$message({
                        type: 'success',
                        message: "修改学生信息成功"
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: "修改学生信息不成功"
                    })
                }
                this.grade = this.updateData.grade
                // 重新获取表格数据
                this.getStudentList()
                // 关闭对话框
                this.Show = false
            })
        },
        // 添加学生信息
        AddStudent() {
            // 向添加接口发请求
            let params = new URLSearchParams()
            // params.append('id', this.formData.id)
            params.append('name', this.formData.name)
            params.append('age', this.formData.age)
            params.append('sex', this.formData.sex)
            params.append('grade', this.formData.grade)
            params.append('userName',this.formData.userName)
            params.append('passWord',this.formData.passWord)
            addStudenApi(params).then((res) => {
                console.log(res);
                // 得到响应结果之后
                // 4. 清空文本框
                // this.name = "";
                // 5. 重新渲染表格，也就是重新获取表格数据
                this.getStudentList();
                // 6. 提示用户添加成功
                this.$message({
                    // type 设置消息提示的样式
                    type: "success",
                    // message 设置消息提示的内容
                    message: res,
                });
            });
            this.grade = this.formData.grade
            this.getStudentList()
            this.formData.name = ''
            this.formData.age = ''
            this.formData.sex = ''
            this.formData.grade = ''
            this.formData.userName = ''
            this.formData.passWord = ''
            // 关闭对话框
            this.isShow = false
            // 重新获取表格数据



        },
        // 去打开修改对话框
        toAdd() {
            this.isShow = true

        },
        // 删除表格数据中的一项
        del(id) {
            // console.log(id);
            let params = new URLSearchParams();
            params.append("id", id);
            delStudenApi(params).then((res) => {
                // res “删除信息成功” “删除信息失败”
                // 字符串.indexOf('XX') 如果有xx则返回第一次出现的位置，没有的话返回-1
                console.log(res);

                if (res >= 0) {
                    // 得到响应结果后对用户提示
                    this.$message({
                        type: "success",
                        message: "删除学生信息成功",
                    });
                } else {
                    this.$message({
                        type: "error",
                        message: "删除学生信息不成功",
                    });
                }

            });
            this.grade = this.oldGrade
            this.getStudentList();
        },

        toPath(path){
            this.$router.push(path)
        }

    }
}
</script>
<style lang="less" scoped>
.box-card {
    margin-top: 20px;
}
.el-form-item /deep/ .el-form-item__content {
    justify-content: right;
}
</style>