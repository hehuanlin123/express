<template>
    <div class="detail">
        <div class="title">{{detail.title}}</div>
        <div class="create-time">{{detail.createTime}}</div>
        <div class="img">
            <img :src="detail.img" alt="">
        </div>
        <div class="summary">{{detail.summary}}</div>
        <div class="content">{{detail.content}}</div>
    </div>
</template>

<script>
    import moment from 'moment'
    import { Toast } from 'vant'

    export default {
        name: "Detail",
        comments:{
            [Toast.name]:Toast
        },
        data(){
            return{
                detail:{
                    id:'',
                    title:'',
                    img:'',
                    summary:'',
                    content:'',
                    createTime:'',
                }
            }
        },
        created() {
            fetch('/article/detail/'+this.$route.query.id)
                .then(res => res.json())
                .then(res => {
                    if(res.status == 200) {
                        this.detail = res.data;
                        this.detail.createTime = res.data.createTime ? moment(res.data.createTime).format('YYYY-MM-DD HH:mm:ss') : undefined;
                        this.detail.img = res.data.img ? res.data.img + '?randomID=' + Math.random() : undefined;
                    } else {
                        Toast.fail(res.errMsg)
                    }
                })
        },
    }
</script>

<style scoped>
    .detail{
        padding: 20px;
        text-align: left;
    }
    .detail .title{
        font-size: 25px;
        padding-bottom: 20px;
    }
    .detail .create-time{
        color: darkgrey;
    }
    .detail .summary{
        padding: 20px;
        background: #fff8f9;
    }
    .detail .img{
        padding: 20px;
        text-align: center;
    }
    .detail .content{
        text-indent: 2em;
        line-height: 200%;
        padding-top: 20px;
    }

</style>