<template>
    <div class="seller"  ref='seller'>
        <div class="seller-content">
            <div class="overview"  >
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc">
                    <star-rate class="starRate" :value="seller.score"></star-rate>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                </div>
                <div class="favorite">
                    <span class="icon-favorite" :class="{'icon-favorite-avtive':favorite}" @click="toggleFavorite($event)"></span>
                    <span class="text">{{favoriteText}}</span>
                </div>
                <div class="remark">
                    <li class="block">
                        <h2 class="remark-item">起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2 class="remark-item">商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2 class="remark-item">平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </div>
                <split></split>
                <div class="bulletin">
                    <h1 class="title">公告与活动</h1>
                    <div class="content-wrapper">
                        <p class="content">{{seller.bulletin}}</p>
                    </div>
                </div>
                <split></split>
                <div class="pics">
                    <h1 class="title">商家实景</h1>
                    <div class="pic-wrapper" ref="picwrapper">
                        <ul class="pic-list" ref="piclist" >
                            <li class="pic-item" v-for="(pic,index) in seller.pics" :key="index">
                                <img :src="pic" width="120px" height="90px">
                            </li>
                        </ul>
                    </div>
                </div>
                <split></split>
                <div class="info">
                    <h1 class="title">商家信息</h1>
                    <ul>
                        <li class="info-item" v-for="(info,index) in seller.infos" :key="index">{{info}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Rate from 'vue-tiny-rate'
import Split from '../split/Split.vue'
import BScroll from 'better-scroll'
import { saveToLocal,loadFromLocal } from '../../common/js/store.js'


export default {
    props:{
        seller:{
            type:Object
        }
    },
    data() {
        return {
            favorite:(() => {
                console.log(this.seller.id);
                return loadFromLocal(this.seller.id,'favorite',false);
            })()
        }
    },
    components:{
        'star-rate':Rate,
        'split':Split
    },
    watch:{
        'seller'(){
            this._initScroll()
            this._initPic()
        }
    },
    mounted(){
        this._initScroll()
        this._initPic()
    },
    computed:{
        favoriteText(){
            return this.favorite ? '已收藏':'未收藏'
        }
    },
    methods:{
        _initScroll(){
            // console.log('1');
            this.$nextTick(() => {
                if(!this.scroll){
                    this.scroll = new BScroll(this.$refs.seller,{
                        click:true
                    })
                }else{
                    this.scroll.refresh()
                }
            })
        },
        _initPic(){
            if(this.seller.pics){   //有图片的时候
                let picWidth = 120;
                let margin = 6;
                let width = (picWidth+margin)*this.seller.pics.length //图片数组的宽度
                this.$refs.piclist.style.width = width
                this.$nextTick(() => {
                    if(!this.picScroll){
                        this.picScroll = new BScroll(this.$refs.picwrapper,{
                            scrollX:true,
                            eventPassthrough:'vertical'
                        })
                    }else{
                        this.picScroll.refresh()
                    }
                })
            }
        },
        toggleFavorite(event){
            if(!event._constructed){
                return;
            }else{
                return this.favorite = !this.favorite;
            }
            saveToLocal(this.seller.id,'favorite',this.favorite);
        }
    }
}
</script>

<style lang="stylus" scoped rel="stylesheet/sass">

.seller{
    position absolute;
    top 174px;
    bottom 0px;
    left 0px;
    width 100%;
    overflow hidden;

    .overview{
        padding 18px;
        position relative;
    
        .title{
            margin-bottom 8px;
            line-height 14px;
            font-size 14px;
            color rgb(7,17,27);
        }

        .desc{
            padding-bottom 18px;
            border-bottom 1px solid rgba(7,17,27,0.1);
            font-size 0px;

            .starRate{
                display inline-block;
                font-size 15px;
                vertical-align top;
                margin-right 8px;
            }
            .text{
                display inline-block;
                vertical-align top;
                margin-right 12px;
                line-height 18px;
                font-size 10px;
                color rgb(77,85,93);
            }
        }

        .remark{
            display flex;
            padding-top 18px;
        
            .block{
                flex 1;
                text-align center;
                padding 18px 0px;
                border 1px solid rgba(7,17,17,0.1);

                .remark-item{
                    margin-bottom 4px;
                    line-height 10px;
                    font-size 10px;
                    color rgb(147,153,159);
                }
                .content{
                    line-height 24px;
                    font-size 10px;
                    color rgb(7,17,27);
                
                    .stress{
                        font-size 24px;
                        font-weight 200;
                    }
                }
            }
        }

        .favorite{
            position absolute;
            right 18px;
            top 18px;
            text-align center;

            .icon-favorite,.icon-favorite-avtive{
                display block;
                margin-bottom 4px;
                line-height 24px;
                font-size 24px;
                color #d4d6d9;
            }
            .icon-favorite-avtive{
                color rgb(240,20,20);
            }
            .text{
                line-height 10px;
                font-size 10px;
                color rgb(7,17,27);
            }
        }

        .bulletin{
            padding 18px 18px 0px 18px;

            .title{
                margin-bottom 8px;
                line-height 14px;
                font-size 14px;
                color rgb(7,17,27);
            }
            .content-wrapper{
                padding 16px 12px 16px 12px;
                border 1px solid rgba(7,17,27,0.1);
            
                .content{
                    line-height 24px;
                    font-size 12px;
                    color rgb(240,20,20);
                }
            }
        }
        
        .pics{
            padding 18px;

            .title{
                margin-bottom 12px;
                line-height 14px;
                font-size 14px;
                color rgb(7,7,27);
            }
            .pic-wrapper{
                width 100%;
                height 90px;
                overflow hidden;
                white-space nowrap; //超过部分不换行
            
                .pic-list{
                    font-size 0px;

                    .pic-item{
                        display inline-block;
                        margin-right 6px;
                        width 120px;
                        height 90px;
                    }
                }
            }
        }

        .info{
            padding 18px  18px 0px 18px;

            .title{
                margin-bottom 12px;
                line-height 14px;
                font-size 14px;
                color rgb(7,7,27);
            }
            .info-item{
                padding 16px 12px;   
                line-height 16px;
                font-size 12px;
                color rgb(7,17,27);
                border 1px  solid rgba(7,17,27,0.1);
            }
        }

    }
}

</style>



