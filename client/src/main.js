import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import { Uploader,Field,CellGroup,Button,List,Cell,Toast } from 'vant';

//在APP组件引入vant的组件库
Vue.use(Uploader);
Vue.use(Field);
Vue.use(CellGroup);
Vue.use(Button);
Vue.use(List);
Vue.use(Cell);
Vue.use(Toast);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
