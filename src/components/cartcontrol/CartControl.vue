<template>
    <div class="cart-control">
        <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart($event)" transition="move" >
            <div class="inner  icon-remove_circle_outline"></div>
        </div>
        <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click="addCart($event)"></div>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
    props:{
        food:{
            type:Object
        }
    },
    created(){
        // console.log(this.food);//看看能不能成功获取父元素的food
    },
    methods:{
        addCart(event){
            if(!event._constructed){
                return
            }
            // console.log('click');
            if(!this.food.count){
                Vue.set(this.food,'count',1) //为其增加一个count属性，并将其值设为1
                // this.food.count = 1;
            }else{
                this.food.count++
            }
        },
        decreaseCart(event){
            if(!event._constructed){
                return;
            }
            // console.log('click');
            if(this.food.count > 0){
                // Vue.set(this.food,'count',1) //为其增加一个count属性，并将其值设为1
                this.food.count--;
            }
        }
    }
}
</script>

<style lang="stylus" scoped rel="stylesheet/sass">
.cart-control{
    font-size 0;

    .cart-decrease,.cart-add {
        display inline-block;
        font-size 24px;
        line-height 24px;
        padding 6px;
        color rgb(0,160,220);
        transition all 0.4s linear;

        
    //     .inner{
    //         display  inline-block;
    //         line-height 24px;
    //         font-size 24px;
    //         color rgb(0,160,220);
    //         transition all 0.4s linear;
    //         transform rotate(0);

    //         .move-enter,.move-leave{
    //             opacity 0;
    //             transform translate3d(24px,0,0);

    //             .inner{
    //                 transform rotate(180deg)
    //             }
    //         }
    //     }
    // }
    // .move-transition{
    //     opacity 1;
    //     transform translate3d(0,0,0);
    }


    .cart-count{
        display inline-block;
        vertical-align top;
        width 12px;
        padding-top 6px;
        line-height 24px;
        text-align center;
        font-size 10px;
        color rgb(147,153,159);
    }
    .cart-add{ 
        display inline-block;
    }
}
</style>










