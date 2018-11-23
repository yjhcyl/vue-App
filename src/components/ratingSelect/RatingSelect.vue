<template>
    <div class="ratingSelect">
      <div class="ratingType">
        <span @click="select(2, $event)" class="block all" :class="{'active': selectType === 2}">
          {{desc.all}}<span class="count">{{ratings.length}}</span>
        </span>
        <span @click="select(0, $event)" class="block positive" :class="{'active': selectType === 0}">
          {{desc.positive}}<span class="count">{{getPositives.length}}</span>
        </span>
        <span @click="select(1, $event)" class="block negative" :class="{'active-gray': selectType === 1}">
          {{desc.negative}}<span class="count">{{getNegatives.length}}</span>
        </span>
      </div>
      <div @click="toSwitch($event)" class="switch" :class="{'on': onlyContent}">
        <i class="icon-check_circle"></i>
        <span class="text">只看有内容的评价</span>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2
  export default {
    name: 'ratingSelect',
    props: {
      ratings: {
        type: Array,
        default () {
          return []
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    methods: {
      select (type, event) {
        if (!event._constructed) {
          return
        }
        this.$emit('changeType', type)
      },
      toSwitch (event) {
        if (!event._constructed) {
          return
        }
        this.$emit('changeContent')
      }
    },
    computed: {
      getPositives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE
        })
      },
      getNegatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .ratingSelect
    .ratingType
      padding 18px 0
      margin 0 18px
      font-size 0
      border-1px(rgba(7, 17, 27, 0.1))
      .block
        margin-right 8px
        font-size 12px
        line-height 16px
        padding 8px 12px
        &.active
          background-color rgb(0, 160, 220)
        &.active-gray
          background-color rgb(77, 85, 93)
      .all
        background-color rgba(0, 160, 220, 0.2)
      .positive
        background-color rgba(0, 160, 220, 0.2)
      .negative
        background-color rgba(77, 85, 93, 0.2)
    .switch
      padding 12px 18px
      line-height 24px
      color rgb(147, 153, 159)
      &.on
        .icon-check_circle
          color #00c850
      border-bottom 2px solid rgba(7, 17, 27, 0.1)
      .icon-check_circle
        vertical-align middle
        margin-right 4px
        font-size 24px
      .text
        font-size 14px

</style>
