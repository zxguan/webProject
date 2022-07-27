<template>
  <div class="home">
    <!-- 布局 -->
    <el-container>
      <!-- 顶部 -->
      <el-header>
        <h1>学生管理系统</h1>
      </el-header>
      <el-container class="outContain">
        <!-- 左侧：菜单区域 -->
        <el-aside width="200px">
          <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            default-active="1"
            text-color="#fff"
          >
            <!-- el-menu-item 表示一个菜单项 -->
            <el-menu-item index="1" @click="toPath('/home/grade')">
              <span>班级管理</span>
            </el-menu-item>
            <el-menu-item index="2" @click="toPath('/home/student')">
              <span>学生管理</span>
            </el-menu-item>
            <el-menu-item index="3" @click="toPath('/home/teacher')">
              <span>教师管理</span>
            </el-menu-item>
            <el-menu-item index="4" @click="toPath('/home/course')">
              <span>课程管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 主体内容区域 -->
        <el-main>
          <!-- 子路由的出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  methods: {
    // 进行路由跳转
    toPath(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style lang="less">
.home {
  height: 100%;
}
// 设置组件样式，可以通过把组件名当作类选择器的方式来设置
.el-header {
  background-color: #545c64;
  color: #fff;
  display: flex;
  align-items: center;
}

.el-container {
  height: 100%;
}

.el-aside {
  background-color: #545c64;
}
</style>
