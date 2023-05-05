
import { onUnmounted } from 'vue';

<template>
  <div id="header-wp">
    <div class="wp-inner clearfix">
      <router-link :to="{ name: 'admin' }" id="logo" class="fl-left"
        >ADMIN</router-link
      >

      <div id="dropdown-user" class="dropdown dropdown-extended fl-right">
        <button
          class="dropdown-toggle clearfix"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
        >
          <div id="thumb-circle" class="fl-left">
            <img src="../../images/img-admin.png" />
          </div>
          <h3 id="account" class="fl-right">Admin</h3>
        </button>
        <ul class="dropdown-menu">
          <li>
            <!-- <router-link :to="{ name: 'home' }">Thoát</router-link> -->
            <a href="/">Thoát</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>