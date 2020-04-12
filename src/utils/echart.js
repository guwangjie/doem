/**
 * 各种画echarts图表的方法都封装在这里
 * 注意：这里echarts没有采用按需引入的方式
 */
import { EleResize } from '@/utils/eleresize.js'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/dataZoomInside'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/legendScroll'
import 'echarts/lib/component/grid'
const install = function(Vue) {
  Object.defineProperties(Vue.prototype, {
    $chart: {
      get() {
        return {
          /**
           * X轴为时间的图表
           * @param {绑定id} id
           * @param {图标类型} type
           * @param {图表标题} title
           * @param {X轴标题} title_x
           * @param {Y轴标题} title_y
           * @param {Y轴数据二维数组} data
           * @param {图例标题数组} legend_data
           * @param {时间 范围 Objec} time
           */
          base_map_for_time: function(
            id,
            type,
            title,
            title_x,
            title_y,
            series,
            legend_data,
            time
          ) {
            this.chart = echarts.init(document.getElementById(id))
            this.chart.clear()
            this.chart.setOption({
              title: {
                text: title,
                left: '10%'
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'cross'
                }
              },
              legend: { data: legend_data },
              toolbox: {
                feature: {
                  magicType: {
                    type: ['line', 'bar']
                  },
                  restore: {
                    show: true,
                    title: '还原'
                  },
                  saveAsImage: {}
                }
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              dataZoom: [
                {
                  type: 'inside'
                }
              ],
              xAxis: {
                name: title_x,
                type: 'time',
                splitLine: {
                  show: false
                },
                min: time.start_time,
                max: time.end_time,
                axisLabel: {
                  interale: 0,
                  rotate: -40,
                  formatter: function(value) {
                    //在这里写你需要的时间格式
                    var t_date = new Date(value)
                    return [
                      t_date.getFullYear(),
                      t_date.getMonth() + 1,
                      t_date.getDate()
                    ].join('-')
                  }
                }
              },
              yAxis: {
                name: title_y,
                type: 'value'
              },
              series: series
            })
            let echartsid = document.getElementById(id)
            // EleResize.on(echartsid, () => {
            //   this.chart.resize()
            // })
            window.addEventListener('resize', () => {
              this.chart.resize()
            })
          },
          pie_map: function(id, title, series, legend_data) {
            this.chart = echarts.init(document.getElementById(id))
            this.chart.clear()
            this.chart.setOption({
              title: {
                text: title,
                left: 'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
              },
              legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: legend_data
              },
              series: series
            })
            let echartsid = document.getElementById(id)
            window.addEventListener('resize', () => {
              this.chart.resize()
            })
          }
        }
      }
    }
  })
}

export default {
  install
}
