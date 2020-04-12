<template>
  <div class="app-container scan_code_lst">
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
        <el-input v-model="params.client_name" placeholder="客户姓名" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="params.client_phone" placeholder="客户电话" />
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
      <el-table-column label="操作" fixed="right" width="90">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-view"
            type="primary"
            @click="handleDetail(scope.$index, scope.row)"
            >详情</el-button
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
  </div>
</template>
<script>
import { scanCodeLst, scanCodeLstAll } from '@/api/company/scan_code'

export default {
  name: 'ScanCodeLst',
  data() {
    return {
      List: [],
      listKey: [
        {
          title: '编号',
          dataIndex: 'id'
        },
        {
          title: '客户姓名',
          dataIndex: 'client_name'
        },
        {
          title: '客户电话',
          dataIndex: 'client_phone'
        },
        {
          title: '激活昵称',
          dataIndex: 'nickname'
        },
        {
          title: '激活时间',
          dataIndex: 'create_time'
        },
        {
          title: '质保时间',
          dataIndex: 'zhibao'
        },
        {
          title: '客户省份',
          dataIndex: 'client_province'
        },
        {
          title: '客户城市',
          dataIndex: 'client_city'
        },
        {
          title: '客户区域',
          dataIndex: 'client_district'
        },
        {
          title: '客户街道',
          dataIndex: 'client_street'
        },
        {
          title: '客户详细地址',
          dataIndex: 'client_address'
        },
        {
          title: '产品品牌',
          dataIndex: 'product_brand_name'
        },

        {
          title: '产品规格',
          dataIndex: 'product_specification_name'
        },
        {
          title: '产品型号',
          dataIndex: 'product_model_name'
        },
        {
          title: '品牌类别',
          dataIndex: 'product_brand_category_name'
        },
        {
          title: '质保码',
          dataIndex: 'code'
        }
      ],
      params: {
        page: 1,
        total: 0,
        pageSize: 10,
        client_name: '',
        client_phone: ''
      }
    }
  },
  mounted() {
    this.getScanCodeLst()
  },
  methods: {
    /**
     * 获取后台数据
     */
    getScanCodeLst() {
      scanCodeLst(this.params)
        .then(res => {
          this.List = res.data.data
          this.params.total = res.data.total
        })
        .catch(() => {})
    },
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getScanCodeLst()
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getScanCodeLst()
    },
    onSubmit() {
      this.params.page = 1
      this.params.pageSize = 10
      this.getScanCodeLst()
    },
    onReset() {
      this.params = {
        page: 1,
        total: 0,
        pageSize: 10,
        client_name: '',
        client_phone: ''
      }
      this.getScanCodeLst()
    },
    /**
     * 查看详情
     */
    handleDetail(index, row) {
      this.$router.push({
        path: '/company/scan_code/scan_code_detail',
        query: {
          id: row.id
        }
      })
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
      this.$xlsx.outputXlsxFile(data, header, '二维码激活记录')
    },
    /**
     * 导出全部
     */
    exportXlsxAll: function() {
      //获取全部数据
      scanCodeLstAll()
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
          this.$xlsx.outputXlsxFile(data, header, '全部二维码激活记录')
        })
        .catch(() => {})
    }
  }
}
</script>
<style scoped>
.scan_code_lst .block {
  margin-top: 20px;
}
</style>
