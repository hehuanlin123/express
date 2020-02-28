<template>
    <div>
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
        >
            <van-cell
                    v-for="item in list"
                    :key="item.id"
                    @click="handleClick(item.id)"
            >
                <div class="listItem">
                    <div class="left">
                        <img :src="item.img" alt="">
                    </div>
                    <div class="right">
                        <div class="title">{{item.title}}</div>
                        <div class="create-time">{{item.createTime}}</div>
                    </div>
                </div>
            </van-cell>
        </van-list>
    </div>
</template>

<script>
    import {List,Cell,Toast} from 'vant';
    import moment from 'moment';

    export default {
        name: "Home",
        comments:{
            [List.name]:List,
            [Cell.name]:Cell,
            [Toast.name]:Toast,
        },
        data(){
            return {
                loading:false,
                finished:false,
                list:[],
            }
        },
        methods:{
            onLoad(){
                fetch('/article/lists')
                    .then(res => res.json())
                    .then(res => {
                        if(res.status == 200){
                            this.loading = false;
                            this.finished = true;
                            this.list = res.data.map(item => {
                                if(item.createTime){
                                    item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss');
                                }
                                if(item.img){
                                    //解决静态资源缓存问题
                                    item.img += '?randomId =' + Math.random().toString()
                                }
                                return item;
                            });
                        } else {
                            Toast.fail(res.errMsg)
                        }
                    })
            },
            handleClick(id){
                this.$router.push({
                    path:'/detail',
                    query:{
                        id
                    }
                })
            },
        },
    }
</script>

<style scoped>
    .listItem{
        display: flex;
        flex-direction: row;
    }
    .listItem .left, img{
        width: 150px;
        height: 100px;
        border-radius: 10px;
    }
    .listItem .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 15px;
    }
    .listItem .right .title {
        font-size: 18px;
    }
    .listItem .right .create-time {
        font-size: 15px;
        color: darkgrey;
    }
</style>