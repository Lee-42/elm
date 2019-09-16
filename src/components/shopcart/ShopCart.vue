<template>
    <div class="shopcart">
        <div class="shop-content" @click="toggleList">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight':totalCount>0}">
                        <span class="icon-shopping_cart" :class="{'cart-highlight':totalCount>0}"></span>
                    </div>
                    <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                </div>
                <div class="price" :class="{'price-highlight':totalPrice>0}">￥{{totalPrice}}</div>
                <div class="desc">另需配送费 ￥{{deliveryPrice}}</div>
            </div>
            <div class="content-right">
                <div class="pay" :class="payClass">
                    {{payDesc}}
                </div>
            </div>
        </div>
        <div class="ball-container">
            <div transition="drop" class="ball" v-for="(ball,index) in balls" :key="index" v-show="ball.show">
                <div class="inner"></div>
            </div>
        </div>
        <div class="shopcart-list" v-show="listShow">
            <div class="list-header">
                <h1 class="title">购物车</h1>
                <h1 class="empty">清空</h1>
            </div>
            <div class="list-content">
                <ul>
                    <li class="food" v-for="food in selectFoods" :key="food.count">
                        <span class="name">{{food.name}}</span>
                        <div class="price">
                            <span>￥{{food.price*food.count}}</span>
                        </div>
                        <div class="cartcontrol-wrapper">
                            <carcontrol :food="food"></carcontrol>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">

import CarControl from '../cartcontrol/CartControl.vue'


export default {

    props:{
        deliveryPrice:{
            type:Number,
            default:0
        },
        minPrice:{
            type:Number,
            default:0
        },
        selectFoods:{
            type:Array,
            default(){
                return [];
            }
        }
    },
    data() {
        return {
            balls:[
                {
                    show:false
                },
                {
                    show:false
                },
                {
                    show:false
                },
                {
                    show:false
                },
                {
                    show:false
                }
            ],
            dropBall:[], //已经下落的小球
            fold:true   //默认折叠
        }
    },
    components:{
        'carcontrol':CarControl
    },
    computed:{
        totalPrice(){
            let total = 0;
            this.selectFoods.forEach((food) => {
                total += food.price*food.count
            })
            return total;
        },
        totalCount(){
            let count = 0;
            this.selectFoods.forEach((food) => {
                count += food.count;
            })
            return count;
        },
        payDesc(){
            if(this.totalPrice === 0){
                return `￥${this.minPrice}元起送`
            }else if(this.totalPrice < this.minPrice){
                let diff = this.minPrice-this.totalPrice
                return `还差 ￥${diff}起送`
            }else{
                return '去结算'
            }
        },
        payClass(){
            if(this.totalPrice < this.minPrice){
                return 'not-enough'
            }else{
                return 'enough'
            }
        },
        listShow(){
            if(!this.totalCount){
                this.fold = true    //状态由折叠变化为展开
                return false;   //列表展开
            }
            let show = !this.fold
            return show;    //
        }
    },
    methods:{
        drop(el){

        },
        toggleList(){
            if(!this.totalCount){
                return 1
            }
            this.fold = !this.fold
        }
    }
}
</script>

<style lang="stylus" scoped rel="stylesheet/sass">

.shopcart{
    position fixed;
    left 0px;
    bottom 0px;
    z-index 50;
    width 100%;
    height 48px;

    .shop-content{
        display flex;
        background #141d27;
        font-size 0;

        .content-left{
            flex 1;

            .logo-wrapper{
                display inline-block;
                position relative;
                top:-10px;
                margin 0 12px;
                padding 6px;
                width 56px;
                height 56px;
                box-sizing border-box;
                vertical-align top;
                border-radius 50%;
                background #141d27;

                .logo{
                    width 100%;
                    height 100%;
                    border-radius 50%;
                    background #2b343c;

                    .icon-shopping_cart{
                        font-size 24px;
                        color #80858a;
                        line-height 24px;
                        position absolute;
                        top 16px;
                        left 16px;
                    } 
                    .cart-highlight{
                        color #FFF;
                    } 
                }
                .highlight{
                    background rgb(0,160,220);
                }
                .num{
                    position absolute;
                    top 0px;
                    right 0px;
                    width 24px;
                    height 16px;
                    line-height 16px;
                    text-align center;
                    border-radius 10px;
                    font-size 9px;
                    font-weight 700;
                    color #FFF;
                    background red;
                    box-shadow 0 4px 8px 0 rgba(0,0,0,0.4);
                }
            }

            .price{
                display inline-block;
                vertical-align top;
                line-height 24px;
                margin 12px;   
                padding-right 12px;
                box-sizing border-box;
                border-right 1px solid rgba(255,255,255,0.1);
                font-size 16px;
                font-weight 700; 
                color rgba(255,255,255,0.4);
            }
            .price-highlight{
                color #FFF;
            }
            .desc{
                display inline-block;
                vertical-align top;
                line-height 24px;
                margin 12px 0px 0px 0px;
                font-size 10px;
                color  rgba(255,255,255,0.4);
                font-weight 200;
            }
        }
        .content-right{
            flex 0 0 105px;
            width 105px;

            .pay{
                height 48px;
                line-height 48px;
                text-align center;
                font-size 12px;
                color rgba(255,255,255,0.4);
                font-weight 700;
                background #2b343c;
            }
            .not-enough{
                background #2b343c;
            }
            .enough{
                background #00b43c;
                color #FFF;
            }
        }
    }

    .ball-container{

        .ball{
            position fixed;
            left 32px;
            bottom 22px;
            z-index 200;

            .drop-transition{
                transition all 0.4s ;

                .inner{
                    width 16px;
                    height 16px;
                    border-radius 50%;
                    background rgb(0,160,220);
                    transition all 0.4s;
                }
            }
        }
    }

    .shopcart-list{
        position absolute;
        top 0px;
        left 0px;
        z-index 10;
        width 100%;

        // &.fold-transition {
        //     transition all 0.5 ;
        //     transform translate3d(0,-100%,0);
        // }
        // &.fold-enter,.fold-leave {
        //     transform translate3d(0,0,0);
        // } 

        .list-header{
            height 40px;
            line-height 40px;
            padding 0 18px;
            background #f3f5f7;
            border-bottom 2px solid rgba(7,17,27,0.1);

            .title{
                float left;
                font-size 14px;
                color rgb(7,17,27);
            }
            .empty{
                
                float right;
                font-size 14px;
                color rgb(0,160,220);
            }
        }
        .list-content{
            padding 0 18px;
            max-height 217px;
            // overflow:hidden;
            background #FFF;

            .food{
                position relative;
                padding 12px 0;
                box-sizing border-box;
                border 1px solid rgba(7,17,27,0.1);

                .name{
                    line-height 24px;
                    font-size 14px;
                    color rgb(7,17,27);
                }
                .price{
                    position absolute;
                    right 90px;
                    bottom 12px;
                    line-height 24px;
                    font-size 14px;
                    font-weight 700;
                    color rgb(240,20,20);
                }
                .cartcontrol-wrapper{
                    position absolute;
                    right 0;
                    bottom 6px;

                }
            }
        }
    }
      
}

</style>









