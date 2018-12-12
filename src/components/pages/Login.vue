<template>
  <div class="login">
    <div class="login-box">
      <h2 class="login-title">移动数据统计查询系统</h2>
      <div class="login-form flex-center">
        <el-form :model="loginForm" ref="loginForm" label-width="70px" class='loginForm'>
          <el-form-item label="用户名：">
            <el-input size="medium" v-model="loginForm.UserName" class='w280'></el-input>
          </el-form-item>
          <el-form-item label="密 码：">
            <el-input size="medium" type='password' v-model="loginForm.Password" class='w280' @keyup.enter.native="handleLogin"></el-input>
          </el-form-item>
          <el-form-item class='flex-center mR20'>
            <el-button type="primary" size="medium" @click='handleLogin'>登录</el-button>
            <el-button type="primary" @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loginForm: {
          UserName: '',
          Password: '',
          IsRemembered: false //是否记住密码，当前固定为false
        }
      }
    },
    methods: {
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      /*===登录处理===*/
      handleLogin() {
        if (this.loginForm.userName === '' || this.loginForm.passWord === '' ) {
          this.$message.error('必填信息不能为空');
          return;
        } else {
          let url = this.URL.Login.LoginCheck;
          let params = {...this.loginForm};
          this.API.axiosPost(url,params).then(res=>{
            let obj = {
              Uid: res.UId,
              UserName: res.UserName,
              ChannelName:res.ChannelName,
              ChannelId:res.ChannelId
            };
            window.sessionStorage.setItem('LoginObj', JSON.stringify(obj));
            $(document).off("keyup");
            this.$router.push('/ChannelProfit');
          });
        }
      }
    },
    mounted(){
      var that=this;
      $(document).on("keyup", function(event) {//监听enter事件促发登录事件
        if (event.keyCode==13){
          event.preventDefault();
          that.handleLogin();
        }
     })
    }
  }
</script>

<style scoped>
  .login {
    width: 100%;
    height: 100%;
    background: #324057;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-form {
    padding: 32px 0;
  }

  .login-box {
    /*color: #000000;*/
    width: 350px;
    min-height: 300px;
    background-color: #ffffff;
    border-radius: 4px;
  }

  .login-title {
    padding: 20px 0;
    text-align: center;
    color: #414448;
    font-size: 20px;
    border-bottom: 1px solid #e1e1e1;
  }

  .pic {
    float: right;
    margin-top: 8px;
    margin-left: 10px;
    cursor: pointer;
  }

  .flex-center {
    display: flex;
    justify-content: center;
  }

  .w280 {
    width: 200px;
  }

  .w120 {
    width: 120px;
  }
</style>
