<template>
  <div id="sidebar" class="fl-left">
    <ul id="sidebar-menu">
      <li class="nav-item">
        <a href="" title="" class="nav-link nav-toggle">
          <span class="fa fa-product-hunt icon"></span>
          <span class="title">Sản phẩm</span>
        </a>
        <ul class="sub-menu">
          <li class="nav-item">
            <router-link :to="{ name: 'add_product' }" class="nav-link"
              >Thêm mới</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'list_products' }" class="nav-link"
              >Danh sách sản phẩm</router-link
            >
          </li>
        </ul>
      </li>
      <li class="nav-item">
        <a href="" title="" class="nav-link nav-toggle">
          <span class="fa fa-database icon"></span>
          <span class="title">Bán hàng</span>
        </a>
        <ul class="sub-menu">
          <li class="nav-item">
            <router-link :to="{ name: 'list_orders' }" class="nav-link"
              >Danh sách đơn hàng</router-link
            >
          </li>
        </ul>
      </li>
      <li class="nav-item">
        <a href="" title="" class="nav-link nav-toggle">
          <span class="fa fa-users icon"></span>
          <span class="title">Người dùng</span>
        </a>
        <ul class="sub-menu">
          <li class="nav-item">
            <router-link :to="{ name: 'list_users' }" class="nav-link"
              >Danh sách người dùng</router-link
            >
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  mounted() {
    let externalScript = document.createElement("script");
    externalScript.setAttribute("src", "../src/assets/admin/js/main-admin.js");
    document.head.appendChild(externalScript);
  },
};
</script>
