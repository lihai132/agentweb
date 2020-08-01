import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import {
    messages
} from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});




//引入发送网络请求的axios
import axios from 'axios';
//把axios放在Vue的原型对象上面
Vue.prototype.$axios = axios;

import store from './store/index' ;






new Vue({
    router,
    i18n,
    store,//这个store是刚才创建的index文件引入的
    render: h => h(App)
}).$mount('#app');