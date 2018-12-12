import Vue from 'vue';
export default {
  install(Vue, options) {
    Vue.prototype.URL = this;
  },

  //	登录/退出相关接口
  Login: {
    /*getVerificationCode: '/ccsp/login/getVerificationCode',	//	获取验证码*/
    LoginCheck: '/LoginCheck.aspx',	//	登录接口
    /*	signOut: '/ccsp/login/signOut'	//	安全退出*/
  },

  /*===管理功能相关接口 - 开始===*/
  ManageList: {
    //	渠道收益
    ChannelProfit: {
      GetReportData:'/GetReportData.aspx',
      SaveData:'/savedata.aspx',
      ExportData:'/ExportData.aspx'
    }
  }
  /*===管理功能相关接口 - 结束===*/

}
