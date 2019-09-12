<template>
    <div class="goods">
        <div class="menu-wrapper">
            <div v-for="item in goods" :key="item.name" class="menu-item">
                <span class="text">{{item.name}}</span>
            </div>
        </div>
        <div class="foods-wrapper">
            <ul>
                <li v-for="item in goods" :key="item.name">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" :key="food.sellCount" class="food-item">
                            <div class="icon">
                                <img :src="food.icon" >
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span>月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span>￥{{food.price}}</span>
                                    <span :v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

const ERR_OK = 0;

export default {
    props:{
        seller:{
            type:Object
        }
    },
    data() {
        return {
            goods:[]
        }
    },
    created(){
        this.$http.get('/api/goods').then((response) => {
            response = response.body
            // console.log(response)
            if(response.errno === ERR_OK){
                this.goods = response.data
                // console.log(this.goods);
            }
        })
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
    }
    .foods-wrapper{
        flex 1;
    }
}

</style>
