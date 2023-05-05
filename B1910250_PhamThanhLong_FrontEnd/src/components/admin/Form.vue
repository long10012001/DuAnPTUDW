<!-- <template>
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
            <form @submit.prevent="save()">
              <label for="product-name">Tên sản phẩm</label>
              <input
                type="text"
                name="product_name"
                @blur="validate()"
                v-model="product.name"
                :class="{ 'is-invalid': errors.name }"
                id="product-name"
              />
              <div class="invalid" v-if="errors.name">{{ errors.name }}</div>

              <label for="price">Giá sản phẩm</label>
              <input
                type="text"
                name="price"
                id="price"
                @blur="validate()"
                v-model="product.price"
                :class="{ 'is-invalid': errors.price }"
              />
              <div class="invalid" v-if="errors.price">
                {{ errors.price }}
              </div>
              <label for="desc">Chi tiết</label>
              <textarea
                name="desc"
                id="desc"
                class="ckeditor"
                @blur="validate()"
                v-model="product.description"
                :class="{ 'is-invalid': errors.description }"
              ></textarea>
              <div class="invalid" v-if="errors.description">
                {{ errors.description }}
              </div>

              <label>Hình ảnh</label>
              <div id="uploadFile">
                <input
                  type="text"
                  name="file"
                  id="upload-thumb"
                  @blur="validate()"
                  v-model="product.imgUrl"
                  :class="{ 'is-invalid': errors.imgUrl }"
                />
                <div class="invalid" v-if="errors.imgUrl">
                  {{ errors.imgUrl }}
                </div>
              </div>
              <label>Danh mục sản phẩm</label>
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
              <div class="invalid" v-if="errors.category">
                {{ errors.category }}
              </div>
              <button type="submit" name="btn-submit" id="btn-submit">
                Thêm mới
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script> -->