<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item,index) in goods" :key="item.name" class="menu-item" :class="{'current': currentIndex===index}" @click="selectMenu(index,$event)">
                    <span class="text">{{item.name}}</span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref='foodWrapper'>
            <ul>
                <li v-for="item in goods" :key="item.name" class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li @click="selectFood(food,$event)" v-for="food in item.foods" :key="food.sellCount" class="food-item">
                            <div class="icon">
                                <img :src="food.icon" width="57px" height="57px">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" :v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                                    <div class="cartControlWrapper" >
                                        <v-cart-control :food="food"></v-cart-control>
                                    </div>
                                </div>
                                
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <v-food :food="selectedFood" ref='food'></v-food>
        <v-shop-cart :selectFoods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></v-shop-cart>
    </div>
</template>

<script>

const ERR_OK = 0;

//导入better-scroll组件
import BScroll from 'better-scroll'
//导入购物车组件
import ShopCart from '../shopcart/ShopCart.vue'
//导入购物车加减组件
import CartControl from '../cartcontrol/CartControl.vue'
//导入food商品详情组件
import Food from '../food/Food.vue'

export default {
    props:{
        seller:{
            type:Object
        }
    },
    data() {
        return {
            goods:[],
            listHeight:[],
            scrollY:0,
            selectedFood:{}
        }
    },
    computed:{
        currentIndex(){
            for(let i = 0;i < this.listHeight.length;i++){
                let height1 = this.listHeight[i]
                let height2 = this.listHeight[i+1]
                if(!height2 || (this.scrollY >= height1) && (this.scrollY < height2)){
                    return i;
                }
            }
            return 0;
        },
        selectFoods(){
            let foods = [];
            this.goods.forEach((item) => {
                item.foods.forEach((food) => {
                    if(food.count){
                        foods.push(food);
                    }
                })
            }) 
            return foods;
        }
    },
    created(){
        this.$http.get('/api/goods').then((response) => {
            response = response.body
            // console.log(response)
            if(response.errno === ERR_OK){
                this.goods = response.data
                // console.log(this.goods);
                this.$nextTick( () => {
                    this._initScroll();
                    this._caculateHeight();
                })
            }
        })
    },
    methods:{
        _initScroll(){
            this.menuScroll = new BScroll(this.$refs.menuWrapper,{
                click:true
            })
            this.foodScroll = new BScroll(this.$refs.foodWrapper,{
                probeType:3, //希望scroll在滚动的时候能实时告诉我们滚动的位置
                click:true
            })

            this.foodScroll.on("scroll",(pos) => {
                this.scrollY = Math.abs(Math.round(pos.y))
                // console.log(this.scrollY);
            })
        },
        _caculateHeight(){
           let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
           let height = 0
           this.listHeight.push(height)
        //    console.log(listHeight);
           for(let i = 0;i < foodList.length; i++){
               let item = foodList[i];
               height += item.clientHeight
               this.listHeight.push(height) 
           }
        },
        selectMenu(index,event){
            if(!event._constructed){
                return;
            }
            // console.log(index);
            let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
            let el = foodList[index]
            this.foodScroll.scrollToElement(el,300);
        },
        _drop(target){
            
        },
        selectFood(food,event){
            if(!event._constructed){
                return
            }
            this.selectedFood = food
            this.$refs.food.show()
        }
    },
    components: {
        'v-shop-cart':ShopCart,
        'v-cart-control':CartControl,
        'v-food':Food
    },
    events:{
        'cart-add'(target){
            this._drop(target);
        }
    }
}
</script>


<style lang="stylus" scoped rel="stylesheet/sass">

.goods{
    display flex ;
    position absolute;
    top 190px;
    bottom 46px;
    width 100%;
    overflow hidden;

    .menu-wrapper{
        flex 0 0 80px;
        width 80px;
        background #F5F6F7;

        .menu-item{
            display table;
            width  56px;
            height 50px;
            line-height 14px;
            padding 0 12px;
            border-bottom 1px solid rgba(7,17,27,0.1);

            .text{
                display table-cell;
                width 56px;
                font-size 12px;
                vertical-align middle;
                color rgb(24,20,20);
            }
        }
        .current{
            position relative;
            margin -1px;
            z-index 10;
            background #fff;
            font-weight 700;
            border 0px solid #fff;
        }
    }
    .foods-wrapper{
        flex 1;

        .title{
            padding-left 14px;
            background #f3f5f7;
            font-size 12px;
            line-height 26px;
            color rgb(147,153,159);
            border-left 2px solid #d9dde1;
        }
        .food-item{
            display flex;
            margin 18px;
            padding-bottom 8px;
            border-bottom 1px solid color #d9dde1;

            .icon{
                flex 0 0 57px;
                margin-right 10px;
            }
            .content{
                flex 1;
                position relative;

                .name{
                    margin 2px 0px 8px 0px;
                    height 14px;
                    font-size 14px;
                    color rgb(7,17,27);
                    line-height 14px;
                }
                .desc,.extra{
                    line-height: 10px;
                    font-size: 10px;
                    color: rgb(147,153,159)
                }
                .desc{
                    margin-bottom 8px;
                }
                .extra{
                    .count{
                        margin-right: 12px;
                    }
                }
                .price{
                    position relative;

                    .now{
                        margin-right: 8px;
                        font-size: 14px;
                        color: rgb(240,20,20);
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 10px;
                        color: rgb(147,153,159);
                    }
                    .cartControlWrapper{
                        position absolute;
                        right 0px;
                        bottom -9px;
                    }
                }
                
            }
        }
    }
}

</style>
