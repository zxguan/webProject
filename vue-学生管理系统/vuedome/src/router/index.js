import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/home/grade',
    component: () => import('../views/home.vue'),
    children: [
      // 一个对象就是一条子路由规则
      {
        path: '/home/grade',
        name: 'grade',
        component: () => import('../views/grade.vue')
      },
      {
        path: '/home/student',
        name: 'student',
        component: () => import('../views/student.vue'),

      },
      {
        path: '/home/teacher',
        name: 'teacher',
        component: () => import('../views/teacher.vue')
      },
      {
        path: '/home/course',
        name: 'course',
        component: () => import('../views/course.vue')
      },
      {
        path: '/home/studentCourse',
        name: 'studentCourse',
        component: () => import('../views/studentCourse.vue'),
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
