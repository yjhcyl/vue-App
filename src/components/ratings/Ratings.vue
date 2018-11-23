<template>
    <div class="ratings" ref="ratings">
      <div class="ratings-content">
        <div class="overView">
          <div class="overView-left">
            <h1 class="score">{{seller.score}}</h1>
            <div class="totalGrade">综合评分</div>
            <div class="rankRate">高于周边商家{{seller.rankRate}}</div>
          </div>
          <div class="overView-right">
            <div class="score-wrapper">
              <span class="title">服务态度</span>
              <star :size="36" :score="seller.serviceScore"></star>
              <span class="score">{{seller.serviceScore}}</span>
            </div>
            <div class="score-wrapper">
              <span class="title">商品打分</span>
              <star :size="36" :score="seller.foodScore"></star>
              <span class="score">{{seller.foodScore}}</span>
            </div>
            <div class="time">
              <span class="text">送达时间</span>
              <span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <split></split>
        <ratingSelect :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings" :desc="desc"
                      @changeType="changeType" @changeContent="changeContent"></ratingSelect>
        <div class="rating-wrapper">
          <ul>
            <li v-show="toShow(rating.rateType,rating.text)" class="rating-item" v-for="rating in ratings" :key="rating.key">
              <div class="avatar">
                <img :src="rating.avatar" width="28" height="28">
              </div>
              <div class="rating-content">
                <h1 class="name">{{rating.username}}</h1>
                <div class="star-wrapper">
                  <star :size="36" :score="rating.score"></star>
                  <span class="deliveryTime" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                </div>
                <p class="rating-text">{{rating.text}}</p>
                <div class="recommend">
                  <span class="icon-thumb_up"></span>
                  <span class="text" v-for="item in rating.recommend" :key="item.key">{{item}}...</span>
                </div>
                <div class="time">{{getTime(rating.rateTime)}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import BetterScroll from 'better-scroll'
  import Star from '../star/Star.vue'
  import Split from '../split/Split.vue'
  import RatingSelect from '../ratingSelect/RatingSelect.vue'
  import {translateData} from '../../common/js/data'
  const ALL = 2
  export default {
    name: 'ratings',
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      'star': Star,
      'split': Split,
      'ratingSelect': RatingSelect
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        },
        ratings: []
      }
    },
    created () {
      this.$http.get('/api/ratings')
        .then((res) => {
        this.ratings = res.data.data
//        console.log(res.data.data)
          this.$nextTick(() => {
          this.scroll = new BetterScroll(this.$refs.ratings, {
            click: true
          })
          })
        })
    },
    methods: {
      changeType (data) {
        this.selectType = data
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      changeContent () {
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      toShow (type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return this.selectType === type
        }
      },
      getTime (rating) {
        let data = new Date(rating)
        return translateData(data)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .ratings
    position absolute
    top 174px
    bottom 0
    width 100%
    font-size 0
    overflow hidden
    .ratings-content
      .overView
        display flex
        padding 18px 0
        .overView-left
          flex 0 0 137px
          width 137px
          text-align center
          padding 6px 0
          border-right 1px solid rgba(7, 17, 27, 0.1)
          @media only screen and (max-width 320px)
            flex 0 0 120px
            width 120px
          .score
            font-size 24px
            line-height 28px
            color rgb(255, 153, 0)
          .totalGrade
            margin-top 6px
            font-size 12px
            line-height 1
            color rgb(7, 17, 27)
          .rankRate
            padding-top 8px
            font-size 10px
            line-height 1
            color rgb(147, 153, 159)
        .overView-right
          flex 1
          padding 6px 0 0 24px
          @media only screen and (max-width 320px)
            padding-left 6px
          .score-wrapper
            margin-bottom 8px
            font-size 0
            .title
              display inline-block
              vertical-align top
              font-size 12px
              line-height 18px
              color rgb(7, 17, 27)
            .star
              display inline-block
              vertical-align top
              margin 0 12px
              @media only screen and (max-width 320px)
                margin 0 6px
              vertical-align top
            .score
              display inline-block
              line-height 18px
              font-size 12px
              color rgb(255, 153, 0)
              vertical-align top
          .time
            font-size 0
            .text
              line-height 18px
              font-size 12px
              color rgb(7, 17, 27)
              margin-right 12px
            .deliveryTime
              font-size 12px
              color rgb(147, 153, 159)
      .rating-wrapper
        margin 0 18px
        .rating-item
          display flex
          padding 18px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .avatar
            flex 0 0 28px
            width 28px
            margin-right 12px
            vertical-align top
            img
              /*position absolute*/
              /*top 0*/
              /*left 0*/
              border-radius 50%
          .rating-content
            position relative
            flex 1
            .name
              font-size 10px
              line-height 12px
              color rgb(7, 17, 27)
              padding-bottom 4px
            .star-wrapper
              font-size 0
              .star
                display inline-block
                vertical-align top
                margin-right 6px
              .deliveryTime
                display inline-block
                vertical-align top
                font-size 10px
                font-weight 200
                line-height 18px
                color rgb(147, 153, 159)
            .rating-text
              margin-top 3px
              font-size 12px
              line-height 18px
              color rgb(7, 17, 27)
              white-space normal
            .recommend
              margin-top 8px
              .icon-thumb_up
                margin-right 8px
                font-size 12px
                color rgb(0, 160, 220)
              .text
                margin-right 8px
                padding 0 6px
                border 1px solid rgba(7, 17, 27, 0.1)
                border-radius 2px
                font-size 9px
                line-height 18px
                color rgb(147, 153, 159)

            .time
              position absolute
              top 0
              right 0
              font-size 10px
              font-weight 200
              line-height 12px
              color rgb(147, 153, 159)
</style>
