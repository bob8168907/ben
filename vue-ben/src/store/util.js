export default{
  install(Vue,options)
  {
    Vue.prototype.getData = function () {
      console.log('我是插件中的方法');
    }
    Vue.prototype.url = "http://www.bencoco.top:8088"
  }
}