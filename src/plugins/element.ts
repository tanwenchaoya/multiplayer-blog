import Vue from 'vue'
import {
    Button, Form, FormItem, Input, Message,
    Row, Col, MessageBox, Tabs, TabPane, Upload, Tooltip, Popconfirm
} from 'element-ui'
Vue.use(Upload)
Vue.use(Tooltip)
Vue.use(Button)
// Vue.use(Switch)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)

Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Popconfirm)
Vue.prototype.$confirm = MessageBox
Vue.prototype.$message = Message
