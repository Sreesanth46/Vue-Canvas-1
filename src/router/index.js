import { createRouter, createWebHistory } from 'vue-router'
import LoginComponent from '@/views/LoginComponent'
import DashboardComponent from '@/views/DashboardComponent'
import Canvas from '@/views/Canvas'
// import Canvas2 from '@/views/Canvas2'


const isAuthenticated = true
const routes = [
    { path: '/', name: 'Login',component: LoginComponent },
    { path: '/dashboard',  name: 'Dashboard',component: DashboardComponent },
    { path: '/canvas',  name: 'Canvas',component: Canvas },
    // { path: '/canvas2',  name: 'Canvas',component: Canvas2 },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to) => {
    if (!isAuthenticated && to.name !== 'Login') 
    {
      return { name: 'Login' }
    }
})

export default router