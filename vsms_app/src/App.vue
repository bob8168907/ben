<template>
    <div id="app" class="blue">
        <header class="">
             <h1>祺霖可视化 <a class="t-btn" @click="showTools"><span></span></a></h1>
        </header>
        <router-view/>
     <section class="container" @click="showTools">

      <div class="event-tools" :class="{'show-event-tools':isShow}">
        <ul class="tools-sidebar">
          <li>
            <button class="tools-btn">个人信息</button>
          </li>
          <li>
            <router-link to="/customer/list"><button class="tools-btn">客户</button></router-link>
          </li>
          <li>
            <button class="tools-btn">客户审核</button>
          </li>
          <li>
            <button class="tools-btn">产品</button>
          </li>
          <li>
            <button class="tools-btn">员工管理</button>
          </li>
          <li>
            <button class="tools-btn">销售任务</button>
          </li>
          <li>
            <button class="tools-btn">财务数据</button>
          </li>
          <li>
            <button class="tools-btn">用户指南</button>
          </li>
          <li>
            <button class="tools-btn">视图分析</button>
          </li>
        </ul>
      </div>
    </section>
    <footer class="footer">
        © 2017 <a href="http://www.ql-crm.com:8080/" target="_blank">祺霖可视化</a> 
    </footer>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                isShow: false
            }
        },
        methods: {
            showTools(){
                 this.isShow = this.isShow == false?true:false;
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" src="../static/theme.scss"></style>
<style lang="scss" rel="stylesheet/scss">
 html, body, ul, li, input, p {
  margin: 0;
  padding: 0;
}

body {
  font-size: 16px;
  font-family: "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
}

input, button {
  -webkit-tap-highlight-color: transparent;
}

input[type=text] {
  -webkit-appearance: none;
}

button {
  padding: 7px 0;
  outline: none;
  text-align: center;
  border-radius: 4px;
  box-sizing: border-box;
  font: {
    size: inherit;
    family: inherit;
  }
  cursor: pointer;
}

html, body {
  height: 100%;
}

::-webkit-scrollbar {
  width: 0;
}

body, #app {
  width: 100%;
  overflow-x: hidden;
}

#app {
  height: 100%;
  padding-bottom: 60px;
  box-sizing: border-box;
}

ul {
  list-style: none;
}

.container {
  width: 100%;
  padding: 0 10px;
  max-width: 800px;
  margin: auto;
  box-sizing: border-box;
  &.hide {
    display: none;
  }
}

.dialog-enter-active, .dialog-leave-active {
  transition: opacity .3s;
}

.dialog-enter, .dialog-leave-to {
  opacity: 0;
}

header {
  position: relative;
  width: 100%;
  height: 70px;
  z-index: 100;
  h1 {
    position: relative;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    line-height: 70px;
    text-align: center;
    color: #fff;
    a.t-btn {
      position: absolute;
      right: 10px;
      top: 22px;
      width: 30px;
      height: 26px;
      cursor: pointer;
    }
    span, span:before, span:after {
      position: absolute;
      left: 0;
      width: 30px;
      height: 4px;
      content: '';
      background: #fff;
    }
    span {
      top: 11px;
      &:before {
        top: 0;
        transform: translateY(-7px);
        transition: all .3s;
      }
      &:after {
        transform: translateY(7px);
        transition: all .3s;
      }
    }
  }
}

.event-tools {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  padding: 100px 20px 30px;
  box-sizing: border-box;
  transform: translateX(-250px);
  transition: transform .3s;
  text-align: center;
  background: rgba(0, 0, 0, .5);
  font-size: 16px;
  z-index: 9;
  &.show-event-tools {
    transform: translateX(0);
  }
  .tools-sidebar {
    & > li {
      line-height: 60px;
    }
  }
  .tools-btn {
    width: 100px;
    height: 40px;
    line-height: 26px;
    color: #fff;
    transition: background .3s ease-in;
  }
  pre {
    white-space: pre-wrap;
    font: {
      size: 14px;
      family: arial, "microsoft yahei";
    }
    line-height: 20px;
  }
}
.footer{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #f8f8f8;
  text-align: center;
  font-size: 14px;
  color: #666;
  border-top: 1px solid #ddd;
}
.footer a{
  color: #666;
}

</style>