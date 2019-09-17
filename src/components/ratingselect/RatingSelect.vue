<template>
    <div class='ratingselect'>
        <div class="rating-type">
            <span @click="select(2,$event)" class="block positive" :class="{'positive-active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span @click="select(0,$event)" class="block positive" :class="{'positive-active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
            <span @click="select(1,$event)" class="block negative" :class="{'negative-active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
        </div>
        <div class="switch" @click="toggleContent($event)">
            <span  class="icon-check_circle" :class="{'icon-check_circle-on':onlyContent}"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>


const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
    props:{
        ratings:{
            type:Array,
            default(){
                //default是一个空数组数组的对象都要返回一个函数
                return [];
            }
        },
        selectType:{
            type:Number,
            default:ALL
        },
        onlyContent:{
            type:Boolean,
            default:false
        },
        desc:{
            type:Object,
            default(){
                return {
                    all:'全部',
                    positive:'满意',
                    negative:'不满意'
                }
            }
        }
    },
    methods:{
        select(type,event){
            if(!event._constructed){
                return;
            }
            this.selectType = type;
            this.$emit('ratingType-select',type);
        },
        toggleContent(event){
            if(!event._constructed){
                return;
            }
            this.onlyContent = !this.onlyContent;
            this.$emit('content-toggle');
        },
    },
    computed:{
        positives(){
            return this.ratings.filter((rating) => {    //filter对象是对ratings数组做过滤
                return this.rateType === POSITIVE;
            })  
        },
        negatives(){
            return this.ratings.filter((rating) => {    //filter对象是对ratings数组做过滤
                return this.rateType === NEGATIVE;
            })  
        }
    }
}
</script>

<style lang="stylus" scoped rel="stylesheet/sass">
.ratingselect{
    
    .rating-type{
        padding 18px 0;
        margin 0 18px;
        border 1px  solid  rgba(7,17,27,0.1);
        font-size 0;
        
        .block{
            display inline-block;
            padding 8px 12px;
            margin-right 8px;
            border-radius 1px;
            font-size 12px;
            line-height 16px;
            color rgb(77,85,93);
        }
        .positive{
            background rgba(0,160,220,0.2);

            
        }
        .positive-active{
            background rgb(0,160,220);
            color #FFF;
        }

        .negative{
            background rgba(77,85,93,0.2);
        }
        .negative-active{
            background rgb(77,85,93);
            color #FFF;
        }

        .count{
            margin-left 2px;
            font-size 8px;
        }
    }

    .switch{
        padding 12px 18px;
        line-height 12px;
        border-bottom 1px solid rgba(7,17,27,0.1);
        color rgb(147,153,159);
        font-size 0px;

        .icon-check_circle{
            display inline-block;
            vertical-align middle;
            margin-right 4px;
            font-size 24px;
        }
        .icon-check_circle-on{
            color #00c850;
        }
        .text{
            font-size 12px;
            vertical-align middle;
        }
    }
}
</style>



