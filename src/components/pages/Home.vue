<template>
	<div class="container all">
		<el-container class='all'>
  			<el-header>
  				<div class="title">移动数据统计查询系统</div>
  				<div class="user">
  					<span>渠道：{{ChannelName }} </span>
  					<span>账号：{{UserName }} </span>
  					<!--<router-link to="/Login" @click.native="HandleSafeExit">安全退出</router-link>-->
  				</div>
  			</el-header>
  			<el-container class='all'>
    			<el-aside width="200px">
    				<el-menu :default-active="onRoutes" router background-color="#1f293a" text-color="#fff" active-text-color="#587ED1">
			            <template v-for="item in listItems">
			                <template v-if="item.subs">
			                    <el-submenu :index="item.index">
			                        <template slot="title">{{ item.title }}</template>
			                        <el-menu-item v-for="(subItem, i) in item.subs" :key="i" :index="subItem.index" >{{ subItem.title }}</el-menu-item>
			                    </el-submenu>
			                </template>
			                <template v-else>
			                    <el-menu-item :index="item.index">{{ item.title }}</el-menu-item>
			                </template>
			            </template>
			        </el-menu>
    			</el-aside>
    			<el-main>
      				<router-view></router-view>
    			</el-main>
  			</el-container>
		</el-container>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				listItems: this.Sliders.lists,
				UserName: ''
			}
		},

		created () {
      if (window.sessionStorage.getItem('LoginObj')) {
        this.UserName = JSON.parse(window.sessionStorage.getItem('LoginObj'))['UserName'];
				this.ChannelName = JSON.parse(window.sessionStorage.getItem('LoginObj'))['ChannelName']||"移动MM";
			} else {
				this.UserName = 'gzjunbo';
			}
		},

		computed: {
            onRoutes () {
                return '/' + this.$route.path.split('/')[1];
            }
        },

        methods: {
        	HandleSafeExit () {
        		const self = this;
                let url = self.URL.Login.signOut;
                self.API.PostEntity(url, {})
                .then((res) => {
                    if (res.code === '0'){
                        self.$router.push('/Login');
                    }else {
                        self.$message.error(res.msg);
                    }
                })
        	}
        }
	}
</script>

<style scoped>
	.container {
		color: #fff;
	}
	.all {
		width: 100%;
		height: 100%;
	}
	.title {
		font-size: 30px;
	}
	.user {
		font-size: 14px;
    margin-right:70px;
	}
	.user a {
		color: #587ed1;
		margin-left: 20px;
	}
	.btn {
		margin-left: 16px;
	}
</style>
