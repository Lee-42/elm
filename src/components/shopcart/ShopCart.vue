<template>
    <div class="shopcart">
        <div class="shop-content">
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
    </div>
</template>

<script type="text/ecmascript-6">

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
    components:{
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
}

</style>









