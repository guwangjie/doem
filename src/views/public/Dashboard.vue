<template>
  <div class="dashboard">
    <div class="row">
      <div class="item">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span class="text_hidden">二维码</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click.native="$router.push('/company/scan_code/scan_code_lst')"
              >查看全部</el-button
            >
          </div>
          <div>
            <svg-icon icon-class="qrcode" class="icon" />
            <div class="text_hidden">
              今日激活<span class="num">{{
                card_info.code_activation_count
              }}</span
              >条
            </div>
          </div>
        </el-card>
      </div>
      <div class="item">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span class="text_hidden">工人（APP）</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click.native="
                $router.push('/worker_manage/worker_check/worker_check_lst')
              "
              >查看全部</el-button
            >
          </div>
          <div>
            <svg-icon icon-class="worker" class="icon" />
            <div class="text_hidden">
              待审核<span class="num">{{ card_info.worker_join_count }}</span
              >个
            </div>
          </div>
        </el-card>
      </div>
      <div class="item">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span class="text_hidden">订单</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >查看全部</el-button
            >
          </div>
          <div>
            <svg-icon icon-class="order" class="icon" />
            <div class="text_hidden">
              待处理<span class="num">{{ card_info.worker_order_count }}</span
              >个
            </div>
          </div>
        </el-card>
      </div>
      <div class="item">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span class="text_hidden">经销商(小程序)</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >查看全部</el-button
            >
          </div>
          <div>
            <svg-icon icon-class="apply" class="icon" />
            <div class="text_hidden">
              待审核<span class="num">{{ card_info.dealer_user_count }}</span
              >个
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <div class="row">
      <div class="item">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span class="text_hidden">工人(小程序)</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >查看全部</el-button
            >
          </div>
          <div>
            <svg-icon icon-class="worker" class="icon" />
            <div class="text_hidden">
              待审核<span class="num">{{ card_info.worker_apply_count }}</span
              >个
            </div>
          </div>
        </el-card>
      </div>
      <div class="empty"></div>
      <div class="empty"></div>
      <div class="empty"></div>
    </div>
    <div class="echart_row">
      <div id="regeister_echart"></div>
      <div id="worker_echart"></div>
    </div>
  </div>
</template>
<script>
import { getDashBordIndex } from '@/api/dashboard/index'
export default {
  name: 'Dashboard',
  data() {
    return {
      websocket: null,
      card_info: {}
    }
  },
  mounted() {
    this.getDashBordIndex()
  },
  methods: {
    /**
     * 获取控制台首页数据
     */
    getDashBordIndex: function() {
      getDashBordIndex()
        .then(res => {
          this.card_info = res.data.card_info

          this.$nextTick(() => {
            this.$chart.base_map_for_time(
              'regeister_echart',
              'bar',
              '注册用户趋势图',
              '日期',
              '人数',
              [
                {
                  name: '工人',
                  data: res.data.worker,
                  type: 'line',
                  smooth: true,
                  label: {
                    normal: {
                      show: true,
                      position: 'top'
                    }
                  },
                  itemStyle: {
                    color: '#bc2f2e'
                  },
                  areaStyle: {
                    color: '#bc2f2e'
                  }
                },
                {
                  name: '经销商',
                  data: res.data.dealer_user,
                  type: 'line',
                  smooth: true,
                  label: {
                    normal: {
                      show: true,
                      position: 'top'
                    }
                  },
                  itemStyle: {
                    color: '#2ba245'
                  },
                  areaStyle: {
                    color: '#2ba245'
                  }
                },
                {
                  name: '普通用户',
                  data: res.data.user,
                  type: 'line',
                  smooth: true,
                  label: {
                    normal: {
                      show: true,
                      position: 'top'
                    }
                  },
                  itemStyle: {
                    color: '#108ee9'
                  },
                  areaStyle: {
                    color: '#108ee9'
                  }
                }
              ],
              [{ name: '工人' }, { name: '经销商' }, { name: '普通用户' }],
              {
                start_time: new Date(new Date() - 3600 * 1000 * 24 * 90),
                end_time: new Date()
              }
            )
            this.$chart.pie_map(
              'worker_echart',
              '工人区域比例图',
              [
                {
                  name: '人数',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '60%'],
                  data: res.data.worker_area,
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ],
              res.data.worker_area_name
            )
          })
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="less" scoped>
.dashboard {
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .empty {
      flex: 1;
      padding: 10px;
    }
    .item {
      flex: 1;
      padding: 10px;
      /deep/ .el-card__header {
        color: #ffffff;
        font-weight: bold;
        .clearfix {
          display: flex;
          justify-content: space-between;
        }
        span {
          flex: 1;
        }
        .el-button--text {
          color: #ffffff;
        }
      }
      .el-card__body > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon {
          flex: 1;
          padding: 10px;
          font-size: 24px;
          border-radius: 2px;
          color: #ffffff;
          max-width: 24px;
        }
        div {
          flex: 1;
          display: flex;
          justify-content: flex-end;
        }
        .num {
          color: @red;
          font-weight: bold;
          padding: 0 5px;
        }
      }
    }
    &:nth-child(1) {
      .item {
        &:nth-child(1) {
          /deep/ .el-card__header {
            background: #27a9e3 !important;
          }
          .icon {
            background: #27a9e3;
          }
        }
        &:nth-child(2) {
          /deep/ .el-card__header {
            background: #28b779 !important;
          }
          .icon {
            background: #28b779;
          }
        }
        &:nth-child(3) {
          /deep/ .el-card__header {
            background: #ffb848 !important;
          }
          .icon {
            background: #ffb848;
          }
        }
        &:nth-child(4) {
          /deep/ .el-card__header {
            background: #2255a4 !important;
          }
          .icon {
            background: #2255a4;
          }
        }
      }
    }
    &:nth-child(2) {
      .item {
        &:nth-child(1) {
          /deep/ .el-card__header {
            background: #da542e !important;
          }
          .icon {
            background: #da542e;
          }
        }
        &:nth-child(2) {
          /deep/ .el-card__header {
            background: #2255a4 !important;
          }
          .icon {
            background: #2255a4;
          }
        }
      }
    }
  }
  .echart_row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    #regeister_echart {
      width: 55%;
      height: 550px;
      margin: 30px 0;
    }
    #worker_echart {
      width: 40%;
      height: 500px;
      margin: 30px 0;
    }
  }
}
</style>
