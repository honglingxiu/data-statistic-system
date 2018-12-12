<!-- 列表页 -->
<template>
  <div class="vipCard">
    <div class="pageTitleWrap">
      <page-address></page-address>
      <!--<div>
        <router-link to="/ChannelProfit/ChannelProfitDialog" class='halfCircular'>
          <i class="el-icon-plus mR10"></i>添加付费信息
        </router-link>
      </div>-->
    </div>
    <div class="pageContentWrap">
      <div class="pageContent-search">
        <el-form :model="params" ref="params" :inline="true">
          <!--<el-form-item label="渠道：" class='mB0'>
            <el-select size="medium" v-model="params.ChannelId" class='w350'>
              <el-option v-for="item in rechargOptions" :key="item.rechangeType" :label="item.rechangeTypeName" :value="item.rechangeType"></el-option>
            </el-select>
          </el-form-item>-->
          <!--<el-form-item label="产品：" class='mB0'>
            <el-select size="medium" v-model="params.ProductId" class='w150'>
              <el-option v-for="item in isUsedOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item label="创建时间：">
            <el-date-picker size="medium" v-model="dateRange" type="daterange" range-separator="至"
                            start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"
                            @change='HandleDateChange'></el-date-picker>
          </el-form-item>
          <el-form-item class='mB0'>
            <el-button type="primary" size="medium" @click='HandleSearch'>查询</el-button>
            <el-button type="primary" size="medium" @click='exportChannelProfitReport'>导出</el-button>
          </el-form-item>
          <el-form-item class='mB0 f-r'>
            <el-button type="success" size="medium" @click='setChannelProfit()'>添加付费信息</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="mT20">
        <i-table ref="itable" :index="index" :list="tableLists" :columns="columns" :operates="operates"
                 :total="totalCount" @handlePageChange="handlePageChange"></i-table>
      </div>
      <!--添加/编辑付费信息-->
      <el-dialog :title="title" :visible.sync="dialogFormVisible" center width="550px">
        <div>
          <el-form :model="formData" ref="formData" :rules="rules" label-width="150px" style="width:500px">
            <el-form-item label="渠道ID：" prop="ChannelId">
              <el-input v-model="formData.ChannelId" placeholder="请输入业务名称" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="渠道名称：" prop="ChannelName">
              <el-input v-model="formData.ChannelName" placeholder="请输入渠道名称" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="显示渠道ID：" prop="DisplayChannelId">
              <el-input v-model="formData.DisplayChannelId" placeholder="请输入渠道名称" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="产品名称：" prop="ProductName">
              <el-input v-model="formData.ProductName" placeholder="请输入产品名称" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="产品ID：" prop="ProductId">
              <el-input v-model="formData.ProductId" placeholder="请输入产品名称" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="分成模式：" prop="ProfitModel">
              <!--<el-input v-model="formData.ProfitModel" placeholder="请输入分成模式" :disabled="true"></el-input>-->
              <el-select v-model="formData.ProfitModel" placeholder="请选择分成模式" :disabled="true">
                <el-option
                  v-for="item in ProfitModelOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="拉新模式：" prop="NewUserMode">
              <el-select v-model="formData.NewUserMode" placeholder="请选择拉新模式" :disabled="true">
              <el-option
                v-for="item in NewUserModeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
              </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="激活人数：" prop="ActivateUser">
              <el-input v-model="formData.ActivateUser" placeholder="请输入激活人数"></el-input>
            </el-form-item>
            <el-form-item label="实名认证激活数：" prop="VerifiedUser">
              <el-input v-model="formData.VerifiedUser" placeholder="请输入激活人数"></el-input>
            </el-form-item>
            <el-form-item label="渠道收入（元）：" prop="RealIncome">
              <el-input v-model="formData.RealIncome" placeholder="请输入渠道收入（元）"></el-input>
            </el-form-item>
            <el-form-item label="次日留存：" >
              <el-input v-model="formData.RetentionNext" placeholder="请输入次日留存"></el-input>
            </el-form-item>
            <el-form-item label="七日留存">
              <el-input v-model="formData.RetentionSeven" placeholder="请输入七日留存"></el-input>
            </el-form-item>
            <el-form-item label="DAU：" >
              <el-input v-model="formData.DAU" placeholder="请输入DAU"></el-input>
            </el-form-item>
            <el-form-item label="报表日期：" prop="ReportTime">
              <!--<el-input v-model="formData.ReportTime" placeholder="报表日期"></el-input>-->
              <el-date-picker
                v-model="formData.ReportTime"
                type="date"
                :picker-options="pickerOptions"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-form>

        </div>
        <div slot="footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="modifyChannelProfit" :loading="loading">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: "添加付费信息",
        dialogFormVisible: false,
        pickerOptions:{
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        loading:false,
        rules:{
          ChannelId: [
            { required: true, message: '请输入渠道号', trigger: 'blur' }
          ],
          ChannelName: [
            { required: true, message: '请输入渠道名称', trigger: 'blur' }
          ],
          ProductName: [
            {required: true, message: '请输入产品名称', trigger: 'blur' }
          ],
          ProductId: [
            { required: true, message: '请输入产品ID', trigger: 'blur' }
          ],
          DisplayChannelId: [
            { required: true, message: '请输入显示渠道ID', trigger: 'blur' }
          ],
          ProfitModel: [
            { required: true, message: '请输入分成模式', trigger: 'blur' }
          ],
          NewUserMode: [
            { required: true, message: '请输入拉新模式', trigger: 'blur' }
          ],
          ActivateUser: [
            { required: true, message: '请输入激活人数', trigger: 'blur' }
          ],
          VerifiedUser: [
            { required: true, message: '请输入实名认证激活数', trigger: 'blur' }
          ],
          RealIncome: [
            { required: true, message: '请输入渠道收入', trigger: 'blur' }
          ],
          /*RetentionNext: [
            { required: true, message: '请输入次日留存', trigger: 'blur' }
          ],
          RetentionSeven: [
            { required: true, message: '请输入七日留存', trigger: 'blur' }
          ],
          DAU: [
            { required: true, message: '请输入DAU', trigger: 'blur' }
          ],*/
          ReportTime: [
            { required: true, message: '请选择日期', trigger: 'blur' }
          ]
        },
        NewUserModeOptions:[
          {
            value:1,
            label:"apk"
          },
          {
            value:2,
            label:"link"
          }
        ],
        ProfitModelOptions:[
          {
            value:0,
            label:"CPA"
          },
          {
            value:1,
            label:"CPS"
          },
          {
            value:2,
            label:"--"
          }
        ],
        formData: {
          ChannelId: "2018111911393356902501",//暂时写死
          ChannelName: "移动MM",//暂时写死
          ProductName: "支付宝",//暂时写死
          ProductId: "1",//暂时写死
          DisplayChannelId: "jb30",//暂时写死
          ProfitModel: 0,//暂时写死
          NewUserMode: 1,//暂时写死
          ActivateUser: "",//当日有效拉新用户数量
          VerifiedUser: "",//当日有效实名认证拉新用户数量
          RealIncome: 0,
          RetentionNext: "",
          RetentionSeven: "",
          DAU: "",
          ReportTime: "",
        },
        params: {
          ChannelId: '2018111911393356902501',//先写死，后续优化
          ProductId: '1',//先写死，后续优化
          /* StartTime: this.API.getBeforeDate(30) + ' 00:00:00',
           EndTime: this.API.getBeforeDate(0) + ' 23:59:59',*/
          StartDate: this.API.getBeforeDate(30),
          EndDate: this.API.getBeforeDate(0),
          StartRow: 1,
          PageRow: 10
        },
        dateRange: [this.API.getBeforeDate(30), this.API.getBeforeDate(0)],
        tableLists: [],
        totalCount: 0,
        index: {show: true},
        columns: [
          {
            prop: 'ReportTime',
            label: '报表日期',
            minwidth: 100
          },
          {
            prop: 'ChannelId',
            label: '渠道ID',
            minwidth: 170
          },
          {
            prop: 'ChannelName',
            label: '渠道名称'
          },
          {
            prop: 'DisplayChannelId',
            label: '显示渠道ID',
            minwidth: 130
          },
          {
            prop: 'ProductId',
            label: '产品ID'
          },
          {
            prop: 'ProductName',
            label: '产品名称'
          },
          {
            prop: 'ProfitModel',
            label: '分成模式',
            formatter: (row) => {
              switch (row.ProfitModel) {
                case 0:
                  return 'CPA';
                  break;
                case 1:
                  return 'CPS';
                  break;
                default:
                  return '--';
              }
            }
          },
          {
            prop: 'NewUserMode',
            label: '拉新模式',
            formatter: (row) => {
              switch (row.NewUserMode) {
                case 1:
                  return 'apk';
                  break;
                case 2:
                  return 'link';
                  break;
                default:
                  return 'apk';
              }
            }
          },
          {
            prop: 'ActivateUser',
            label: '激活人数',
            minwidth: 60
          },
          {
            prop: 'VerifiedUser',
            label: '实名认证激活数',
            minwidth: 80
          },
          {
            prop: 'RealIncome',
            label: '渠道收入',
            minwidth: 50
          },
          {
            prop: 'RetentionNext',
            label: '次日留存',
            minwidth: 50
          },
          {
            prop: 'RetentionSeven',
            label: '七日留存',
            minwidth: 93
          },
          {
            prop: 'DAU',
            label: 'DAU',
            minwidth: 93
          },
          {
            prop: 'Enable',
            label: '状态',
            minwidth: 48,
            formatter: (row) => {
              switch (row.Enable) {
                case 0:
                  return '禁用';
                  break;
                case 1:
                  return '启用';
                  break;
                default:
                  return '禁用';
              }
            }
          }
        ],
        operates: {
          minwidth: 100,
          list: [
            {
              label: '编辑',
              callback: (row) => {
                this.setChannelProfit(row);
              }
            }
          ]
        }
      }
    },
    mounted() {
      //	获取表格数据
      this.getChanelProfitList();
    },

    activated() {
      this.getChanelProfitList();
    },

    methods: {
      /*===获取日期===*/
      HandleDateChange(dateArr) {
        if (!dateArr) {
          this.params.StartDate = '1970-01-01';
          this.params.EndDate = '';
        } else {
          this.params.StartDate = dateArr[0];
          this.params.EndDate = dateArr[1];
        }
      },

      /*===查询===*/
      HandleSearch() {
        this.params.StartRow = 1;
        this.$refs.itable.tableCurrentPagination.Pcurrent = 1;
        this.params.PageRow = 10;
        this.getChanelProfitList();
      },

      /*===获取表格数据===*/
      getChanelProfitList() {
        let url = this.URL.ManageList.ChannelProfit.GetReportData;
        this.API.axiosPost(url, this.params)
          .then((res) => {
            this.totalCount = res.TotalCount;
            this.tableLists = res.Records;
          });
      },

      /*===页码/页面条数改变时===*/
      handlePageChange(pagination) {
        this.params.StartRow = (pagination.Pcurrent - 1) * pagination.Psizes + 1;
        this.params.PageRow = pagination.Psizes;
        this.getChanelProfitList();
      },
      exportChannelProfitReport() {//导出报表
        let url = this.URL.ManageList.ChannelProfit.ExportData;
        var params = {
          StartDate: this.params.StartDate,
          EndDate: this.params.EndDate
        };
        this.API.axiosPost(url, params)
          .then((res) => {
            window.location.href = res.Url;
          });
      },
      setChannelProfit(row) {//设置付费信息对话框
        if (this.$refs.formData) {
          this.$refs.formData.clearValidate();//清空之前的验证结果
        }
        if (row) {
          this.title = "编辑付费信息";
          this.formData = JSON.parse(JSON.stringify(row));//不影响源对象
        } else {
          this.title = "添加付费信息";
          //重置表单
          this.formData = {
            ChannelId: "2018111911393356902501",//暂时写死
            ChannelName: "移动MM",//暂时写死
            ProductName: "支付宝",//暂时写死
            ProductId: "1",//暂时写死
            DisplayChannelId: "jb30",//暂时写死
            ProfitModel: 0,//暂时写死
            NewUserMode: 1,//暂时写死
            ActivateUser: "",//当日有效拉新用户数量
            VerifiedUser: "",//当日有效实名认证拉新用户数量
            RealIncome: 0,
            RetentionNext: "",
            RetentionSeven: "",
            DAU: "",
            ReportTime: "",
          };
        }
        this.dialogFormVisible = true;
      },
      modifyChannelProfit() {//添加或编辑付费信息
        this.$refs.formData.validate(valid => {
          if (valid) {
            this.loading=true;
            let url = this.URL.ManageList.ChannelProfit.SaveData;
            this.API.axiosPost(url, this.formData, "all")
              .then((res) => {
                this.loading=false;
                this.$message({
                  type:"success",
                  message:this.title+"成功"
                });
                this.getChanelProfitList();
                this.dialogFormVisible = false;
              });
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .w150 {
    width: 150px;
  }
</style>
