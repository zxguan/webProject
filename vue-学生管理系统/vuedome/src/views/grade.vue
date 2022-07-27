<template>
  <div class="grade">
    <!-- 面包导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>班级管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 1. 表单区域 -->
      <el-form inline>
        <!-- 一个表单项 -->
        <el-form-item>
          <el-input v-model="name" placeholder="请输入班级名称"></el-input>
          
        </el-form-item>
        <el-form-item>
          
          <el-input v-model="formData.id" placeholder="请输入班级ID号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add">添加</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getGradeList">查询</el-button>
        </el-form-item>
      </el-form>

      <!-- 2. 表格区域 -->
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="name" label="班级名称" width="180" />
        <el-table-column label="操作">
          <template v-slot="scope">
            <!-- scope.row 这一行的数据 -->
            <el-button type="warning" @click="toUpdate(scope.row)">修改</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 对话框 ： 修改班级信息 -->
    <el-dialog v-model="isShow" title="修改班级信息">
      <el-form :model="formData">
        <!-- 一个表单项 -->
        <el-form-item label="ID" label-width="80px">
          <el-input v-model="formData.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="班级名称" label-width="80px">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- 点击取消关闭对话框 -->
          <el-button @click="isShow = false">取消</el-button>
          <el-button type="primary" @click="updateGrade">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getGradeApi, addGradeApi, delGradeApi, updateGradeApi } from "../api/index.js";
export default {
  data() {
    return {
      name: "",
      tableData: [],
      // 控制对话框的显示和隐藏
      isShow: false,
      // 对话框里的表单数据
      formData:{
        id:'',
        name:''
      }
    };
  },
  created() {
    // 调用获取班级信息的方法getGradeList
    this.getGradeList();
  },
  methods: {
    // 修改班级信息
    updateGrade(){
      // 向修改接口发请求
      let params = new URLSearchParams()
      params.append('id',this.formData.id)
      params.append('name',this.formData.name)
      updateGradeApi(params).then(res=>{
        console.log(res)
        // 进行提示
        if(res.indexOf('成功' >= 0)){
          this.$message({
            type:'success',
            message:res
          })
        }else{
          this.$message({
            type:'error',
            message:res
          })
        }
        // 重新获取表格数据
        this.getGradeList()
        // 关闭对话框
        this.isShow = false
      })
    },
    // 去打开修改对话框
    toUpdate(rowData){
      this.isShow = true
      console.log(rowData)
      this.formData = rowData
    },
    // 删除表格数据中的一项
    del(id) {
      // console.log(id);
      let params = new URLSearchParams();
      params.append("id", id);
      delGradeApi(params).then((res) => {
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
        this.getGradeList();
      });
    },
    // 获取表格（班级信息）数据的方法
    getGradeList() {
      // 发请求 拿到数据，把数据赋值给data里的变量，用于页面渲染
      // 如果请求数据类型是 application/x-www-form-urlencoded
      // 需要对参数做一些处理，转换成需要的格式
      let params = new URLSearchParams();
      // params.append('参数名','参数值')
      params.append("name", this.name);
      getGradeApi(params).then((res) => {
        // console.log(res)
        this.tableData = res;
        console.log(this.tableData);
      });
    },
    // 添加班级信息
    add() {
      if (this.name.trim() == "") {
        return;
      }
      // 1. 拿到用户输入班级名称 this.name
      // 2. 把需要参数转换成对应的格式
      let params = new URLSearchParams();
      params.append("name", this.name);
      // 3. 发请求拿数据
      addGradeApi(params).then((res) => {
        console.log(res);
        // 得到响应结果之后
        // 4. 清空文本框
        this.name = "";
        // 5. 重新渲染表格，也就是重新获取表格数据
        this.getGradeList();
        // 6. 提示用户添加成功
        this.$message({
          // type 设置消息提示的样式
          type: "success",
          // message 设置消息提示的内容
          message: res,
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-card {
  margin-top: 20px;
}

.el-form-item /deep/ .el-form-item__content{
  justify-content: right;
  float: left;
  width:180px;
  height: 40px;
  margin-right: 20px;


}


</style>
