<template>
    <div class='ratingselect'>
        <div class="rating-type">
            <span class="block positive" :class="{'positive-active':selectType===2}">{{desc.all}}<span class="count">47</span></span>
            <span class="block positive" :class="{'positive-active':selectType===0}">{{desc.positive}}<span class="count">40</span></span>
            <span class="block negative" :class="{'negative-active':selectType===1}">{{desc.negative}}<span class="count">7</span></span>
        </div>
        <div class="switch">
            <span class="icon-check_circle" :class="{'icon-check_circle-on':onlyContent}"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>


const POSITI = 0;
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
        }
    }
}
</style>



