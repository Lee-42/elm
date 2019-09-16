<template>
    <!-- <div class="food-wrapper" ref='foods'> -->
        <div class="food" v-show="showFlag" ref='foods'>
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image" alt="">
                    <div class="back" @click="back">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}</span>
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{food.price}}</span>
                        <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                        <div class="cartcontrol-wrapper">
                            <v-cartcontrol :food="food"></v-cartcontrol>
                        </div>
                        <div @click.stop.prevent="addFirst($event)" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
                    </div>
                </div>
                <v-split v-show="food.info"></v-split>
                <div class="info">
                    <h1 class="title">商品介绍</h1>
                    <p class="text" v-show="food.info">{{food.info}}</p>
                </div>
                <v-split></v-split>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <v-ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></v-ratingselect>
                </div>    
            </div>    
        </div>
    <!-- </div> -->
</template>

<script>

import BScroll from 'better-scroll'
//导入cartcontrol组件
import CartControl from '../cartcontrol/CartControl.vue'
//导入split组件
import Split from '../split/Split.vue'
//导入ratingselect组件
import RatingSelect from '../ratingselect/RatingSelect.vue'
//导入Vue
import Vue from 'vue'


const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;


export default {
    props:{
        food:{
            type:Object
        }
    },
    data() {
        return {
            showFlag:false,
            selectType:ALL,
            onlyContent:true,
            desc:{
                all:'全部',
                positive:'推荐',
                negative:'吐槽'
            }
        }
    },
    methods:{
        show(){
            this.showFlag = true;
            this.selectType = ALL;
            this.onlyContent = true;
            this.$nextTick(() => {
                if(!this.scroll){
                    this.scroll = new BScroll(this.$refs.foods,{
                        click:true
                    })
                }else{
                    this.scroll.refresh()
                }

                // this.scroll = new BScroll(this.$refs.foods,{
                //     click:true
                // })
            })
        },
        back(){
            this.showFlag = false;
        },
        addFirst(event){
            console.log('click');
            if(!event._constructed){
                return;
            }
            Vue.set(this.food,'count',1);
        }
    },
    components:{
        'v-cartcontrol':CartControl,
        'v-split':Split,
        'v-ratingselect':RatingSelect
    }
}
</script>

<style lang="stylus" scoped rel="stylesheet/sass">
    .food{
        position fixed;
        top 0px;
        left 0px;
        bottom 48px;
        z-index 30;
        width 100%;
        background #FFF;

        // .move-transition{
        //     transition all 0.2s linear;
        //     transform translate3d(0,0,0);
        // }
        // .move-enter,.move-leave{
        //     transform translate3d(100%,0,0);
        // }

        .image-header{
            position relative;
            width 100%;
            height 0px;
            padding-top 100%;

            img{
                position absolute;
                top 0px;
                left 0px;
                width 100%;
                height 100%;
            }
            .back{
                position absolute;
                top 10px;
                left 0px;

                .icon-arrow_lift{
                    display  block;
                    padding 10px;
                    font-size 20px;
                    color #FFF;
                }
            }
        }

        .content{
            padding 18px;

            .title{
                line-height 14px;
                margin-bottom 8px;
                font-size 14px;
                font-weight 700;
                color rgb(7,17,27);
            }
            .detail{
                margin-bottom 18px;
                line-height 10px;
                height 10px;
                font-size 0px;

                .sell-count,.rating{
                    font-size 10px;
                    color rgb(147,153,159);
                }
                .sell-count{
                    margin-right 12px;
                }
            }
            .price{
                font-weight 700;
                line-height 24px;
                position relative;

                .now{
                    margin-right 8px;
                    font-size 14px;
                    color rgb(240,20,20);
                }
                .old{
                    text-decoration line-through;
                    font-size 10px;
                    color rgb(147,153,159)
                }
                .cartcontrol-wrapper{
                    position absolute;
                    right 12px;
                    bottom -8px;
                }
                .buy{ 
                    position absolute;
                    right 18px;
                    bottom 3px;
                    z-index 10;
                    height 24px;
                    line-height 24px;
                    padding 0 12px;
                    box-sizing border-box;
                    border-radius 12px;
                    font-size 10px;
                    color #FFF;
                    background rgb(0,160,220);
                }
            }
        }
        .info{
            padding 18px;
            
            .title{
                line-height 14px;
                margin-bottom 6px;
                font-size 14px;
                color rgb(7,17,27);
            }
            .text{
                line-height 24px;
                padding 0 8px;
                font-size 12px;
                color rgb(77,85,93);
            }
        }
        .rating{
            padding-top 18px;

            .title{
                line-height 14px;
                margin-left 18px;
                font-size 14px;
                color rgb(7,17,27);
            }
        }
    }
     

</style>
