//index.js
import Vue from 'vue'
import vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(vuex);
import LoginStore from './login';
import NavStore from './nav';

export default new vuex.Store({
    modules: {
        Login: LoginStore,
        Nav: NavStore,
     

    },
    plugins: [createPersistedState()]
})