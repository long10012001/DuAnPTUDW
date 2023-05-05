import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/front_end/Home.vue";
import Cart from "@/components/Cart.vue";
import Login from "@/components/Login.vue";
import Regist from "@/components/Regist.vue";
import DetailProduct from "@/views/front_end/DetailProduct.vue";
import Admin from "@/views/admin/HomeAdmin.vue";
import AddProduct from "@/views/admin/AddProduct.vue";
import ListProducts from "@/views/admin/ListProduct.vue";
import Checkout from "@/components/Checkout.vue";
import ListOrders from "@/views/admin/ListOrders.vue";
import DetailOrder from "@/views/admin/DetailOrder.vue";
import ListUsers from "@/views/admin/ListUser.vue";
import NotFound from "@/views/NotFound.vue";
const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/product/:category",
        name: "product.category",
        component: Home,
    },
    {
        path: "/cart",
        name: "cart",
        component: Cart,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/regist",
        name: "regist",
        component: Regist,
    },

    {
        path: "/admin",
        name: "admin",
        component: Admin,
    },
    {
        path: "/add_product",
        name: "add_product",
        component: AddProduct,
    },
    {
        path: "/list_products",
        name: "list_products",
        component: ListProducts,
    },
    {
        path: "/product/:id",
        name: "product.edit",
        component: AddProduct,

    },
    {
        path: "/products/detail/:id",
        name: "product.detail",
        component: DetailProduct,
    },
    {
        path: "/checkout",
        name: "checkout",
        component: Checkout,
    },
    {
        path: '/list_orders',
        name: "list_orders",
        component: ListOrders,
    },
    {
        path: '/order/:id',
        name: 'order.detail',
        component: DetailOrder,
    },
    {
        path: '/list_users',
        name: 'list_users',
        component: ListUsers,
    },
    {
        path: "/:pathMatch(.*)*",
        name: 'notfound',
        component: NotFound,
    }


];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;