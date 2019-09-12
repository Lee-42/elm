<template>
        <div class="header">
            <!-- 内容区域 -->
            <div class="content-wrapper">
                <!-- 商家图片 -->
                <div class="avatar">
                    <img :src="seller.avatar" width="64" height="64">
                </div>
                <!-- 商家描述内容 -->
                <div class="content">
                    <!-- 店名 -->
                    <div class="title">
                        <span class="brand"></span>
                        <span class="name">{{seller.name}}</span>
                    </div>
                    <!-- 店描述 -->
                    <div class="description">
                        {{seller.description}}/{{seller.deliveryTime}}分钟送达
                    </div>
                    <!-- 支持的优惠 -->
                    <!-- v-if如果不加，由于获取数据是一个异步过程，那数据还没有获取到数据，所以报错 -->
                    <div v-if="seller.supports" class="supports">
                        <span class="icon"></span>
                        <span class="text">{{seller.supports[0].description}}</span>
                    </div>
                </div>
                <!-- 优惠数量 -->
                <div  v-if="seller.supports" class="support-count" @click="showDetail">
                    <span class="count">{{seller.supports.length}}个</span>
                    <i class="icon-keyboard_arrow_right"></i>
                </div>
            </div>
            <!-- 商家简介 -->
            <div class="bullentin-wrapper" @click="showDetail"> 
                <span class="bullentin-title"></span>
                <span class="bullentin-text">{{seller.bulletin}}</span>
            </div>
            <!-- 高斯模糊背景图 -->
            <div class="background">
                <img :src="seller.avatar" width="100%" height="100%">
            </div>
            <!-- 详情页面展示 -->
            <div v-show="detailShow" class="detail">
                <div class="detail-wrapper">
                    <div class="detail-main">
                        <h1 class="detail-name">{{seller.name}}</h1>
                        <star-rate style="text-align:center" :value="seller.score"></star-rate>
                        <div class="info">
                            <span class="line"></span>
                            <span class="message">优惠信息</span>
                            <span class="line"></span>
                        </div>
                        <div class="info">
                            <span class="line"></span>
                            <span class="message">商家公告</span>
                            <span class="line"></span>
                            <span class="info-detail">{{seller.bulletin}}</span>
                        </div>
                    </div>
                </div>
                <div class="detail-close">
                    <i @click="closeDetail">关闭</i>
                </div>
            </div>
        </div>

</template>

<script>

//使用rate星评分组件
import Rate from 'vue-tiny-rate'

export default {
    props:{
        seller:{
            type:Object
        }
    },
    data() {
        return {
            detailShow:false
        }
    },
    methods:{
        showDetail(){
            this.detailShow = true
        },
        closeDetail(){
            this.detailShow = false
        }
    },
    components:{
        'star-rate':Rate
    }
}
</script>

<style lang="stylus" scoped rel="stylesheet/sass">
    .header{
        color #FFF;
        background rgba(7,17,27,0.2);
        position relative;

        .content-wrapper{
            padding  24px 12px 18px  24px;
            font-size 0;
            position relative;

            .avatar{
                display   inline-block;
                vertical-align  top;

                img{
                    border-radius 2px;
                }
            }
            
            .content{
                display inline-block;
                margin-left 16px;
                font-size 14px;

                .title{
                    margin 2px 0px 8px 0px;

                    .brand{
                        width 30px;
                        height 18px;
                        display inline-block;
                        background-image url('./images/brand@2x.png')
                        background-size 30px 18px;
                        vertical-align top;
                    }
                    .name{
                        margin-left 6px;
                        font-size 16px;
                        line-height 18px;
                        font-weight bold;
                    }
                }
                .description{
                    margin-bottom 10px;
                    font-size 12px;
                    line-height 12px;
                    font-weight 200;
                }

                .supports{

                    .icon{
                        display inline-block;
                        width 12px;
                        height 12px;
                        margin-right 4px;
                        background-image url('./images/decrease_1@3x.png')
                        background-size 12px 12px;
                        background-repeat no-repeat;
                        vertical-align top;
                    }
                    .text{
                        line-height 12px;
                        font-weight 200;
                        font-size 10px;
                        vertical-align top;
                    }
                }
            }

            .support-count{
                position absolute;
                right 12px;
                bottom 18px;
                padding 0 8px;
                height 24px;
                line-height 24px;
                border-radius 14px;
                background rgba(0,0,0,0.2);
                text-align center;

                .count{
                    font-size 10px;
                    vertical-align top;
                    margin-left 2px;
                    line-height 24px;
                }
                .icon-keyboard_arrow_right{
                    font-size 10px;
                }
            }
        }
        .bullentin-wrapper{
            position relative;
            height 28px;
            line-height 28px;
            background rgba(0,0,0,0.2);
            padding 0 22px 0 12px
            white-space nowrap;
            overflow hidden;
            text-overflow ellipsis;

            .bullentin-title{
                display inline-block;
                width 22px;
                height 12px;
                margin 0px 4px 0px 12px;
                background-image url('./images/bulletin@3x.png')
                background-size 22px 12px;
                background-repeat no-repeat;
            }
            .bullentin-text{
                margin 0px 12px 0px 0px;
                font-size 10px;
            }
        }

        .background{
            position absolute;
            top 0;
            left 0;
            width 100%;
            height 100%;
            z-index -1;
            filter blur(10px);
        }

        .detail {
            position fixed;
            z-index 100;
            top 0;
            left 0;
            width 100%;
            height 100%;
            overflow auto;
            background rgba(7,17,27,0.8);

            .detail-wrapper{
                min-height 100%;

                .detail-main{
                    margin-top 64px;
                    padding-bottom 64px;

                    .detail-name{
                        font-size 16px;
                        line-height 16px;
                        font-weight 700;
                        text-align center;
                    }
                    .info {
                        margin 28px auto 24px auto;
                        text-align center;
                        
                        .line{
                            display inline-block;
                            position relative;
                            top -7px;
                            width 112px;
                            height 2px;
                            background rgba(255,255,255,0.2);
                        }
                        .message{
                            text-align center
                            margin 0px 12px 0px 12px;
                            font-size 14px;
                            line-height 14px;
                            font-weight 700;
                        }
                        .info-detail{
                            display block;
                            max-width 250px;
                            margin 24px auto ;
                            font-size 12px;
                            line-height 24px;
                            font-weight 200;
                        }
                    }
                }
            }
            .detail-close .icon-close{
                display block;
                position relative;
                width 32px;
                height 32px;
                margin -64px auto 0 auto;
                clear both;
                font-size 32px;
                background #FF0000;
            }
        }
    }
</style>





