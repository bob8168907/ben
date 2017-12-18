<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="8">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="姓名:" prop="username">
              <el-input v-model="form.username" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
<!--             <el-form-item label="生日:">
              <el-date-picker
                v-model="form.birthday"
                type="date"
                format="yyyy-MM-dd"
                :editable="false"
                @change="on_change_birthday"
                placeholder="选择生日"
                style="width: 250px;">
              </el-date-picker>
            </el-form-item> -->
            <el-form-item label="电话:" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
             <el-form-item label="生日:" prop="birthday">
              <el-input v-model="form.birthday" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
              <el-form-item label="工作地址:" prop="address">
              <el-input v-model="form.address" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
              <el-form-item label="QQ:" prop="qq">
              <el-input v-model="form.qq" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
              <el-form-item label="密码:" prop="password">
              <el-input v-model="form.password" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="on_submit_form" :loading="on_submit_loading">立即提交</el-button>
              <el-button @click="$router.back()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle} from 'components'

  export default{
    data(){
      return {
        form: {
          username: '',
          phone: '',
          address: '',
          qq: '',
          password: ''
        },
        route_id: this.$route.params.id,
        load_data: false,
        on_submit_loading: false,
        rules: {
          username: [{required: true, message: '姓名不能为空', trigger: 'blur'}]
        }
      }
    },
    created(){
      this.route_id && this.get_form_data()
    },
    methods: {
        //获取数据
        get_form_data() {
          var qs = require('qs')
          this.$http.post(`http://localhost:8088/user/list`,
            qs.stringify({
              "id": this.route_id
            })).then((res) => {
            this.form = res.data[0];
            this.load_data = false
         })
      },
      //时间选择改变时
      on_change_birthday(val){
        this.$set(this.form, 'birthday', val)
      },
      //提交
      on_submit_form(){
        this.$refs.form.validate((valid) => {
          if (!valid) return false
          this.on_submit_loading = true
          var qs = require('qs')
          var form =qs.stringify(this.form)
          this.$http.post(`http://localhost:8088/user/update?${form}`,
            qs.stringify({
              "id": this.route_id
            })).then((res) => {
            this.form = res.data[0];
            this.$message.success("修改成功")
            setTimeout(this.$router.back(), 500)
           })
        })
      }
    },
    components: {
      panelTitle
    }
  }
</script>
