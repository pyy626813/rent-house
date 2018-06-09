//时间
import Moment from 'moment';

import nasTool from './nas';

//jq
import './deferred'
import '@/assets/iconfont/iconfont.css';
import '@/assets/css/common.css';

import  {AlertPlugin, LoadingPlugin, ToastPlugin, ConfirmPlugin, DatetimePlugin} from 'vux';

const install = function (Vue, config = {}) {
  if (install.installed) return;

  Vue.use(AlertPlugin);
  Vue.use(LoadingPlugin);
  Vue.use(ToastPlugin);
  Vue.use(ConfirmPlugin);
  Vue.use(DatetimePlugin);


  nasTool.init();
  Vue.prototype.$nasTool = nasTool;


  global.moment = Moment;
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {install}
