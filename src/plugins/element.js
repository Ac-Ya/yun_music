// element-ui按需加入
import Vue from 'vue'

import {
    Container,
    Header,
    Footer,
    Aside,
    Main,
    Switch,
    Menu,
    MenuItem,
    MenuItemGroup,
    Submenu,
    Carousel,
    CarouselItem,
    Pagination,
    Tabs,
    TabPane,
    Table,
    TableColumn,
    Slider,
    Input,
    Popover,
    Button,
    Form,
    FormItem,
    Message,
    Drawer,
    InfiniteScroll,
    Dialog,
    Link,
    Tooltip,
    Loading,
    Card,
    MessageBox,
} from 'element-ui'
Vue.use(Table)
Vue.use(Card)
Vue.use(Container)
Vue.use(Footer)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Switch)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(TableColumn)
Vue.use(Slider)
Vue.use(Input)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Drawer)
Vue.use(InfiniteScroll)
Vue.use(Dialog)
Vue.use(Link)
Vue.use(Tooltip)
Vue.use(Loading)


Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox

