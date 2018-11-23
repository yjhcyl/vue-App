<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}} / {{seller.deliveryTime}}分钟送达
        </div>
        <!--因为seller是ajax异步获取，creatd函数未执行之前seller是空对象，所以为防止报错，使用v-if检查-->
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" v-on:click="showDetail">
        <span class="count">{{seller.supports.length}}<span>个</span>
        </span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" v-on:click="showDetail">
      <span class="icon"></span><span class="text">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star v-bind:size="48" v-bind:score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="item in seller.supports" v-bind:key="item.key">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <h3>{{seller.bulletin}}</h3>
            </div>
          </div>
        </div>
        <div class="detail-close" v-on:click="detailClose">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable key-spacing,quotes */

  import Star from "../star/Star.vue"
  export default {
    name: 'v-header',
    props: {
      seller: {
        require: true
      }
    },
    data () {
      return {
//        一个图片一个class
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        detailShow: false
      }
    },
    methods: {
      showDetail: function () {
        this.detailShow = true
      },
      detailClose: function () {
        this.detailShow = false
      }
    },
    components: {
      "star": Star
    }
//    created () {
//      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
//    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .header
    position relative
    overflow hidden
    color #FFF
    background rgba(7, 17, 27, 0.5)
    .content-wrapper
      position relative
      padding 24px 12px 18px 24px
      font-size 0
      .avatar
        display: inline-block
        vertical-align top
        img
          border-radius 2px
      .content
        display inline-block
        margin-left 16px
        font-size 14px
        .title
          margin 2px 0 8px 0
          font-size 0
          .brand
            display inline-block
            vertical-align top
            width 30px
            height 18px
            bg-image('brand')
            background-size 30px 18px
          .name
            margin-left 6px
            font-size 16px
            font-weight bold
            line-height 18px
        .description
          margin-bottom 10px
          font-size 12px
          line-height 12px
        .support
          font-size 0
          .icon
            display inline-block
            vertical-align top
            width 12px
            height 12px
            margin 0 4px 0 0
            background-size 12px 12px
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            font-size 10px
            line-height 12px
      .support-count
        position absolute
        right 12px
        bottom 14px
        padding 0 8px
        height 24px
        line-height 24px
        text-align center
        border-radius 14px
        background-color rgba(0,0,0,0.2)
        .count
          vertical-align  top
          font-size 10px
          span
            font-size 10px
        .icon-keyboard_arrow_right
          margin-left 2px
          font-size 10px
          line-height 24px

    .bulletin-wrapper
      position relative
      height 28px
      line-height 28px
      padding 0 22px 0 12px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      background-color rgba(7, 17 ,27, 0.2)
      /*font-size 0*/
      .icon
        display inline-block
        width 22px
        height 12px
        bg-image('bulletin')
        background-size 22px 12px
        background-repeat no-repeat
        vertical-align top
        margin-top 8px
      .text
        margin 0 4px
        font-size 10px
        line-height 28px
      .icon-keyboard_arrow_right
        position absolute
        right 12px
        bottom 6px
        font-size 10px
    .background
      position absolute
      left 0
      top 0
      width 100%
      height 100%
      z-index -1
      filter blur(10px)
    .detail
      position fixed
      left 0
      top 0
      z-index 1000
      width 100%
      height 100%
      overflow-y auto
      -webkit-backdrop-filter blur(10px)
      background-color rgba(7, 17, 27, 0.8)
      &.fade-enter-active, &.fade-leave-active
        transition all 0.5s
      &.fade-enter, &.fade-leave-to
        opacity 0
      .detail-wrapper
        min-height 100%
        width 100%
        .detail-main
          margin-top 64px
          padding-bottom 64px
          .name
            line-height 16px
            font-size 16px
            text-align center
            font-weight 700
          .star-wrapper
            margin-top  16px
            padding 2px 0
            text-align center
          .title
            display flex
            width 80%
            margin 28px auto 24px auto
            .text
              text-align center
              font-size 14px
              line-height 14px
              padding 0 12px
              font-weight 700
            .line
              flex 1
              position relative
              top -6px
              border-bottom 1px solid rgba(255, 255, 255, 0.2)
          .supports
            width 80%
            margin 0 auto 28px auto
            .support-item
              font-size 0
              padding 0 12px
              margin-bottom 12px
              .icon
                display inline-block
                margin-right 6px
                vertical-align top
                width 16px
                height 16px
                background-size 16px 16px
                background-repeat no-repeat
                &:last-child
                  margin 0 0
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                font-size 12px
                line-height 16px
          .bulletin
            width 80%
            margin 0 auto
            h3
              font-size 12px
              line-height 2
      .detail-close
        position relative
        height 32px
        width 32px
        margin -64px auto 0 auto
        clear both
        font-size 32px
        color rgba(255, 255, 255, 0.5)
</style>
