<template>
  <div class="app-container permission_menu_lst">
    <div class="opt_head">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click.native="
          $router.push('/permission/permission_menu/permission_menu_add')
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
        min-width="150"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span
            v-if="
              column.dataIndex === 'hidden' && scope.row[column.dataIndex] === 1
            "
            >显示</span
          >
          <span
            v-else-if="
              column.dataIndex === 'hidden' && scope.row[column.dataIndex] === 2
            "
            >隐藏</span
          >
          <span v-else>{{ scope.row[column.dataIndex] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="180">
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
  permissionMenuDelete,
  permissionMenuLst
} from '@/api/permission/permission_menu'

export default {
  name: 'PermissionMenuLst',
  data() {
    return {
      List: [],
      listKey: [
        {
          title: '菜单名称',
          dataIndex: 'title'
        },
        {
          title: '路由地址',
          dataIndex: 'path'
        },
        {
          title: '映射组件名称',
          dataIndex: 'component'
        },
        {
          title: '路由名称',
          dataIndex: 'name'
        },
        {
          title: '重定向地址',
          dataIndex: 'redirect'
        },
        {
          title: '图标',
          dataIndex: 'icon'
        },
        {
          title: '左侧导航显示',
          dataIndex: 'hidden'
        }
      ]
    }
  },
  mounted() {
    this.getPermissionMenuLst()
  },
  methods: {
    /**
     * 获取后台数据
     */
    getPermissionMenuLst() {
      permissionMenuLst()
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
        path: '/permission/permission_menu/permission_menu_edit',
        query: {
          id: row.id
        }
      })
    },
    /**
     * 删除操作
     */
    handleDelete(index, row) {
      permissionMenuDelete({ id: row.id })
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
.permission_menu_lst .block {
  margin-top: 20px;
}
</style>
