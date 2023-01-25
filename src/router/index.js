import { createRouter, createWebHistory } from 'vue-router'
import LoginComponent from '@/views/LoginComponent'
import DashboardComponent from '@/views/DashboardComponent'
import Canvas from '@/views/Canvas'
import Video from '@/views/Video'
import Test from '@/views/Test'
import Fabric from '@/views/Fabric'
import Images from '@/views/Image'
// import SvgEditor from '@/views/SvgEditor'



// const isAuthenticated = !!localStorage.getItem('Token')
const routes = [
    { path: '/', name: 'Login',component: LoginComponent },
    { path: '/dashboard',  name: 'Dashboard',component: DashboardComponent },
    { path: '/canvas',  name: 'Canvas',component: Canvas },
    { path: '/video',  name: 'video',component: Video },
    { path: '/test',  name: 'Test',component: Test },
    { path: '/fabric',  name: 'Fabric',component: Fabric },
    { path: '/images',  name: 'Images',component: Images },
    // { path: '/svg',  name: 'svg',component: SvgEditor },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// router.beforeEach(async (to) => {
//     if (!isAuthenticated && to.name !== 'Login') 
//     {
//       return { name: 'Login' }
//     }
// })

export default router