<template>
  <Header></Header>
  <div id="main-content-wp" class="add-cat-page">
    <div class="wrap clearfix">
      <sidebar></sidebar>
      <div id="content" class="fl-right">
        <div class="section" id="title-page">
          <div class="clearfix">
            <h3 id="index" class="fl-left">Thêm sản phẩm</h3>
          </div>
        </div>
        <div class="section" id="detail-page">
          <div class="section-detail">
            <Form @submit="save()" :validation-schema="addProductFormSchema">
              <label for="name">Tên sản phẩm</label>
              <ErrorMessage name="name" class="error-feedback invalid" />

              <Field
                type="text"
                name="name"
                v-model="product.name"
                id="product-name"
                placeholder="Nhập tên của sản phẩm"
              />

              <label for="price">Giá sản phẩm</label>

              <div class="invalid" v-if="errors.price">
                {{ errors.price }}
              </div>
              <input
                type="text"
                name="price"
                id="price"
                @blur="validate()"
                v-model="product.price"
                :class="{ 'is-invalid': errors.description }"
                placeholder="Nhập giá của sản phẩm"
              />

              <label for="desc">Chi tiết</label>
              <div class="invalid" v-if="errors.description">
                {{ errors.description }}
              </div>
              <textarea
                name="desc"
                id="desc"
                class="ckeditor"
                @blur="validate()"
                v-model="product.description"
                :class="{ 'is-invalid': errors.description }"
                placeholder="Nhập chi tiết của sản phẩm"
              ></textarea>

              <label>Hình ảnh</label>
              <ErrorMessage name="imgUrl" class="error-feedback invalid" />

              <div id="uploadFile">
                <Field
                  type="text"
                  name="imgUrl"
                  id="upload-thumb"
                  v-model="product.imgUrl"
                  placeholder="Nhập liên kết hình ảnh sản phẩm"
                />
              </div>
              <label>Danh mục sản phẩm</label>
              <div class="invalid" v-if="errors.category">
                {{ errors.category }}
              </div>
              <select
                name="parent_id"
                @blur="validate()"
                v-model="product.category"
                :class="{ 'is-invalid': errors.category }"
              >
                <option value="">-- Chọn danh mục --</option>
                <option value="1">Điện thoại</option>
                <option value="2">Laptop</option>
              </select>
              <button type="submit" name="btn-submit" id="btn-submit">
                Thêm mới
              </button>
            </Form>
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
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  name: "add-prodcut",
  components: {
    Sidebar,
    Header,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const addProductFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Vui lòng nhập tên sản phẩm")
        .min(6, "Tên sản phẩm dài ít nhất 6 ký tự"),
      imgUrl: yup
        .string()
        .required("Vui lòng nhập đường link hình ảnh sản phẩm"),
    });
    return {
      errors: {
        description: "",
        price: "",
        category: "",
      },
      product: {
        name: "",
        imgUrl: "",
        price: "",
        description: "",
        category: "",
      },
      addProductFormSchema,
    };
  },
  methods: {
    validate() {
      let isValid = true;
      this.errors = {
        description: "",
        price: "",
        category: "",
      };

      if (!this.product.description) {
        this.errors.description = "Vui lòng nhập mô tả sản phẩm";
        isValid = false;
      }
      if (!this.product.category) {
        this.errors.category = "Vui lòng chọn danh mục sản phẩm";
        isValid = false;
      }
      if (!this.product.price) {
        this.errors.price = "Vui lòng nhập giá sản phẩm";
        isValid = false;
      } else if (!this.isNumber(this.product.price)) {
        this.errors.price = "Vui lòng nhập số";
        isValid = false;
      }
      return isValid;
    },
    isNumber(value) {
      return /^\d*$/.test(value);
    },
    async save() {
      if (this.validate()) {
        if (this.$route.params.id) {
          try {
            await ProductService.update(this.$route.params.id, this.product);
            this.$router.push({ name: "admin" });
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            await ProductService.create(this.product);
            this.$router.push({ name: "admin" });
          } catch (error) {
            console.log(error);
          }
        }
      }
    },
    async getProduct(productId) {
      try {
        this.product = await ProductService.get(productId);
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    let productId = this.$route.params.id;
    if (productId) {
      this.getProduct(productId);
    }
  },
};
</script>

<style>
.invalid {
  color: red;
}
</style>