import Vue from 'vue';
export default {
	install (Vue, options) {
    	Vue.prototype.Sliders = this;
	},

	lists: [
		{
            index: '/ChannelProfit',
            title: '管理功能',
            subs: [
            	{
            		index: '/ChannelProfit',
            		title: '渠道收益'
            	}/*,
              {
                index: '/UserManagement',
                title: '用户管理'
              }*/
            ]
        },

	]
}
