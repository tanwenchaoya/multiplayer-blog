import Vue from 'vue'
import { Button, Form, FormItem, Input, Message, Container, Header,
    Aside, Main, Menu, Submenu, MenuItemGroup, MenuItem , Breadcrumb,BreadcrumbItem,
    Card,Row,Col,Table,TableColumn,Pagination,Dialog,Radio,MessageBox,Tag,Tree,Dropdown,DropdownItem,DropdownMenu,
    Select,Option,Switch,Tabs,TabPane,Upload,Tooltip
} from 'element-ui'
Vue.use(Upload)
Vue.use(Tooltip)
Vue.use(Button)
Vue.use(Switch)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Radio)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Dropdown)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.prototype.$confirm = MessageBox
Vue.prototype.$message = Message
