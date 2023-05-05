<template>
  <Header></Header>
  <div id="main-content-wp" class="list-product-page">
    <div class="wrap clearfix">
      <sidebar></sidebar>
      <div id="content" class="fl-right">
        <div class="section" id="title-page">
          <div class="clearfix">
            <h3 id="index" class="fl-left">Danh sách sản phẩm</h3>
            <router-link
              :to="{ name: 'add_product' }"
              id="add-new"
              class="fl-left"
              >Thêm mới</router-link
            >
          </div>
        </div>
        <div class="section" id="detail-page">
          <div class="section-detail">
            <div class="filter-wp clearfix">
              <ul class="post-status fl-left">
                <li class="all">
                  <a href=""
                    >Tất cả
                    <span class="count">({{ products.length }})</span></a
                  >
                  |
                </li>
                <li class="publish">
                  <a href=""
                    >Điện thoại
                    <span class="count">({{ phone.length }})</span></a
                  >
                  |
                </li>
                <li class="pending">
                  <a href=""
                    >Laptop
                    <span class="count">({{ laptop.length }})</span> |</a
                  >
                </li>
              </ul>
              <form class="form-s fl-right" @submit.prevent="search()">
                <input
                  type="text"
                  name="s"
                  id="s"
                  v-model="search_product"
                  placeholder="Nhập từ khoá tìm kiếm"
                />
                <input type="submit" name="sm_s" value="Tìm kiếm" />
              </form>
            </div>
            <div class="actions">
              <form @submit.prevent="filter()" class="form-actions">
                <select name="actions" v-model="category">
                  <option value="0">Danh mục</option>
                  <option value="1">Điện thoại</option>
                  <option value="2">Laptop</option>
                </select>
                <input type="submit" name="sm_action" value="Áp dụng" />
              </form>
            </div>
            <div class="table-responsive">
              <table class="table list-table-wp">
                <thead>
                  <tr>
                    <td><span class="thead-text">STT</span></td>
                    <td><span class="thead-text">Hình ảnh</span></td>
                    <td class="name">
                      <span class="thead-text">Tên sản phẩm</span>
                    </td>
                    <td><span class="thead-text">Giá</span></td>
                    <td><span class="thead-text">Danh mục</span></td>

                    <td><span class="thead-text">Thời gian</span></td>
                  </tr>
                </thead>
                <tbody :key="index" v-for="(product, index) in products">
                  <tr>
                    <td>
                      <span class="tbody-text"
                        ><h3>{{ index + 1 }}</h3></span
                      >
                    </td>

                    <td>
                      <div class="tbody-thumb">
                        <img :src="product.imgUrl" alt="" />
                      </div>
                    </td>
                    <td class="clearfix">
                      <div class="tb-title fl-left">
                        <a href="" title="">{{ product.name }}</a>
                      </div>
                      <ul class="list-operation fl-right">
                        <li>
                          <router-link
                            :to="{
                              name: 'product.edit',
                              params: { id: product._id },
                            }"
                            title="Sửa"
                            class="edit"
                          >
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                          </router-link>
                        </li>
                        <li>
                          <a
                            title="Xóa"
                            class="delete"
                            @click="deleteProduct(product._id, product.name)"
                            ><i class="fa fa-trash" aria-hidden="true"></i
                          ></a>
                        </li>
                      </ul>
                    </td>
                    <td>
                      <span class="tbody-text"
                        >{{
                          product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                        }}
                        Đ</span
                      >
                    </td>
                    <td>
                      <span class="tbody-text" v-if="product.category == 1"
                        >Điện thoại</span
                      >
                      <span class="tbody-text" v-if="product.category == 2"
                        >Laptop</span
                      >
                    </td>

                    <td>
                      <span class="tbody-text">{{
                        format(product.createdAt)
                      }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/admin/Sidebar.vue";
import Header from "@/components/admin/Header.vue";
import ProductService from "@/service/product.service.js";
import moment from "moment";
export default {
  name: "list_products",
  components: {
    Sidebar,
    Header,
  },
  data() {
    return {
      products: [],
      category: 0,
      search_product: "",
      phone: [],
      laptop: [],
    };
  },
  watch: {
    search_product: async function () {
      this.search();
    },
  },

  methods: {
    async deleteProduct(id, name) {
      if (confirm("Bạn muốn xoá " + name + "?")) {
        let products = await ProductService.delete(id);
        this.getAllProduct();
      }
    },
    async search() {
      var search = this.search_product;
      this.products = await ProductService.getAll();
      this.products = this.products.filter(function (product) {
        return (
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.price.includes(search)
        );
      });
    },
    async getAllProduct() {
      try {
        this.products = await ProductService.getAll();
        this.phone = this.products.filter(function (product) {
          return product.category == 1;
        });
        this.laptop = this.products.filter(function (product) {
          return product.category == 2;
        });
      } catch (err) {
        console.log(err);
      }
    },
    format(date) {
      return moment(String(date)).format("HH:mm, DD/MM/YY");
    },
    async filter() {
      try {
        if (this.category != 0) {
          var category = this.category;
          this.products = await ProductService.getAll();

          this.products = this.products.filter(function (product) {
            return product.category == category;
          });
        } else {
          this.products = await ProductService.getAll();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getAllProduct();
  },
};
</script>

<style scoped>
.name {
  width: 45%;
}
</style>