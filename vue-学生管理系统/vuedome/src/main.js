import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入公共样式文件,样式才起作用
import './assets/common.css'

createApp(App).use(ElementPlus).use(store).use(router).mount('#app')
