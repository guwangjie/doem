<template>
  <div class="app-container permission_src_lst">
    <div class="opt_head">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click.native="
          $router.push('/permission/permission_src/permission_src_add')
        "
        >添加</el-button
      >
    </div>
    <el-table
      :data="List"
      row-key="id"
      class="block"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        v-for="(column, index) in listKey"
        :key="index"
        :label="column.title"
      >
        <template slot-scope="scope">
          <span>{{ scope.row[column.dataIndex] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            icon="el-icon-delete"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {
  permissionSrcLst,
  permissionSrcDelete
} from '@/api/permission/permission_src'

export default {
  name: 'PermissionSrcLst',
  data() {
    return {
      List: [],
      listKey: [
        {
          title: '资源名称',
          dataIndex: 'title'
        },
        {
          title: '权限码',
          dataIndex: 'permission_code'
        }
      ]
    }
  },
  mounted() {
    this.getPermissionSrcLst()
  },
  methods: {
    /**
     * 获取后台数据
     */
    getPermissionSrcLst() {
      permissionSrcLst()
        .then(res => {
          this.List = res.data
        })
        .catch(() => {})
    },
    /**
     * 编辑操作
     */
    handleEdit(index, row) {
      this.$router.push({
        path: '/permission/permission_src/permission_src_edit',
        query: {
          id: row.id
        }
      })
    },
    /**
     * 删除操作
     */
    handleDelete(index, row) {
      permissionSrcDelete({ id: row.id })
        .then(res => {
          this.List.splice(index, 1)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
        .catch(() => {})
    }
  }
}
</script>
<style scoped>
.permission_src_lst .block {
  margin-top: 20px;
}
</style>
