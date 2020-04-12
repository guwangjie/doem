<template>
  <div class="app-container worker_check_lst">
    <div class="opt_head">
      <el-button
        type="success"
        icon="el-icon-download"
        @click.native="exportXlsx"
        >excel</el-button
      >
      <el-button
        type="success"
        icon="el-icon-download"
        @click.native="exportXlsxAll"
        >全部</el-button
      >
    </div>
    <el-form :inline="true" class="demo-form-inline block">
      <el-form-item>
        <el-input v-model="params.name" placeholder="姓名" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="params.phone" placeholder="电话" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="params.worker_no" placeholder="工号" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click.native="onSubmit"
          >查询</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button
          type="info"
          icon="el-icon-refresh-left"
          @click.native="onReset"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="List" border>
      <el-table-column
        v-for="(column, index) in listKey"
        :key="index"
        :label="column.title"
        min-width="150"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span>{{ scope.row[column.dataIndex] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="360">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-view"
            type="primary"
            @click="handleDetail(scope.$index, scope.row)"
            >详情</el-button
          >
          <el-button
            size="mini"
            icon="el-icon-check"
            type="success"
            @click="handlePass(scope.$index, scope.row)"
            >通过</el-button
          >
          <el-button
            size="mini"
            icon="el-icon-refresh-left"
            type="warning"
            @click="handleBack(scope.$index, scope.row)"
            >驳回</el-button
          >
          <el-button
            size="mini"
            icon="el-icon-minus"
            type="danger"
            @click="handleDisabled(scope.$index, scope.row)"
            >禁用</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :current-page="params.page"
        :total="params.total"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="params.pageSize"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog title="填写驳回原因" :visible.sync="dialogFormVisible">
      <el-row type="flex" justify="center">
        <el-col :xs="24" :md="24">
          <el-form
            ref="ruleForm"
            :rules="rules"
            :model="ruleForm"
            label-position="right"
            label-width="150px"
          >
            <el-form-item label="驳回类型" prop="reason_type">
              <el-select
                v-model="ruleForm.reason_type"
                placeholder="请选择驳回类型"
              >
                <el-option
                  label="服务工种或服务区域审核未通过"
                  value="1"
                ></el-option>
                <el-option
                  label="实名认证信息审核未通过（包含头像与真实姓名）"
                  value="2"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="详细原因" prop="reason_text">
              <el-input
                type="textarea"
                v-model="ruleForm.reason_text"
                placeholder="请填写详细原因"
                maxlength="18"
                show-word-limit
                resize="none"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >确定</el-button
              >
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import {
  workerCheckLst,
  workerCheckLstAll,
  workerCheckPass,
  workerCheckDisabled,
  workerCheckNoPass
} from '@/api/worker_manage/worker_check'

export default {
  name: 'WorkerCheckLst',
  data() {
    return {
      List: [],
      listKey: [
        {
          title: '编号',
          dataIndex: 'id'
        },
        {
          title: '工号',
          dataIndex: 'worker_no'
        },
        {
          title: '姓名',
          dataIndex: 'name'
        },
        {
          title: '电话',
          dataIndex: 'phone'
        },
        {
          title: '服务区域',
          dataIndex: 'worker_add_service_area'
        },
        {
          title: '服务工种',
          dataIndex: 'worker_add_service_gz_category'
        },
        {
          title: '申请时间',
          dataIndex: 'create_time'
        },
        {
          title: '团队(人)',
          dataIndex: 'team_num'
        },
        {
          title: '车辆信息',
          dataIndex: 'car_info'
        },
        {
          title: '所在地区',
          dataIndex: 'area'
        },
        {
          title: '保证金',
          dataIndex: 'apply_signing_money'
        }
      ],
      params: {
        page: 1,
        total: 0,
        pageSize: 10,
        name: '',
        phone: '',
        worker_no: ''
      },
      dialogFormVisible: false,
      ruleForm: {
        reason_type: '',
        reason_text: '',
        id: null
      },
      rules: {
        reason_type: [
          { required: true, message: '请选择驳回类型', trigger: 'blur' }
        ],
        reason_text: [
          { required: true, message: '请输入详细原因', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getWorkerCheckLst()
  },
  methods: {
    /**
     * 获取后台数据
     */
    getWorkerCheckLst() {
      workerCheckLst(this.params)
        .then(res => {
          this.List = res.data.data
          this.params.total = res.data.total
        })
        .catch(() => {})
    },
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getWorkerCheckLst()
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getWorkerCheckLst()
    },
    onSubmit() {
      this.params.page = 1
      this.params.pageSize = 10
      this.getWorkerCheckLst()
    },
    onReset() {
      this.params = {
        page: 1,
        total: 0,
        pageSize: 10,
        name: '',
        phone: '',
        worker_no: ''
      }
      this.getWorkerCheckLst()
    },
    /**
     * 导出excel
     */
    exportXlsx: function() {
      let data = []
      let data_object = {}
      let header = { header: [] } //可以指定列顺序
      //定制表头
      this.listKey.forEach((ele, i) => {
        let key_name = String.fromCharCode(i + 65).toString()
        data_object[key_name] = ele.title
      })
      data.push(data_object)
      //定制数据
      this.List.forEach((element, index) => {
        data_object = {}
        this.listKey.forEach((ele, i) => {
          let key_name = String.fromCharCode(i + 65).toString()
          data_object[key_name] = element[ele.dataIndex]
        })
        data.push(data_object)
      })
      header.skipHeader = true
      this.$xlsx.outputXlsxFile(data, header, '工人审核列表')
    },
    /**
     * 导出全部
     */
    exportXlsxAll: function() {
      //获取全部数据
      workerCheckLstAll()
        .then(res => {
          let List = res.data
          let data = []
          let data_object = {}
          let header = { header: [] } //可以指定列顺序
          //定制表头
          this.listKey.forEach((ele, i) => {
            let key_name = String.fromCharCode(i + 65).toString()
            data_object[key_name] = ele.title
          })
          data.push(data_object)
          //定制数据
          List.forEach((element, index) => {
            data_object = {}
            this.listKey.forEach((ele, i) => {
              let key_name = String.fromCharCode(i + 65).toString()
              data_object[key_name] = element[ele.dataIndex]
            })
            data.push(data_object)
          })
          header.skipHeader = true
          this.$xlsx.outputXlsxFile(data, header, '全部工人审核列表')
        })
        .catch(() => {})
    },
    /**
     * 查看详情
     */
    handleDetail(index, row) {
      this.$router.push({
        path: '/worker_manage/worker_check/worker_check_detail',
        query: {
          id: row.id
        }
      })
    },
    /**
     * 通过
     */
    handlePass(index, row) {
      workerCheckPass({
        id: row.id
      }).then(res => {
        this.List.splice(index, 1)
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    },
    handleBack(index, row) {
      this.dialogFormVisible = true
      this.ruleForm.id = row.id
    },
    submitForm(formName) {
      const _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          workerCheckNoPass(this.ruleForm)
            .then(res => {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.dialogFormVisible = false
            })
            .catch(() => {})
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    /**
     * 禁用
     */
    handleDisabled(index, row) {
      workerCheckDisabled({
        id: row.id
      }).then(res => {
        this.List.splice(index, 1)
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    }
  }
}
</script>
<style scoped>
.worker_check_lst .block {
  margin-top: 20px;
}
</style>
