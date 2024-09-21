import { lazy, Suspense } from "react"
import AdminLoadingComponent from "../components/adminComponents/AdminLoadingComponent"
import ProductDetail from "../components/userComponents/contents/productdetail"
import LoadingComponent from '../components/userComponents/LoadingComponent'
import UserListContextComponent from "../contextApi/UserListContextComponent"
import BuyProducts from "../pages/userPages/navs/BuyProducts"

const SearchResult = lazy(() => import( "../pages/userPages/navs/SearchResult"))
const LoginPage = lazy(()=> import('../pages/userPages/authentications/Login'))
const RegisterPage = lazy(()=> import('../pages/userPages/authentications/Register'))
const HomePage = lazy(()=> import('../pages/userPages/navs/Home'))
const AboutPage = lazy(()=> import('../pages/userPages/navs/About'))
const ContactPage = lazy(()=> import('../pages/userPages/navs/Contact'))
const Products = lazy(()=> import('../pages/userPages/navs/BuyProducts'))
const Product = lazy(()=> import('../components/userComponents/contents/productdetail'))
const CartPage = lazy(()=> import('../pages/userPages/navs/Cart'))
const MyAccountPage = lazy(()=> import('../pages/userPages/navs/MyAccount'))
const MyProfilePage = lazy(()=> import('../pages/userPages/navs/MyProfile'))
const MyAddressPage = lazy(()=> import('../pages/userPages/navs/MyAddress'))
const MyOrdersPage = lazy(()=> import('../pages/userPages/navs/MyOrders'))
const SuccessPage = lazy(()=> import('../pages/userPages/navs/SuccessPage'))
const FailurePage = lazy(()=> import('../pages/userPages/navs/FailurePage'))


const AdminLoginPage = lazy(()=> import('../pages/adminPages/authentications/AdminLogin'))
const AdminRegisterPage = lazy(()=> import('../pages/adminPages/authentications/AdminRegister'))
const AdminProfilePage = lazy(()=> import('../pages/adminPages/navs/AdminProfile'))
const AdminDashboardPage = lazy(()=> import('../pages/adminPages/navs/AdminDashboard'))
const AdminUsersListPage = lazy(()=> import('../pages/adminPages/navs/AdminUsersList'))
const AdminProductssListPage = lazy(()=> import('../pages/adminPages/navs/AdminProductsList'))

const Approutes = [
    {
        path : '/login',
        element : <Suspense fallback={<LoadingComponent/>}><LoginPage/></Suspense>,
        exact : true
    },
    {
        path : '/register',
        element : <Suspense fallback={<LoadingComponent/>}><RegisterPage/></Suspense>,
        exact : true
    },
    {
        path: "/search",
        element: <Suspense fallback={<LoadingComponent/>}><SearchResult/></Suspense>,
        exact: true
    },
    {
        path : '/',
        element : <Suspense fallback={<LoadingComponent/>}><HomePage/></Suspense>,
        exact : true
    },
    {
        path : '/about',
        element : <Suspense fallback={<LoadingComponent/>}><AboutPage/></Suspense>,
        exact : true
    },
    {
        path : '/contact',
        element : <Suspense fallback={<LoadingComponent/>}><ContactPage/></Suspense>,
        exact : true
    },
    {
        path : '/buyProducts',
        element : <Suspense fallback={<LoadingComponent/>}><Products/></Suspense>,
        exact : true
    },
    {
        path : '/cart',
        element : <Suspense fallback={<LoadingComponent/>}><CartPage/></Suspense>,
        exact : true
    },
    {
        path : '/myaccount',
        element : <Suspense fallback={<LoadingComponent/>}><MyAccountPage/></Suspense>,
        exact : true
    },
    {
        path : '/myaccount/profile',
        element : <Suspense fallback={<LoadingComponent/>}><MyProfilePage/></Suspense>,
        exact : true
    },
    {
        path : '/myaccount/address',
        element : <Suspense fallback={<LoadingComponent/>}><MyAddressPage/></Suspense>,
        exact : true
    },
    {
        path : '/myorders',
        element : <Suspense fallback={<LoadingComponent/>}><MyOrdersPage/></Suspense>,
        exact : true
    },
    {
        path : '/paymentsuccess',
        element : <Suspense fallback={<LoadingComponent/>}><SuccessPage/></Suspense>,
        exact : true
    },
    {
        path : '/paymentfailure',
        element : <Suspense fallback={<LoadingComponent/>}><FailurePage/></Suspense>,
        exact : true
    },
    {
        path : '/productdetails',
        element : <Suspense fallback={<LoadingComponent/>}><Product/></Suspense>,
        exact : true
    },
    // ADMIN
    {
        path : '/admin',
        element : <Suspense fallback={<AdminLoadingComponent/>}><AdminLoginPage/></Suspense>,
        exact : true
    },
    {
        path : '/admin/register',
        element : <Suspense fallback={<AdminLoadingComponent/>}><AdminRegisterPage/></Suspense>,
        exact : true
    },
    {
        path : '/admin/dashboard',
        element : <Suspense fallback={<AdminLoadingComponent/>}><UserListContextComponent><AdminDashboardPage/></UserListContextComponent></Suspense>,
        exact : true
    },
    {
        path : '/admin/dashboard/userslist',
        element : <Suspense fallback={<AdminLoadingComponent/>}><UserListContextComponent><AdminUsersListPage/></UserListContextComponent></Suspense>,
        exact : true
    },
    {
        path : '/admin/dashboard/productslist',
        element : <Suspense fallback={<AdminLoadingComponent/>}><UserListContextComponent><AdminProductssListPage/></UserListContextComponent></Suspense>,
        exact : true
    },
    {
        path : '/admin/adminprofile',
        element : <Suspense fallback={<AdminLoadingComponent/>}><AdminProfilePage/></Suspense>,
        exact : true
    },
    {
        path:"/c/:id",
        // element : <Suspense fallback={<AdminLoadingComponent/>}><Catalog/></Suspense>,
        element:<BuyProducts/>
        
    },
    {
        path:"/productdetails/:id",
        element : <Suspense fallback={<LoadingComponent/>}><ProductDetail/></Suspense>
        
    }
]

export default Approutes