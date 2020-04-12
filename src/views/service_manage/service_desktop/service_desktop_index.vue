<template>
  <div
    class="app-container service_desktop_index"
    @click="handleClickCloseDialog($event)"
  >
    <el-dialog
      title="提示"
      :visible.sync="patchDialog"
      width="30%"
      class="patch_dialog"
    >
      <el-select v-model="patch_service_id" placeholder="请选择">
        <el-option
          :span="24"
          v-for="item in online_service_list"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="patchDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click.native="handleClickPatchServiceConfirm()"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <div class="left">
      <div class="visitor_tab">
        <div
          class="item"
          :class="visitor_tab_index == 1 ? 'active_item' : ''"
          @click="handleClickVisitorTabItem(1)"
        >
          当前
        </div>
        <div
          class="item"
          :class="visitor_tab_index == 2 ? 'active_item' : ''"
          @click="handleClickVisitorTabItem(2)"
        >
          历史会话
        </div>
      </div>
      <div class="visitor_list scrollBar" v-show="visitor_tab_index == 1">
        <div
          class="item"
          :class="[
            item.visitor_status == 'online' ? '' : 'offline_item',
            item.id == currentChatVisitor.id ? 'active_item' : ''
          ]"
          v-for="(item, index) in visitor_list"
          :key="index"
          @click="handleClickshowChatDialog(index)"
        >
          <div class="img_box">
            <img class="img" :src="item.portrait" />
            <div class="message_count" v-if="item.message_count != 0">
              {{ item.message_count }}
            </div>
          </div>
          <div class="nickname">
            <div class="text_hidden">
              {{ item.nickname
              }}<span class="visit_origin_text">{{
                item.visit_origin_text
              }}</span>
            </div>
            <div class="temp_text" v-show="item.temp_text != ''">
              [草稿]
            </div>
          </div>
        </div>
      </div>
      <div class="history_list scrollBar" v-show="visitor_tab_index == 2">
        <div
          class="item"
          :class="item.id == currentHistoryVisitor.id ? 'active_item' : ''"
          v-for="(item, index) in history_list"
          :key="index"
          @click="handleClickshowHistoryDialog(index)"
        >
          <div class="img_box">
            <img class="img" :src="item.portrait" />
          </div>
          <div class="nickname">
            <div class="text_hidden">{{ item.nickname }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="middle">
      <div
        class="chat_dialog"
        v-if="
          Object.keys(currentChatVisitor).length > 0 && visitor_tab_index == 1
        "
      >
        <div class="chat_header">
          <div class="chat_header_left">
            <div class="img_box">
              <img class="img" :src="currentChatVisitor.portrait" />
            </div>
            <div class="nickname">
              {{ currentChatVisitor.nickname }}
            </div>
          </div>
          <div class="chat_header_right">
            <div class="patch_box" @click="handleClickPatchChat()">转接</div>
            <div class="close_box" @click="handleClickCloseChat()">
              <svg-icon iconClass="close" class="icon" />
              <div class="close_btn">结束会话</div>
            </div>
          </div>
        </div>
        <div class="scroll_chat scrollBar" ref="scroll_chat">
          <div
            class="scroll_chat_row"
            v-for="(item, index) in currentChatVisitor.message"
            :key="index"
          >
            <div class="time_row" v-if="item.show_time">
              <div class="time_row_text">
                {{ transformToDate(item.time) }}
              </div>
            </div>
            <div class="scroll_chat_left" v-if="item.identity == 'visitor'">
              <div class="img_box">
                <img :src="currentChatVisitor.portrait" class="img" />
              </div>
              <div
                class="content"
                v-html="item.content"
                v-if="item.type == 'text'"
              ></div>
              <el-image
                v-if="item.type == 'image'"
                class="chat_img"
                :src="item.content"
                :preview-src-list="[item.content]"
              ></el-image>
            </div>
            <div class="scroll_chat_right" v-else>
              <div
                class="content"
                v-html="item.content"
                v-if="item.type == 'text'"
              ></div>
              <el-image
                v-if="item.type == 'image'"
                class="chat_img"
                :src="item.content"
                :preview-src-list="[item.content]"
              ></el-image>
              <div class="img_box">
                <img :src="avatar" class="img" />
              </div>
            </div>
          </div>
        </div>
        <div class="send_box">
          <div class="tool_bar">
            <div class="emoji_list" v-show="show_emoji">
              <div
                class="emoji_item"
                v-for="(item, index) in emojis"
                :key="index"
              >
                <img
                  class="img"
                  :src="item.img"
                  @click="handleInsertEmoji(item.name)"
                />
              </div>
            </div>
            <div class="emoji" @click="handleShowEmoji()">
              <svg-icon iconClass="emoji" class="icon" />
            </div>
            <div class="picture" @click="handleOpenImageUploadDialog()">
              <svg-icon iconClass="picture" class="icon" />
            </div>
          </div>
          <div class="send_textarea">
            <div
              class="scrollBar textarea"
              ref="editor"
              contenteditable="true"
              @keydown="handleKeyDown($event)"
              @keyup="handlekeyUp($event)"
              @click="handleEditorClick()"
            ></div>
          </div>
          <div class="send_btn_box">
            <div class="tips">ENTER换行 SHIFT+ENTER发送</div>
            <el-button
              class="send_btn"
              type="primary"
              @click.native="handleSubmit()"
              >确定</el-button
            >
          </div>
        </div>
      </div>
      <div
        class="history_dialog"
        v-if="
          Object.keys(currentHistoryVisitor).length > 0 &&
            visitor_tab_index == 2
        "
      >
        <div class="history_header">
          <div class="history_header_left">
            <div class="img_box">
              <img class="img" :src="currentHistoryVisitor.portrait" />
            </div>
            <div class="nickname">
              {{ currentHistoryVisitor.nickname }}
            </div>
          </div>
        </div>
        <div class="scroll_history scrollBar" ref="scroll_history">
          <div
            class="scroll_history_row"
            v-for="(item, index) in currentHistoryVisitor.message"
            :key="index"
          >
            <div class="time_row">
              <div class="time_row_text">
                {{ item.create_time }}
              </div>
            </div>
            <div class="scroll_history_left" v-if="item.identity == 'visitor'">
              <div class="img_box">
                <img :src="currentHistoryVisitor.portrait" class="img" />
              </div>
              <div
                class="content"
                v-html="item.record_content"
                v-if="item.type == 'text'"
              ></div>
              <el-image
                v-if="item.type == 'image'"
                class="chat_img"
                :src="item.record_content"
                :preview-src-list="[item.record_content]"
              ></el-image>
            </div>
            <div class="scroll_history_right" v-else>
              <div
                class="content"
                v-html="item.record_content"
                v-if="item.type == 'text'"
              ></div>
              <el-image
                v-if="item.type == 'image'"
                class="chat_img"
                :src="item.record_content"
                :preview-src-list="[item.record_content]"
              ></el-image>
              <div class="img_box">
                <img :src="avatar" class="img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right" v-show="visitor_tab_index == 1">
      <div class="used_tab">
        <div
          class="item"
          :class="used_tab_index == 1 ? 'active' : ''"
          @click="handleClickChangeUseTab(1)"
        >
          客户基本资料
        </div>
        <div
          class="item"
          :class="used_tab_index == 2 ? 'active' : ''"
          @click="handleClickChangeUseTab(2)"
        >
          快捷回复
        </div>
        <div
          class="item"
          :class="used_tab_index == 3 ? 'active' : ''"
          @click="handleClickChangeUseTab(3)"
        >
          常用工具
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { PUBLIC } from '@/mixins'
import {
  serviceDesktopIndexBindClientId,
  serviceDesktopIndexGetVisitorInfo,
  serviceDesktopIndexAddServiceRecord,
  serviceDesktopIndexCloseChat,
  getEmoji,
  handleUploadChatImage,
  serviceDesktopIndexGetRecordForWeek,
  serviceDesktopIndexGetOnlineServiceList,
  serviceDesktopIndexPatchToVisitor
} from '@/api/service_manage/service_desktop'
import { mapGetters } from 'vuex'
const { clipboard, ipcRenderer } = require('electron')
const fs = require('fs')
export default {
  name: 'service_desktop_index',
  data() {
    return {
      List: [],
      ws: null,
      visitor_tab_index: 1, //选项卡索引
      /****当前 ****/
      visitor_list: [], //待接入列表
      currentChatVisitor: {}, //当前聊天对象
      show_emoji: false, //显示emoji
      emojis: [], //emoji列表
      lastEditRange: null, //最后光标对象
      patchDialog: false, //显示转接DIALOG
      online_service_list: [], //在线客服列表
      patch_service_id: null, //绑定客服id
      /****历史*****/
      history_list: [], //历史会话列表
      currentHistoryVisitor: {}, //历史记录对象
      used_tab_index: 1 //右侧常用工具栏选项卡索引
    }
  },
  mixins: [PUBLIC],
  computed: {
    ...mapGetters(['user_id', 'avatar', 'nickname'])
  },
  mounted() {
    this.initWebSocket()
  },
  methods: {
    //关闭全局对话框
    handleClickCloseDialog: function(e) {
      if (this.show_emoji) {
        if (
          e.target.className != 'emoji_list' &&
          e.target.className != 'emoji_item' &&
          e.target.className != 'emoji' &&
          e.target.parentNode.className != 'emoji'
        ) {
          this.show_emoji = false
        }
      }
    },
    /**
     * 初始化websocket
     */
    initWebSocket: function() {
      let that = this
      let temp_visitor,
        temp_offline_visitor,
        one_message,
        flag,
        cur_time,
        show_time,
        timestamp,
        is_JSON = false
      this.ws = new WebSocket(this.$config.webSocket_Base_Url)
      this.ws.onopen = function(evt) {
        //绑定连接事件
        that.$message({
          message: '客服系统连接成功',
          type: 'success'
        })
      }
      this.ws.onmessage = evt => {
        if (typeof evt.data == 'string') {
          try {
            JSON.parse(evt.data)
            is_JSON = true
          } catch (e) {
            //不是json
            is_JSON = false
          }
        }
        if (!is_JSON) {
          return false
        }

        let data = JSON.parse(evt.data)
        // console.log(data)
        switch (data.type) {
          case 'bind':
            //绑定客服id
            serviceDesktopIndexBindClientId({
              client_id: data.client_id
            }).then(res => {})
            break
          case 'wait':
            //刷新待接入游客 获取用户头像昵称userid
            flag = false
            temp_visitor = []
            that.visitor_list.forEach((element, index) => {
              if (element.id == data.user_id) {
                that.$set(that.visitor_list[index], 'visitor_status', 'online')
                temp_visitor = that.visitor_list[index]
                that.visitor_list.splice(index, 1)
                flag = true
              }
            })
            if (flag) {
              that.visitor_list.unshift(temp_visitor)
            }
            if (!flag) {
              serviceDesktopIndexGetVisitorInfo({
                user_id: data.user_id
              }).then(res => {
                switch (data.visit_origin) {
                  case '1':
                    //小程序
                    res.data.visit_origin_text = '小程序'
                    break
                  default:
                    break
                }
                res.data.visit_origin = data.visit_origin
                res.data.visitor_status = 'online'
                res.data.message_count = 0
                res.data.message = []
                res.data.temp_text = '' //草稿
                that.visitor_list.unshift(res.data)
              })
            }
            new Notification('提示', { body: '您有一个有新的会话' })
            break
          case 'visitor_offline':
            //游客离线了
            temp_offline_visitor = []
            that.visitor_list.forEach((element, index) => {
              if (element.id == data.user_id) {
                that.$set(that.visitor_list[index], 'visitor_status', 'offline')
                temp_offline_visitor = that.visitor_list[index]
                that.visitor_list.splice(index, 1)
              }
            })
            that.visitor_list = that.visitor_list.concat(temp_offline_visitor)
            break
          case 'text':
            //收到游客文本消息
            temp_visitor = []
            one_message = {}
            that.visitor_list.forEach((element, index) => {
              if (element.id == data.user_id) {
                //消息显示+1
                if (
                  Object.keys(that.currentChatVisitor).length == 0 ||
                  that.currentChatVisitor.id != data.user_id
                ) {
                  that.$set(
                    that.visitor_list[index],
                    'message_count',
                    element.message_count + 1
                  )
                }
                //判断消息发送是否超过1分钟
                cur_time = new Date()
                timestamp = cur_time.getTime()
                show_time = false
                if (element.message.length == 0) {
                  show_time = true
                } else {
                  if (
                    timestamp -
                      element.message[
                        element.message.length - 1
                      ].time.getTime() >
                    6 * 1000
                  ) {
                    show_time = true
                  }
                }
                //放入指定对象的聊天消息数组
                one_message = {
                  type: 'text',
                  content: data.content.replace(
                    /(\[\/em)([0-9]{2})(\])/g,
                    '<img src="http://lyqq.cn-lianyi.com/public/static/images/emojis/$2.gif?' +
                      Math.floor(Math.random() * 100 + 1) +
                      '" />'
                  ),
                  time: new Date(),
                  identity: 'visitor',
                  show_time: show_time
                }
                that.visitor_list[index].message.push(one_message)

                temp_visitor = that.visitor_list[index]
                that.visitor_list.splice(index, 1)
                flag = true
              }
            })
            if (flag) {
              that.visitor_list.unshift(temp_visitor)
            }
            that.chatDialogScrollToBottom()
            serviceDesktopIndexAddServiceRecord({
              visitor_id: data.user_id,
              identity: 'visitor',
              type: 'text',
              time: one_message.time.getTime(),
              record_content: data.content
            }).then(() => {})
            break
          case 'image':
            //收到游客图片消息
            temp_visitor = []
            one_message = {}
            that.visitor_list.forEach((element, index) => {
              if (element.id == data.user_id) {
                //消息显示+1
                if (
                  Object.keys(that.currentChatVisitor).length == 0 ||
                  that.currentChatVisitor.id != data.user_id
                ) {
                  that.$set(
                    that.visitor_list[index],
                    'message_count',
                    element.message_count + 1
                  )
                }
                //判断消息发送是否超过1分钟
                cur_time = new Date()
                timestamp = cur_time.getTime()
                show_time = false
                if (element.message.length == 0) {
                  show_time = true
                } else {
                  if (
                    timestamp -
                      element.message[
                        element.message.length - 1
                      ].time.getTime() >
                    6 * 1000
                  ) {
                    show_time = true
                  }
                }
                //放入指定对象的聊天消息数组
                one_message = {
                  type: 'image',
                  content: data.content,
                  time: new Date(),
                  identity: 'visitor',
                  show_time: show_time
                }
                that.visitor_list[index].message.push(one_message)

                temp_visitor = that.visitor_list[index]
                that.visitor_list.splice(index, 1)
                flag = true
              }
            })
            if (flag) {
              that.visitor_list.unshift(temp_visitor)
            }
            that.chatDialogScrollToBottom()
            serviceDesktopIndexAddServiceRecord({
              visitor_id: data.user_id,
              identity: 'visitor',
              type: 'image',
              time: one_message.time.getTime(),
              record_content: one_message.content
            }).then(() => {})
            break
          default:
            break
        }
      }
      this.ws.onclose = evt => {}
    },
    /**
     * 点击切换当前和历史记录
     */
    handleClickVisitorTabItem: function(index) {
      this.visitor_tab_index = index
      if (index == 2) {
        //历史会话
        //读取最近7天聊天记录
        serviceDesktopIndexGetRecordForWeek({}).then(res => {
          res.data.forEach((element, index) => {
            element.message.forEach((ele, i) => {
              res.data[index].message[
                i
              ].record_content = ele.record_content.replace(
                /(\[\/em)([0-9]{2})(\])/g,
                '<img src="http://lyqq.cn-lianyi.com/public/static/images/emojis/$2.gif?' +
                  Math.floor(Math.random() * 100 + 1) +
                  '" />'
              )
            })
          })
          this.history_list = res.data
          if (this.history_list.length > 0) {
            this.currentHistoryVisitor = this.history_list[0]
          }
        })
      }
    },
    /**
     * 点击显示聊天窗口
     */
    handleClickshowChatDialog: function(index) {
      //点的不是自己，保存当前文本内容为草稿
      // if (this.visitor_list[index].id != this.currentChatVisitor.id) {
      this.visitor_list.forEach((element, i) => {
        if (element.id == this.currentChatVisitor.id) {
          this.$set(
            this.visitor_list[i],
            'temp_text',
            this.$refs.editor.innerHTML
          )
        }
      })
      // }

      //消息计数为0
      this.visitor_list[index].message_count = 0
      //设置当前聊天对象
      this.currentChatVisitor = this.visitor_list[index]
      //设置当前编辑框草稿内容
      //第一次点击 没有这个编辑器
      typeof this.$refs.editor !== 'undefined'
        ? (this.$refs.editor.innerHTML = this.currentChatVisitor.temp_text)
        : ''
      //点的当前对象草稿清空
      this.$set(this.visitor_list[index], 'temp_text', '')
      this.currentChatVisitor.temp_text = ''
      //滚动到底部
      this.chatDialogScrollToBottom()
    },
    /**
     * 滚动最底部
     */
    chatDialogScrollToBottom: function() {
      if (Object.keys(this.currentChatVisitor).length > 0) {
        this.$nextTick(() => {
          this.$refs.scroll_chat.scrollTop = this.$refs.scroll_chat.scrollHeight
        })
      }
    },
    /**
     * 快捷键发送
     */
    handleKeyDown: function(event) {
      // 获取选定对象
      let selection = getSelection()
      // 设置最后光标对象
      this.lastEditRange = selection.getRangeAt(0)
      // 回车-->换行
      if (event.keyCode == 13 && !event.shiftKey) {
      }
      // shift+回车-->发送消息
      if (event.shiftKey && event.keyCode == 13) {
        // 发送消息的代码
        this.handleSubmit()
        event.preventDefault()
        return false
      }
      //ctrl+v 过滤粘贴 复制纯文本
      if (event.ctrlKey && event.keyCode == 86) {
        clipboard.writeText(clipboard.readText())
      }
    },
    //取消按键
    handlekeyUp: function(event) {
      // 获取选定对象
      let selection = getSelection()
      // 设置最后光标对象
      this.lastEditRange = selection.getRangeAt(0)
    },
    /**
     * 点击编辑器任何位置获取光标对象
     * 这里有个bug 全选鼠标变成箭头的话无法触发
     */
    handleEditorClick: function(event) {
      // 获取选定对象
      let selection = getSelection()
      // 设置最后光标对象
      this.lastEditRange = selection.getRangeAt(0)
    },
    /**
     * 显示emoji
     */
    handleShowEmoji: function() {
      if (this.emojis.length == 0) {
        getEmoji({}).then(res => {
          res.data.forEach((element, index) => {
            res.data[index].img = element.img.replace(
              '.gif',
              '.gif?' + Math.floor(Math.random() * 100 + 1)
            )
          })
          this.emojis = res.data
        })
      }
      this.show_emoji = !this.show_emoji
    },
    /**
     * 添加表情
     */
    handleInsertEmoji: function(data) {
      // 获取编辑框对象
      let edit = this.$refs.editor
      // 编辑框设置焦点
      edit.focus()
      // 获取选定对象
      let selection = getSelection()

      // 判断是否有最后光标对象存在
      if (this.lastEditRange) {
        // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
        selection.removeAllRanges()
        selection.addRange(this.lastEditRange)
      }
      // 如果是文本节点则先获取光标对象
      let range = selection.getRangeAt(0)

      if (range.collapsed) {
        //判断是textNode对象还是div对象
        if (selection.anchorNode.nodeName != '#text') {
          // 如果是编辑框范围。则创建表情文本节点进行插入
          let textNode = document.createTextNode(data)
          if (edit.childNodes.length > 0 && edit.innerText.trim() != '') {
            // 如果文本框的子元素大于0，则表示有其他元素，则按照位置插入表情节点
            for (let i = 0; i < edit.childNodes.length; i++) {
              if (edit.childNodes[i] == selection.anchorNode) {
                edit.childNodes[i].innerHTML = ''
                edit.childNodes[i].appendChild(textNode)
              }
            }
          } else {
            // 没内容
            // 否则直接插入一个表情元素
            edit.innerHTML = ''
            edit.appendChild(textNode)
          }

          // 光标对象的范围界定为新建的表情节点
          range.selectNodeContents(textNode)
          // 光标位置定位在表情节点的最大长度
          range.setStart(textNode, data.length)
          // 使光标开始和光标结束重叠
          range.collapse(true)
          // 清除选定对象的所有光标对象
          selection.removeAllRanges()
          // 插入新的光标对象
          selection.addRange(range)
        } else {
          //光标重合
          // 获取光标对象的范围界定对象，一般就是textNode对象
          let textNode = range.startContainer
          // 获取光标位置
          let rangeStartOffset = range.startOffset
          // 文本节点在光标位置处插入新的表情内容
          textNode.insertData(rangeStartOffset, data)
          // 光标移动到到原来的位置加上新内容的长度
          range.setStart(textNode, rangeStartOffset + data.length)
          // 光标开始和光标结束重叠
          range.collapse(true)
          // 清除选定对象的所有光标对象
          selection.removeAllRanges()
          // 插入新的光标对象
          selection.addRange(range)
        }
      } else {
        //选中一个区域
        // 获取光标对象的范围界定对象，一般就是textNode对象
        let textNode = range.startContainer
        // 获取光标位置
        let rangeStartOffset = range.startOffset
        //替换选中内容
        document.execCommand('insertText', 'false', data)
      }

      // // 无论如何都要记录最后光标对象
      this.lastEditRange = selection.getRangeAt(0)
      //隐藏表情
      this.show_emoji = false
    },
    /**
     * 发送
     */
    handleSubmit: function() {
      let that = this
      //存入对应临时聊天记录
      let temp_visitor = []
      let flag = false
      let one_message = {}
      let cur_time, timestamp, show_time

      that.visitor_list.forEach((element, index) => {
        if (
          element.id == that.currentChatVisitor.id &&
          element.visitor_status == 'online'
        ) {
          cur_time = new Date()
          timestamp = cur_time.getTime()
          show_time = false
          if (element.message.length == 0) {
            show_time = true
          } else {
            if (
              timestamp -
                element.message[element.message.length - 1].time.getTime() >
              6 * 1000
            ) {
              show_time = true
            }
          }
          //放入指定对象的聊天消息数组
          one_message = {
            type: 'text',
            content: that.$refs.editor.innerHTML.replace(
              /(\[\/em)([0-9]{2})(\])/g,
              '<img src="http://lyqq.cn-lianyi.com/public/static/images/emojis/$2.gif?' +
                Math.floor(Math.random() * 100 + 1) +
                '" />'
            ),
            time: new Date(),
            identity: 'service',
            show_time: show_time
          }
          that.visitor_list[index].message.push(one_message)

          temp_visitor = that.visitor_list[index]
          that.visitor_list.splice(index, 1)
          flag = true
        }
      })
      if (flag) {
        that.visitor_list.unshift(temp_visitor)
        //滚动到底部
        that.chatDialogScrollToBottom()
        //发送
        that.ws.send(
          JSON.stringify({
            identity: 'service',
            type: 'text',
            visitor_id: that.currentChatVisitor.id,
            content: that.$refs.editor.innerHTML,
            nickname: that.nickname,
            avatar: that.avatar
          })
        )
        //保存聊天记录
        serviceDesktopIndexAddServiceRecord({
          visitor_id: that.currentChatVisitor.id,
          identity: 'service',
          type: 'text',
          time: one_message.time.getTime(),
          record_content: that.$refs.editor.innerHTML
        }).then(() => {})

        //清空当前游客输入框草稿内容
        that.currentChatVisitor.temp_text = ''
        //清空编辑器内容
        that.$refs.editor.innerHTML = ''
      }
    },
    /**
     * 打开发送图片对话框
     */
    handleOpenImageUploadDialog: function() {
      let that = this
      ipcRenderer.send('open-directory-dialog', {
        properties: ['openFile', 'multiSelections'],
        filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }]
      })
      ipcRenderer.once('selectedItem', (event, arg) => {
        // 成功回调
        // console.log(arg.filePaths)
        arg.filePaths.forEach((element, index) => {
          fs.readFile(element, (err, data) => {
            if (err) {
              //上传失败
            } else {
              let file = new File([data], element.split('/').reverse()[0], {
                type: 'image/' + element.split('.').reverse()[0]
              })

              let formdata = new FormData()
              formdata.append('image', file)
              //上传图片
              that.handleUploadChatImage(formdata)
            }
          })
        })
      })
    },
    /**
     * 上传并发送聊天图片
     */
    handleUploadChatImage: function(formdata) {
      handleUploadChatImage(formdata).then(res => {
        //上传成功 存入聊天当前聊天对象
        let url = res.data

        let that = this
        //存入对应临时聊天记录
        let temp_visitor = []
        let flag = false
        let one_message = {}
        let cur_time, timestamp, show_time

        that.visitor_list.forEach((element, index) => {
          if (
            element.id == that.currentChatVisitor.id &&
            element.visitor_status == 'online'
          ) {
            cur_time = new Date()
            timestamp = cur_time.getTime()
            show_time = false
            if (element.message.length == 0) {
              show_time = true
            } else {
              if (
                timestamp -
                  element.message[element.message.length - 1].time.getTime() >
                6 * 1000
              ) {
                show_time = true
              }
            }
            //放入指定对象的聊天消息数组
            one_message = {
              type: 'image',
              content: url,
              time: new Date(),
              identity: 'service',
              show_time: show_time
            }
            that.visitor_list[index].message.push(one_message)

            temp_visitor = that.visitor_list[index]
            that.visitor_list.splice(index, 1)
            flag = true
          }
        })
        if (flag) {
          that.visitor_list.unshift(temp_visitor)
          //滚动到底部
          that.chatDialogScrollToBottom()
          //发送
          that.ws.send(
            JSON.stringify({
              identity: 'service',
              type: 'image',
              visitor_id: that.currentChatVisitor.id,
              content: url,
              nickname: that.nickname,
              avatar: that.avatar
            })
          )
          //保存聊天记录
          serviceDesktopIndexAddServiceRecord({
            visitor_id: that.currentChatVisitor.id,
            identity: 'service',
            type: 'image',
            time: one_message.time.getTime(),
            record_content: url
          }).then(() => {})
        }
      })
    },
    /**
     * 结束会话
     */
    handleClickCloseChat: function() {
      serviceDesktopIndexCloseChat({
        visitor_id: this.currentChatVisitor.id
      }).then(() => {})
    },
    /**
     * 转接会话
     */
    handleClickPatchChat: function() {
      serviceDesktopIndexGetOnlineServiceList().then(res => {
        if (res.data.length == 0) {
          //
          this.$message({
            message: '当前没有客服在线',
            type: 'error'
          })
        } else {
          this.online_service_list = res.data
          this.patchDialog = true
        }
      })
    },
    /**
     * 分配当前聊天对象给指定客服
     */
    handleClickPatchServiceConfirm: function() {
      serviceDesktopIndexPatchToVisitor({
        visitor_id: this.currentChatVisitor.id,
        patch_service_id: this.patch_service_id,
        visit_origin: this.currentChatVisitor.visit_origin
      }).then(res => {
        //从游客列表删除
        this.visitor_list.forEach((element, index) => {
          if (element.id == this.currentChatVisitor.id) {
            this.visitor_list.splice(index, 1)
          }
        })
        //清空当前聊天对象
        this.currentChatVisitor = {}
        //提示转接成功
        this.$message({
          message: '转接成功',
          type: 'success'
        })
        //关闭对话框
        this.patchDialog = false
      })
    },
    /**
     * 点击历史记录列表
     */
    handleClickshowHistoryDialog: function(index) {
      //设置当前历史对象
      this.currentHistoryVisitor = this.history_list[index]
      //滚动到底部
      // this.chatDialogScrollToBottom()
    },
    /**
     * 切换客服主页右侧常用工具栏
     */
    handleClickChangeUseTab: function(index) {
      this.used_tab_index = index
    }
  }
}
</script>
<style scoped lang="less">
.service_desktop_index {
  padding: 0;
  width: 100%;
  height: 100%;
  .block {
    margin-top: 20px;
  }
  display: flex;

  //固定开始
  .patch_dialog {
    .el-select {
      width: 100%;
    }
  }
  //固定结束

  .left {
    width: 300px;
    min-width: 300px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .visitor_tab {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fafafa;
      .item {
        flex: 1;
        padding: 10px 10px;
        text-align: center;
        font-size: 14px;
        color: @h3c;
        cursor: pointer;
        position: relative;
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          width: 100%;
          background: @h6c;
        }
      }
    }
    .visitor_list,
    .history_list {
      flex: 1;
      background: #fafafa;
      overflow-y: auto;
    }
    .visitor_list {
      .item {
        padding: 10px 20px;
        border-bottom: @border;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        &:active {
          background: @h6c;
        }
        .img_box {
          width: 50px;
          height: 50px;
          position: relative;
          .img {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 4px;
          }
          .message_count {
            position: absolute;
            right: -10px;
            top: -10px;
            padding: 2px;
            min-width: 14px;
            min-height: 14px;
            font-size: 14px;
            text-align: center;
            border-radius: 50%;
            color: #ffffff;
            background: @red;
          }
        }
        .nickname {
          margin-left: 10px;
          font-size: 18px;
          color: @h1c;
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .temp_text {
            color: @red;
            font-size: 14px;
          }
          .visit_origin_text {
            font-size: 12px;
            color: @h3c;
          }
        }
      }
      .active_item {
        background: #ececec;
      }
      .offline_item {
        filter: grayscale(100%);
      }
    }
    .history_list {
      .item {
        padding: 10px 20px;
        border-bottom: @border;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        &:active {
          background: @h6c;
        }
        .img_box {
          width: 50px;
          height: 50px;
          position: relative;
          .img {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 4px;
          }
        }
        .nickname {
          margin-left: 10px;
          font-size: 18px;
          color: @h1c;
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      }
      .active_item {
        background: #ececec;
      }
    }
  }
  .middle {
    flex: 1;
    min-width: 500px;
    height: 100%;
    border-left: @border;
    border-right: @border;
    .chat_dialog {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      .chat_header {
        width: calc(100% - 40px);
        padding: 5px 20px;
        display: flex;
        justify-content: space-between;
        background: #304156;
        .chat_header_left {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          .img_box {
            margin-right: 10px;
            width: 50px;
            height: 50px;
            .img {
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }
          }
          .nickname {
            color: #ffffff;
            font-size: 18px;
          }
        }
        .chat_header_right {
          display: flex;
          align-items: center;
          color: #ffffff;
          cursor: pointer;
          .patch_box {
            display: flex;
            align-items: center;
            margin-right: 20px;
            height: 100%;
            padding: 0 20px;
          }
          .close_box {
            display: flex;
            align-items: center;
            height: 100%;
            .icon {
              font-size: 12px;
            }
            .close_btn {
              margin-left: 2px;
            }
          }
        }
      }
      .scroll_chat {
        flex: 1;
        overflow-x: hidden;
        overflow-y: auto;
        width: 100%;
        .scroll_chat_row {
          padding: 20px;
          .time_row {
            display: flex;
            justify-content: center;
            margin-bottom: 10px;
            .time_row_text {
              display: inline-block;
              background: @h6c;
              padding: 6px;
              border-radius: 2px;
              text-align: center;
            }
          }
          .scroll_chat_left,
          .scroll_chat_right {
            display: flex;
            .img_box {
              width: 50px;
              height: 50px;
              .img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                object-fit: cover;
              }
            }
            .content {
              background: @h6c;
              padding: 20px 20px;
              border-radius: 4px;
              position: relative;
              max-width: 30%;
              word-wrap: break-word; // 只对英文起作用，以单词作为换行依据
              &::after {
                content: '';
                position: absolute;
                top: 20px;
                margin: auto;
                left: -13px;
                width: 0;
                height: 0;
              }
            }
            .chat_img {
              max-width: 30%;
              height: auto;
              display: block;
            }
          }
          .scroll_chat_left {
            justify-content: flex-start;
            .content {
              margin-left: 20px;
              /deep/ img {
                width: 30px;
                height: auto;
                display: inline-block;
                margin: 0 2px;
              }
              &::after {
                border-top: 8px solid transparent;
                border-bottom: 8px solid transparent;
                border-right: 13px solid @h6c;
              }
            }
            .chat_img {
              margin-left: 20px;
            }
          }
          .scroll_chat_right {
            justify-content: flex-end;
            .content {
              margin-right: 20px;
              /deep/ img {
                width: 30px;
                height: auto;
                display: inline-block;
                margin: 0 2px;
              }
              &::after {
                left: unset;
                right: -13px;
                border-top: 8px solid transparent;
                border-bottom: 8px solid transparent;
                border-left: 13px solid @h6c;
              }
            }
            .chat_img {
              margin-right: 20px;
            }
          }
        }
      }
      .send_box {
        width: 100%;
        .tool_bar {
          background: #fafafa;
          border-top: @border;
          border-bottom: @border;
          padding: 10px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          position: relative;
          .icon {
            padding: 10px;
            cursor: pointer;
            font-size: 18px;
          }
          .emoji_list {
            position: absolute;
            border: @border;
            bottom: 40px;
            left: 30px;
            width: 300px;
            padding: 10px;
            background: #ffffff;
            border-radius: 4px;
            display: flex;
            flex-wrap: wrap;
            .emoji_item {
              width: calc((100% - 20px * 5) / 5);
              padding: 10px;
              .img {
                width: 100%;
                height: auto;
                cursor: pointer;
              }
            }
          }
        }
        .send_textarea {
          padding: 10px 10px 0 10px;
          .textarea {
            width: 100%;
            height: 150px;
            height: 150px;
            overflow-y: auto;
          }
        }
        .send_btn_box {
          display: flex;
          padding: 20px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .tips {
            color: @h3c;
          }
          .send_btn {
            margin-left: 20px;
          }
        }
      }
    }

    .history_dialog {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      .history_header {
        width: calc(100% - 40px);
        padding: 5px 20px;
        display: flex;
        justify-content: space-between;
        background: #304156;
        .history_header_left {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          .img_box {
            margin-right: 10px;
            width: 50px;
            height: 50px;
            .img {
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }
          }
          .nickname {
            color: #ffffff;
            font-size: 18px;
          }
        }
      }
      .scroll_history {
        flex: 1;
        overflow-x: hidden;
        overflow-y: auto;
        width: 100%;
        .scroll_history_row {
          padding: 20px;
          .time_row {
            display: flex;
            justify-content: center;
            margin-bottom: 10px;
            .time_row_text {
              display: inline-block;
              background: @h6c;
              padding: 6px;
              border-radius: 2px;
              text-align: center;
            }
          }
          .scroll_history_left,
          .scroll_history_right {
            display: flex;
            .img_box {
              width: 50px;
              height: 50px;
              .img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                object-fit: cover;
              }
            }
            .content {
              background: @h6c;
              padding: 20px 20px;
              border-radius: 4px;
              position: relative;
              max-width: 30%;
              word-wrap: break-word; // 只对英文起作用，以单词作为换行依据
              &::after {
                content: '';
                position: absolute;
                top: 20px;
                margin: auto;
                left: -13px;
                width: 0;
                height: 0;
              }
            }
            .chat_img {
              max-width: 30%;
              height: auto;
              display: block;
            }
          }
          .scroll_history_left {
            justify-content: flex-start;
            .content {
              margin-left: 20px;
              /deep/ img {
                width: 30px;
                height: auto;
                display: inline-block;
                margin: 0 2px;
              }
              &::after {
                border-top: 8px solid transparent;
                border-bottom: 8px solid transparent;
                border-right: 13px solid @h6c;
              }
            }
            .chat_img {
              margin-left: 20px;
            }
          }
          .scroll_history_right {
            justify-content: flex-end;
            .content {
              margin-right: 20px;
              /deep/ img {
                width: 30px;
                height: auto;
                display: inline-block;
                margin: 0 2px;
              }
              &::after {
                left: unset;
                right: -13px;
                border-top: 8px solid transparent;
                border-bottom: 8px solid transparent;
                border-left: 13px solid @h6c;
              }
            }
            .chat_img {
              margin-right: 20px;
            }
          }
        }
      }
    }
  }
  .right {
    min-width: 500px;
    height: 100%;
    .used_tab {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fafafa;
      .item {
        flex: 1;
        font-size: 16px;
        font-weight: bold;
        color: @h1c;
        padding: 10px;
        text-align: center;
        cursor: pointer;
      }
      .active {
        color: #ffffff;
      }
    }
  }
}
</style>
