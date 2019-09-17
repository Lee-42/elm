<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">
                        高于周边商家 {{seller.rankRate}}%
                    </div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <star-rate class="star" :value="seller.serviceScore-0.5"></star-rate>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <star-rate class="star" :value="seller.foodScore-0.5"></star-rate>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delievryTime">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <v-split></v-split>
            <v-ratingselect></v-ratingselect>
            <div class="rating-wrapper">
                <ul>
                    <li class="rating-item" v-for="rating in ratings" :key="rating.rateTime">
                        <div class="avatar">
                            <img class="avatar-img" :src="rating.avatar" width="28px" height="28px" alt="">
                        </div>
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <star-rate class="star" :value='rating.score'></star-rate>
                                <span class="delivery" :v-show="rating.rateType">{{rating.deliveryTime}}</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend" v-show="rating.recommend.length">
                                <span class="icon-thumb_up"></span>
                                <span class="item" v-for="(item,index) in rating.recommend" :key="index">{{item}}</span>
                            </div>
                            <div class="time">{{rating.rateTime}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

//使用rate星评分组件
import Rate from 'vue-tiny-rate'
//导入split分割线组件
import Split from '../split/Split.vue'
//导入ratingselect组件
import RatingSelect from '../ratingselect/RatingSelect.vue'
//导入better-scroll组件
import BScroll from 'better-scroll'


const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

const ERR_OK = 0;

export default {
    props:{
        seller:{
            type:Object
        }
    },
    data(){
        return {
            ratings:[], //保存评价的数组
            selectType:ALL
        }
    },
    created(){
        this.$http.get('/api/ratings').then((response) => {
            response = response.body
            if(response.errno ===  ERR_OK){
                this.ratings = response.data
                this.ratingScroll = new BScroll(this.$refs.ratings,{
                click:true
            })
            }
        })
    },
    methods:{

    },
    components:{
        'star-rate':Rate,
        'v-split':Split,
        'v-ratingselect':RatingSelect
    }
}
</script>


<style lang="stylus" scoped rel="stylesheet/sass">
.ratings{
    position absolute;
    top 174px;
    bottom 0px;
    left 0px;
    width 100%;
    overflow hidden;

    .overview{
        display flex;
        padding 18px 0px;   

        .overview-left{
            flex 0 0 137px;
            padding-bottom 6px 0px;
            width 137px;
            border-right 1px solid rgba(7,17,27,0.2);
            text-align center;

            .score{
                margin-bottom 6px;
                line-height 28px;
                font-size 24px;
                color rgb(255,153,0);
            }
            .title{
                margin-bottom 8px;
                line-height 12px;
                font-size 12px;
                color rgb(7,17,27);
            }
            .rank{
                line-height 10px;
                font-size 10px;
                color rgb(147,153,159);
            }
        }

        .overview-right{
            flex 1;
            padding 6px 0px 6px 24px;

            .score-wrapper{
                margin-bottom 8px;
                line-height 18px;
                font-size 0px;

                .title{
                    display inline-block;
                    vertical-align top;
                    font-size 12px;
                    color rgb(7,17,27);
                }
                .star{
                    display: inline-block;
                    vertical-align: top;
                    font-size 18px;
                    margin: 0 12px;
                }
                .score{
                    display inline-block;
                    line-height 12px;
                    vertical-align top;
                    font-size 12px;
                    color rgb(255,153,0);
                }
            }
            .delivery-wrapper{
                font-size 0px;

                .title{
                    linieline-height 18px;
                    font-size 12px;
                    color rgb(7,17,27);
                }
                .delievryTime{
                    margin-left 12px;
                    font-size 12px;
                    color rgb(147,153,159);
                }
            }
        }
    }

    .rating-wrapper{
        padding 0 18px;

        .rating-item{
            display flex;
            padding 18px 0px;
            border-bottom 1px solid rgba(7,17,27,0.1);

            .avatar{
                flex 0 0 28px;
                width 28px;
                margin-right 12px;

                .avatar-img{
                    border-radius 50%;
                }
            }

            .content{
                position relative;
                flex 1;

                .name{
                    margin-bottom 4px;
                    line-height 12px;
                    font-size 10px;
                    color rgb(7,17,27);
                }
                .star-wrapper{
                    margin-bottom:6px;
                    font-size 0px;

                    .star{
                        font-size 16px;
                        display inline-block;
                        vertical-align top;
                        margin-right 6px;
                    }
                    .delivery{
                        display inline-block;
                        vertical-align top;
                        margin-right 6px;
                    }
                }
                .text{
                    line-height 18px;
                    margin-bottom 8px;
                    color rgb(7,17,27);
                    font-size 12px;
                }

                .recommend{
                    line-height 16px;
                    font-size 0px;

                    .icon-thumb_up,.item{
                        font-size 13px;
                        color rgb(0,160,220);
                    }
                    .item{
                        padding 0 6px;
                        border 1px solid rgba(7,17,27,0.1);
                        border-radius 1px;
                        color rgb(147,153,159);
                        background #FFF;
                    }
                }

                .time{
                    position absolute;
                    top 0px;
                    right 0px;
                    line-height 12px;
                    font-size 10px;
                    color rgb(147,153,159);
                }
            }
        }
    }
}
</style>
