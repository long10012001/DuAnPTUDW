<template>
  <Header></Header>
  <div id="main-content-wp" class="cart-page">
    <div class="section" id="breadcrumb-wp">
      <div class="wp-inner">
        <div class="section-detail">
          <ul class="list-item clearfix">
            <li>
              <a href="?page=home" title="">Trang chủ</a>
            </li>
            <li>
              <a href="" title="">Sản phẩm làm đẹp da</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div id="wrapper" class="wp-inner clearfix">
      <div class="section" id="info-cart-wp">
        <div class="section-detail table-responsive">
          <table class="table">
            <thead>
              <tr>
                <td>Ảnh sản phẩm</td>
                <td>Tên sản phẩm</td>
                <td>Giá sản phẩm</td>
                <td>Số lượng</td>
                <td colspan="2">Thành tiền</td>
              </tr>
            </thead>
            <tbody :key="index" v-for="(product, index) in list_product">
              <tr>
                <td>
                  <a href="" title="" class="thumb">
                    <img :src="product.imgUrl" alt="" />
                  </a>
                </td>
                <td>
                  <a href="" title="" class="name-product">{{
                    product.name
                  }}</a>
                </td>
                <td>
                  {{ `${product.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".") }}
                  đ
                </td>
                <td>
                  <input
                    type="text"
                    name="num-order"
                    :value="product.amount"
                    class="num-order"
                  />
                </td>
                <td>
                  {{
                    `${product.price * product.amount}`.replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      "."
                    )
                  }}
                  đ
                </td>
                <td>
                  <a title="" class="del-product"
                    ><i
                      class="fa fa-trash-o"
                      @click="deleteProductInCart(index)"
                    ></i
                  ></a>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="7">
                  <div class="clearfix">
                    <p id="total-price" class="fl-right">
                      Tổng giá:
                      {{
                        `${totalPrice()}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                      }}
                      đ
                    </p>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="7">
                  <div class="clearfix">
                    <div class="fl-right">
                      <router-link :to="{ name: 'checkout' }" id="checkout-cart"
                        >Thanh toán</router-link
                      >
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div class="section" id="action-cart-wp">
        <div class="section-detail">
          <router-link :to="{ name: 'home' }" id="buy-more"
            >Mua tiếp</router-link
          >
          <br />
          <a title="" id="delete-cart"
            ><p @click="destroyCart()">Xóa giỏ hàng</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "cart",
  components: {
    Header,
  },
  data() {
    return {
      list_product: [],
    };
  },
  mounted() {
    const listLocalCart = JSON.parse(
      localStorage.getItem("localProductCart") ?? "[]"
    );
    this.list_product = listLocalCart;
  },
  methods: {
    totalPrice() {
      let total = 0;
      for (let i = 0; i < this.list_product.length; i++) {
        total += this.list_product[i].price * this.list_product[i].amount;
      }
      return total;
    },
    deleteProductInCart(index) {
      const filteredProductCart = this.list_product.filter(
        (product) => product.id != this.list_product[index].id
      );
      this.list_product = filteredProductCart;
      const localProductCart = JSON.stringify(filteredProductCart);
      localStorage.setItem("localProductCart", localProductCart);
    },
    destroyCart() {
      localStorage.removeItem("localProductCart");
      this.list_product = [];
    },
  },
};
</script>
