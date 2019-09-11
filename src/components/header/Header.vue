<template>
        <div class="header">
            <div class="content-wrapper">
                <div class="avatar">
                    <img :src="seller.avatar" width="64" height="64">
                </div>
                <div class="content">
                    <div class="title">
                        <span class="brand"></span>
                        <span class="name">{{seller.name}}</span>
                    </div>
                    <div class="description">
                        {{seller.description}}/{{seller.deliveryTime}}分钟送达
                    </div>
                    <!-- v-if如果不加，由于获取数据是一个异步过程，那数据还没有获取到数据，所以报错 -->
                    <div v-if="seller.supports" class="supports">
                        <span class="icon"></span>
                        <span class="text">{{seller.supports[0].description}}</span>
                    </div>
                </div>
                <div  v-if="seller.supports" class="support-count">
                    <span class="count">{{seller.supports.length}}个</span>
                    <i class="icon-keyboard_arrow_right"></i>
                </div>
            </div>
            <div class="bullentin-wrapper">
                <span class="bullentin-title"></span>
                <span class="bullentin-text">{{seller.bulletin}}</span>
            </div>
            <div class="background">
                <img :src="seller.avatar" width="100%" height="100%">
            </div>
        </div>

</template>

<script>

export default {
    props:{
        seller:{
            type:Object
        }
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
    }
</style>





