<template>
    <div class="student">
        <!-- 面包导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/home/student' }">学生管理</el-breadcrumb-item>
            <el-breadcrumb-item>学生课程</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <!-- 1. 表单区域 -->
            <el-form inline>
                <!-- 一个表单项 -->
                
                <!-- <el-form-item>
                    <el-button type="primary" @click="toAdd">添加学生课程</el-button>
                </el-form-item> -->
                <el-form-item>
                    <el-button type="primary" @click="getscList">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" stripe style="width:100%">
                <el-table-column prop="id" label="ID" width="180" />
                <el-table-column prop="studentName" label="学生号" width="180" />
                <el-table-column prop="couresName" label="课程号" width="180" />
                <el-table-column prop="score" label="分数" width="180" />
                <!-- <el-table-column prop="score" label="分数" width="180"/> -->
                <el-table-column label="操作">
                    <template v-slot="scope">
                        <!-- scope.row 这一行的数据 -->
                        <el-button type="warning" @click="toUpdate(scope.row)">修改分数</el-button>
                        <!-- <el-button type="danger" >删除</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 对话框 ： 修改学生课程信息 -->
        <el-dialog v-model="isShow" title="修改学生分数">
            <el-form :model="formData">
                <!-- 一个表单项 -->
                <el-form-item label="ID" label-width="80px">
                    <el-input v-model="formData.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="学生号" label-width="80px">
                    <el-input v-model="formData.studentName" disabled></el-input>
                </el-form-item>
                <el-form-item label="课程号" label-width="80px">
                    <el-input v-model="formData.couresName" disabled></el-input>
                </el-form-item>
                <el-form-item label="分数" label-width="80px">
                    <el-input v-model="formData.score"></el-input>
                </el-form-item>
                <el-form-item>
                    <!-- 点击取消关闭对话框 -->
                    <el-button @click="isShow = false">取消</el-button>
                    <el-button type="primary" @click="updateStudentCoures">确认</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 对话框 ： 添加学生课程信息 -->
        <el-dialog v-model="Show" title="添加学生课程">
            <el-form :model="formdata">
                <!-- 一个表单项 -->

                <el-form-item label="学生号" label-width="80px">
                    <el-input v-model="formdata.studentName"></el-input>
                </el-form-item>
                <el-form-item label="课程号" label-width="80px">
                    <el-input v-model="formdata.couresName"></el-input>
                </el-form-item>
                <!-- <el-form-item label="分数" label-width="80px">
                    <el-input v-model="formdata.score"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <!-- 点击取消关闭对话框 -->
                    <el-button @click="isShow = false">取消</el-button>
                    <el-button type="primary" @click="addStudentCoures">确认</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>

import { getStudentCourseApi, updateStudentCourseApi, addStudentCouresApi } from '../api/studentCourse.js'
export default {
    data() {
        return {
            tableData: [],
            isShow: false,
            Show: false,
            newId:'10',
            formdata: {

                studentName: '',
                couresName: '',
                score: ''

            },
            formData: {
                id: '',
                studentName: '',
                couresName: '',
                score: ''

            }
        }
    },

    created() {
        this.getscList();
    },
    methods: {
        // 添加
        toAdd() {
            this.Show = true
        },
        addStudentCoures() {
            let params = new URLSearchParams()
            // params.append('id',this.newId)
            console.log(this.newId)
            params.append('studentName', this.formdata.studentName)
            params.append('couresName', this.formdata.couresName)
            // params.append('score', this.formdata.score)
            addStudentCouresApi(params).then((res) => {

                console.log(res)


            })
            // this.getscList()
            this.Show = false

        },
        // 修改
        toUpdate(rowData) {

            this.isShow = true
            this.formData = rowData
            console.log(this.formData.id)
            this.newId = this.formData.id
        },


        updateStudentCoures() {
            let params = new URLSearchParams()
            params.append('id',this.newId)
            params.append('studentName', this.formData.studentName)
            params.append('couresName', this.formData.couresName)
            params.append('score', this.formData.score)
            updateStudentCourseApi(params).then((res) => {
                console.log(res)
                
                
            })
            console.log(this.formdata)
            // this.getscList()
            this.isShow = false
        },
        // 获取学生绑定课程信息
        getscList() {
            let params = new URLSearchParams()
            console.log(params)
            getStudentCourseApi(params).then((res) => {
                console.log(res)
                this.tableData = res
                console.log(this.tableData.length)
                // this.newId = this.tableData.length+1
                console.log(this.newId)
            })
            

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