<template>
    <section class="event-all" :class="{'event-all-show':true}">
        <div class="table-box">
            <div class="screen-box">
                <div class="div-select" :class="{'active': active}">
                    <div class="div-value" @click="active = !active">{{getTypeName}}</div>
                    <div class="div-select-body">
                        <div class="div-option" @click="doSelect(1)">客户名称</div>
                        <div class="div-option" @click="doSelect(2)">国家</div>
                        <div class="div-option" @click="doSelect(3)">地域</div>
                        <div class="div-option" @click="doSelect(4)">省份</div>
                        <div class="div-option" @click="doSelect(5)">城市</div>
                        <div class="div-option" @click="doSelect(6)">行业</div>
                        <div class="div-option" @click="doSelect(7)">子行业</div>
                        <div class="div-option" @click="doSelect(8)">类型</div>
                         <div class="div-option" @click="doSelect(9)">黑名单</div>
                    </div>
                </div>
                <input type="text" class="div-search" v-model="screen_title" placeholder="筛选关键词">
            </div>
            <table class="event-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>客户名称</th>
                        <th width="">客户类型</th>
                        <th width="">创建时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(value, index) in list" @click='edit'> 
                        <td>{{index}}</td>
                        <td align="center">{{value.customername}}</td>
                        <td align="center">{{value.customertype == 1? '正式':'临时'}}</td>
                        <td align="center">{{value.createdatetime}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script>
    export default {
        data: function(){
            return {
                active: false,
                screen_type: 0,
                screen_title: '',
                info:{
                    content: '',
                    id: 0,
                    index: 0
                },
                list: '' 
            }
        },
        beforeCreate: function() {
           var qs = require('qs');
           this.$http.post(`${this.$.Global.appURL}/customer/customer/list`,
                qs.stringify({
                     "page": 1,
                     "start":0,
                     "limit":25
                })).then((res) => {
                        this.list=res.data.recordList;
                    })

        },
        computed:{
            getTypeName(){
                return this.getType(this.screen_type) || '请选择';
            }
        },
        methods:{
            doSelect(type){
                this.screen_type = type;
                this.active = false;
            },
            getType(type){
                let str = '';
                switch(type) {
                    case 1:
                        str = '客户名称';
                        break;
                    case 2:
                        str = '国家';
                        break;
                    case 3:
                        str = '地域';
                        break;
                    case 4:
                        str = '省份';
                        break;
                }
                return str;
            },
            edit(){
                console.log(0);
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .event-all{
        position: absolute;
        left:0px;
        top:70px;
        right:0;
        bottom:0;
        transform: translateX(-100%);
        transition: transform .5s;
        overflow-Y: scroll;
        background: #fff;
        &.event-all-show{
            transform: translateX(0);
        }
        &::-webkit-scrollbar{
            width:0;
        }
        .table-box{
            width:100%;
            max-width:1000px;
            margin: 20px auto 70px;
            .event-table{
                width:100%;
                padding:0;
                border:{
                    left:1px solid #eee;
                    top:1px solid #eee;
                }
                border-spacing: 0px;
                td,th{
                    position: relative;
                    height: 40px;
                    min-width: 0;
                    padding:5px 10px;
                    box-sizing: border-box;
                    text-overflow: ellipsis;
                    vertical-align: middle;
                    border:{
                        right:1px solid #eee;
                        bottom:1px solid #eee;
                    }
                }
                button{
                    padding:3px 7px;
                    font-size: 12px;
                    color: #fff;
                    border:0;
                    margin: 0 3px 3px 0;
                    &.del-btn{
                        background: #f57067 !important;
                    }
                }
            }
            .edit-input{
                position: fixed;
                top:0;
                width:100%;
                max-width: 1000px;
                margin:auto;
                height:60px;
                padding:10px 100px 10px 10px;
                box-sizing: border-box;
                z-index:10;
                transform: translateY(-260px);
                transition: transform .3s;
                background: #f3f3f3;
                border:1px solid #eee;
                border-radius:4px;
                &.edit-input-show{
                    transform: translateY(0);
                }
                input{
                    float: left;
                    width:100%;
                    height:40px;
                    padding:5px 10px;
                    box-sizing: border-box;
                    border: 1px solid #ddd;
                }
                button{
                    position: absolute;
                    right: 10px;
                    width:80px;
                    height:40px;
                    color: #fff;
                    border:0;
                }
            }
            .screen-box{
                position: relative;
                padding: 0 0 10px 95px;
                height:35px;
                .div-select{
                    position: absolute;
                    left:0;
                    top:0;
                    width:85px;
                    height:35px;
                    padding:0 10px;
                    box-sizing: border-box;
                    border:1px solid #eee;
                    font-size:12px;
                    color: #999;
                    cursor: pointer;
                    &:after{
                        position: absolute;
                        right:6px;
                        top:12px;
                        width:6px;
                        height:6px;
                        content: '';
                        border:{
                            right:1px solid #999;
                            bottom: 1px solid #999;
                        }
                        transform: rotate(45deg);
                    }
                    &.active{
                        .div-select-body{
                            height:222px;
                            border:1px solid #eee;
                            box-shadow: 0 0 1px #ddd;
                        }
                    }
                }
                .div-value{
                    line-height: 35px;

                }
                .div-select-body{
                    position: absolute;
                    left:0;
                    top:38px;
                    width:85px;
                    height:0;
                    padding-left: 10px;
                    line-height: 30px;
                    box-sizing: border-box;
                    overflow: hidden;
                    z-index:10;
                    box-shadow: none;
                    border: none;
                    border-radius: 3px;
                    background: #fff;
                    transition: all .3s;
                }
                .div-search{
                    width:100%;
                    height:35px;
                    line-height: 25px;
                    padding:5px 10px;
                    box-sizing: border-box;
                    border:1px solid #eee;
                    font:{
                        size:12px;
                        family: Arial,'Microsoft YaHei';
                    }
                    color: #999;
                }
            }
        }
    }
</style>