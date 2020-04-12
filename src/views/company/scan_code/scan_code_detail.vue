<template>
  <div class="app-container scan_code_detail">
    <table class="table" v-if="Object.keys(detail).length > 0">
      <tbody>
        <tr>
          <td class="label">客户姓名</td>
          <td class="text">{{ detail.client_name }}</td>
          <td class="label">客户电话</td>
          <td class="text">{{ detail.client_phone }}</td>
          <td class="label">激活用户昵称</td>
          <td class="text">{{ detail.nickname }}</td>
          <td class="label">质保日期</td>
          <td class="text">{{ detail.sell_bill_date }}</td>
        </tr>
        <tr>
          <td class="label">型号名称</td>
          <td class="text">{{ detail.product_model_name }}</td>
          <td class="label">产品类别</td>
          <td class="text">{{ detail.product_brand_category_name }}</td>
          <td class="label">产品品牌</td>
          <td class="text">{{ detail.product_brand_name }}</td>
          <td class="label">产品规格</td>
          <td class="text">{{ detail.product_specification_name }}</td>
        </tr>
        <tr>
          <td class="label">有无电梯</td>
          <td class="text">{{ detail.client_elevator_string }}</td>
          <td class="label">楼层</td>
          <td class="text">{{ detail.client_floor }}</td>
          <td class="label">省-市-区-街道</td>
          <td class="text">
            {{ detail.client_province }}{{ detail.client_city
            }}{{ detail.client_district }}{{ detail.client_street }}
          </td>
          <td class="label">详细地址</td>
          <td class="text">{{ detail.client_address }}</td>
        </tr>
        <tr>
          <td class="label">质保码</td>
          <td class="text">{{ detail.code }}</td>
          <td class="label">激活时间</td>
          <td class="text">{{ detail.create_time }}</td>
          <td class="label">剩余时间</td>
          <td class="text" colspan="3">{{ detail.zhibao }}</td>
        </tr>
        <tr>
          <td class="label">师傅姓名</td>
          <td class="text">{{ detail.master_name }}</td>
          <td class="label">师傅电话</td>
          <td class="text">{{ detail.master_phone }}</td>
          <td class="label">门店名称</td>
          <td class="text">{{ detail.store_name }}</td>
          <td class="label">门店电话</td>
          <td class="text">{{ detail.store_phone }}</td>
        </tr>
        <tr>
          <td class="label">产品图片</td>
          <td colspan="3">
            <div class="img">
              <el-image
                v-for="(item, index) in detail.scan_code_activation_picture"
                :src="item.picture"
                :key="index"
                :preview-src-list="preview_list"
                :lazy="true"
              ></el-image>
            </div>
          </td>
          <td class="label">收据单</td>
          <td colspan="3">
            <div class="img">
              <el-image
                :src="detail.sell_bill_picture"
                :preview-src-list="[detail.sell_bill_picture]"
                :lazy="true"
              ></el-image>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { scanCodeDetail } from '@/api/company/scan_code'
export default {
  name: 'ScanCodeDetail',
  data() {
    return {
      ruleForm: {
        id: this.$route.query.id
      },
      detail: {},
      preview_list: []
    }
  },
  mounted() {
    this.getScanCodeDetail()
  },
  methods: {
    getScanCodeDetail() {
      scanCodeDetail({ id: this.ruleForm.id })
        .then(res => {
          this.detail = res.data
          res.data.scan_code_activation_picture.forEach(element => {
            this.preview_list.push(element.picture)
          })
        })
        .catch(() => {})
    }
  }
}
</script>
