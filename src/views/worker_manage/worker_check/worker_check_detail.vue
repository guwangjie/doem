<template>
  <div class="app-container scan_code_detail">
    <table class="table" v-if="Object.keys(detail).length > 0">
      <thead>
        <tr>
          <th colspan="8">工人基本信息</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="label">申请时间</td>
          <td class="text">{{ detail.create_time }}</td>
          <td class="label">工号</td>
          <td class="text">{{ detail.worker_no }}</td>
          <td class="label">姓名</td>
          <td class="text">{{ detail.name }}</td>
        </tr>
        <tr>
          <td class="label">审核状态</td>
          <td class="text">{{ detail.status_text }}</td>
          <td class="label">电话</td>
          <td class="text">{{ detail.phone }}</td>
          <td class="label">所在区域</td>
          <td class="text">{{ detail.area }}</td>
        </tr>
        <tr>
          <td class="label">头像</td>
          <td class="text">
            <div class="img">
              <el-image
                :src="detail.headimgurl"
                :preview-src-list="[detail.headimgurl]"
                :lazy="true"
              ></el-image>
            </div>
          </td>
          <td class="label">团队人数</td>
          <td class="text">{{ detail.team_num }}</td>
          <td class="label">车辆信息</td>
          <td class="text">{{ detail.car_info }}</td>
        </tr>
      </tbody>
    </table>
    <table class="table" v-if="Object.keys(detail).length > 0">
      <thead>
        <tr>
          <th colspan="8">服务信息</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="label">两小时上门</td>
          <td class="text">{{ detail.area }}</td>
          <td class="label">售后保障期（月）</td>
          <td class="text">{{ detail.service_protect_month }}</td>
          <td class="label">保证金</td>
          <td class="text">{{ detail.apply_signing_money }}</td>
        </tr>
        <tr>
          <td class="label">服务区域</td>
          <td class="text">{{ detail.worker_add_service_area }}</td>
          <td class="label">服务工种</td>
          <td class="text" colspan="3">
            {{ detail.worker_add_service_gz_category }}
          </td>
        </tr>
      </tbody>
    </table>
    <table class="table" v-if="Object.keys(detail).length > 0">
      <thead>
        <tr>
          <th colspan="8">实名认证信息</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="label">真实姓名</td>
          <td class="text">{{ detail.worker_identify_name }}</td>
          <td class="label">性别</td>
          <td class="text">{{ detail.worker_identify_sex }}</td>
          <td class="label">身份证号</td>
          <td class="text">{{ detail.worker_identify_idcard }}</td>
        </tr>
        <tr>
          <td class="label">身份证（正面）</td>
          <td class="text">
            <div class="img">
              <el-image
                :src="detail.idcard_zheng"
                :preview-src-list="[detail.idcard_zheng]"
                :lazy="true"
              ></el-image>
            </div>
          </td>
          <td class="label">身份证（手持）</td>
          <td class="text">
            <div class="img">
              <el-image
                :src="detail.idcard_zheng_hand"
                :preview-src-list="[detail.idcard_zheng_hand]"
                :lazy="true"
              ></el-image>
            </div>
          </td>
          <td class="label">紧急联系电话</td>
          <td class="text">{{ detail.emergency_contact }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { workerCheckDetail } from '@/api/worker_manage/worker_check'
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
    this.getWorkerCheckDetail()
  },
  methods: {
    getWorkerCheckDetail() {
      workerCheckDetail({ id: this.ruleForm.id })
        .then(res => {
          this.detail = res.data
          // res.data.scan_code_activation_picture.forEach(element => {
          //   this.preview_list.push(element.picture)
          // })
        })
        .catch(() => {})
    }
  }
}
</script>
