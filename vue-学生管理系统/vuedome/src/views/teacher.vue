<template>
    <div class="student">
        <!-- 面包导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>教师管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片 -->
        <el-card class="box-card">
            <!-- 1. 表单区域 -->
            <el-form inline>
                <!-- 一个表单项 -->
                <!-- <el-form-item>
                    <el-input v-model="name" placeholder="请输入姓名"></el-input>
                </el-form-item>-->
                <el-form-item>
                    <el-input v-model="name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="toAdd">添加</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getTeacherList">查询</el-button>
                </el-form-item>
            </el-form>
            <!-- 2. 表格区域 -->
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="id" label="ID" width="180" />
                <el-table-column prop="name" label="姓名" width="180" />
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
        <!-- 对话框 ： 添加老师信息 -->
        <el-dialog v-model="isShow" title="添加老师信息">
            <el-form :model="formData">
                <!-- 一个表单项 -->
                <!-- <el-form-item label="ID" label-width="80px">
                    <el-input v-model="formData.id"></el-input>
                </el-form-item>-->
                <el-form-item label="姓名" label-width="80px">
                    <el-input v-model="formData.name"></el-input>
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
                    <el-button type="primary" @click="AddTeacher">确认</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 对话框 ： 修改老师信息 -->
        <el-dialog v-model="Show" title="修改老师信息">
            <el-form :model="updateData">
                <!-- 一个表单项 -->
                <el-form-item label="ID" label-width="80px">
                    <el-input v-model="updateData.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名" label-width="80px">
                    <el-input v-model="updateData.name"></el-input>
                </el-form-item>
                <el-form-item label="帐号" label-width="80px">
                    <el-input v-model="updateData.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="80px">
                    <el-input v-model="updateData.passWord"></el-input>
                </el-form-item>
                <el-form-item>
                    <!-- 点击取消关闭对话框 -->
                    <el-button @click="Show = false">取消</el-button>
                    <el-button type="primary" @click="updateTeacher">确认</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import { getTeacherApi, addTeacherApi, updateTeacherApi, delTeacherApi } from "../api/teacher.js"
export default {
    data() {
        return {
            tableData: [],
            name: '',
            // 控制对话框的显示和隐藏
            isShow: false,
            Show: false,
            // 对话框里的表单数据
            formData: {
                id: '',
                name: '',
                userName: '',
                passWord: ''
            },
            updateData: {
                id: '',
                name: '',
                userName: '',
                passWord: ''
            }
        }
    },
    created() {
        this.getTeacherList()
    },
    methods: {

        // 查询
        getTeacherList() {
            let params = new URLSearchParams()
            params.append('name', this.name)
            getTeacherApi(params).then((res) => {
                this.tableData = res
                console.log(this.tableData)
            })
            this.name = ''
        },

        // 去打开修改对话框
        toUpdate(rowData) {
            this.Show = true
            console.log(rowData)
            this.updateData = rowData
        },
        // 修改老师信息
        updateTeacher() {
            // 向修改接口发请求
            let params = new URLSearchParams()
            params.append('id', this.updateData.id)
            params.append('name', this.updateData.name)
            params.append('userName', this.updateData.userName)
            params.append('passWord', this.updateData.passWord)
            updateTeacherApi(params).then(res => {
                console.log(res)
                // 进行提示
                if (res.indexOf("成功") >= 0) {
                    // 得到响应结果后对用户提示
                    this.$message({
                        type: "success",
                        message: res,
                    });
                } else {
                    this.$message({
                        type: "error",
                        message: res,
                    });
                }
                // 重新获取表格数据
                this.getTeacherList()
                // 关闭对话框
                this.Show = false
            })
        },
        // 添加老师信息
        AddTeacher() {
            // 向添加接口发请求
            let params = new URLSearchParams()
            // params.append('id', this.formData.id)
            params.append('name', this.formData.name)
            params.append('userName', this.formData.userName)
            params.append('passWord', this.formData.passWord)
            addTeacherApi(params).then((res) => {
                console.log(res);
                // 6. 提示用户添加成功
                if (res.indexOf("成功") >= 0) {
                    // 得到响应结果后对用户提示
                    this.$message({
                        type: "success",
                        message: res,
                    });
                } else {
                    this.$message({
                        type: "error",
                        message: res,
                    });
                }
                this.getTeacherList()
            });
            this.formData.name = ''
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
            delTeacherApi(params).then((res) => {
                // res “删除信息成功” “删除信息失败”
                // 字符串.indexOf('XX') 如果有xx则返回第一次出现的位置，没有的话返回-1
                console.log(res);
                if (res.indexOf("成功") >= 0) {
                    // 得到响应结果后对用户提示
                    this.$message({
                        type: "success",
                        message: res,
                    });
                } else {
                    this.$message({
                        type: "error",
                        message: res,
                    });
                }
                this.getTeacherList();
            });
        },



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