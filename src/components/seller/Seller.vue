<template>
    <div class="seller" ref="sellerWrapper">
      <div class="seller-content">
        <div class="info">
          <div class="info-left">
            <div class="name">{{seller.name}}</div>
            <div class="star-wrapper">
              <star :size="36" :score="seller.score"></star>
              <span class="ratingCount">({{seller.ratingCount}})</span>
              <span class="sellCount">月售{{seller.sellCount}}单</span>
            </div>
          </div>
          <div class="info-right">
            <span class="icon-favorite" :class="{'active': favorite}" @click="toggleFavorite"></span>
            <div class="favorite">{{text}}</div>
          </div>
        </div>
        <div class="detail-price">
          <div class="min-price">
            <div class="text">起送价</div>
            <div class="price">{{seller.minPrice}}<span>元</span></div>
          </div>
          <div class="delivery-price">
            <div class="text">商家配送</div>
            <div class="price">{{seller.deliveryPrice}}<span>元</span></div>
          </div>
          <div class="delivery-time">
            <div class="text">平均配送时间</div>
            <div class="time">{{seller.deliveryTime}}<span>分钟</span></div>
          </div>
        </div>
        <div class="spit">
          <spit></spit>
        </div>
        <div class="bulletin">
          <h2 class="title">公告与活动</h2>
          <p class="introduce">{{seller.bulletin}}</p>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="item in seller.supports" v-bind:key="item.key">
              <span class="icon" :class="classMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
        </div>
        <div class="spit">
          <spit></spit>
        </div>
        <div class="exhibit">
          <h2 class="title">商家实景</h2>
          <div class="images-wrapper" ref="pic">
              <ul class="img-list" ref="list">
                <li v-for="img in seller.pics" :key="img.key" class="image">
                  <img :src="img" width="120" height="80">
                </li>
              </ul>
          </div>
        </div>
        <div class="spit">
          <spit></spit>
        </div>
        <div class="sellerInfo">
          <h2 class="title">商家信息</h2>
          <ul>
            <li class="info-list" v-for="item in seller.infos" :key="item.key">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import Star from '../star/Star.vue'
  import Spit from '../split/Split.vue'
  import BetterScroll from 'better-scroll'
  import {urlParse} from '../../common/js/urlParse'
//  import {saveToLocal, loadFromLocal} from '../../common/js/store'
  export default {
    mounted () {
      this.$http.get('/api/seller?id=' + this.seller.id)
        .then((res) => {
        this.favorite = JSON.parse(window.localStorage.getItem(this.seller.id || false))
          console.log(window.localStorage.getItem(this.seller.id))
          console.log(this.favorite)
          this.seller = Object.assign({}, this.seller, res.data.data)
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BetterScroll(this.$refs.sellerWrapper, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
          this.setWidth()
          if (!this.picScroll) {
            this.picScroll = new BetterScroll(this.$refs.pic, {
              scrollX: true,
              eventPassthrough: 'vertical'
            })
          } else {
            this.picScroll.refresh()
          }
        })
    },
    methods: {
      setWidth () {
        if (this.seller.pics) {
          let wid = 120
          let margin = 6
          let len = this.seller.pics.length
          let width = (wid + margin) * len - margin
          this.$refs.list.style.width = width + 'px'
        }
      },
      toggleFavorite () {
        if (!event._constructed) {
          return
        }
        this.favorite = !this.favorite
        window.localStorage.setItem(this.seller.id, JSON.stringify(this.favorite))
      }
    },
    components: {
      'star': Star,
      'spit': Spit
    },
    data () {
      return {
//        一个图片一个class
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        seller: {
          id: (() => {
            let queryParam = urlParse()
            return queryParam.id
          })()
        },
        favorite: false
      }
    },
    computed: {
      text () {
        return this.favorite ? '已收藏' : '收藏'
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .seller
    position absolute
    top 174px
    left 0
    bottom 0
    width 100%
    overflow hidden
    .info
      display flex
      margin 0 18px
      padding 18px 0
      border-1px(rgba(7, 17, 27, 0.1))
      .info-left
        flex 1
        .name
          font-size 14px
          color rgb(7, 17, 27)
          margin-bottom 8px
        .star-wrapper
          height 16px
          font-size 0
          .star
            display inline-block
            vertical-align top
          .ratingCount, .sellCount
            display inline-block
            line-height 16px
            font-size 10px
            color rgb(77, 85, 93)
            &.ratingCount
              margin 0 12px 0 8px
      .info-right
        flex 0 0 auto
        font-size 0
        width 50px
        .icon-favorite
          margin-left 8px
          padding 4px
          right 0
          font-size 24px
          color #d4d6d9
          &.active
            color rgb(240, 20, 20)
        .favorite
          margin-top 4px
          font-size 10px
          color rgb(77, 85, 93)
          text-align center
    .detail-price
      display flex
      margin 0 18px
      .min-price, .delivery-price, .delivery-time
        flex 1
        margin 18px 0
        text-align center
        &.delivery-price
          border-left 1px solid rgba(7, 17, 27, 0.1)
          border-right 1px solid rgba(7, 17, 27, 0.1)
        .text
          font-size 10px
          color rgb(147, 153, 159)
          margin-bottom 4px
        .price
          font-size 24px
          color rgb(7, 17, 27)
          font-weight 200
          span
            font-size 10px
            color rgb(147, 153, 159)
        .time
          font-size 24px
          color rgb(7, 17, 27)
          font-weight lighter
          span
            font-size 10px
            color rgb(147, 153, 159)
    .bulletin
      margin 18px 18px 16px 18px
      .title
        font-size 14px
        color rgb(7, 17, 27)
      .introduce
        padding 8px 0 12px 12px
        font-size 12px
        font-weight 200
        line-height 24px
        color rgb(240, 20, 20)
        border-1px(rgba(7, 17, 27, 0.1))
      .supports
        .support-item
          font-size 0
          padding 16px 12px
          margin-bottom 12px
          border-1px(rgba(7, 17, 27, 0.1))
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
            font-weight 200
            color rgb(7, 17, 27)
            padding 0 0
    .exhibit
      padding 18px
      overflow hidden
      .title
        font-size 14px
        color rgb(7, 17, 27)
        margin-bottom 12px
      .images-wrapper
        width 100%
        overflow hidden
        white-space nowrap
        .img-list
          font-size 0
          .image
            display inline-block
            margin-right 6px
            width 120px
            height 80px
            &:last-child
              margin-right 0
    .sellerInfo
      margin 18px
      .title
        padding-bottom 12px
        font-size 14px
        color rgb(7, 17, 27)
        border-1px(rgba(7, 17, 27, 0.1))
      ul
        .info-list
          padding 16px 12px
          font-size 12px
          font-weight 200
          line-height 16px
          color rgb(7, 17, 27)
          border-1px(rgba(7, 17, 27, 0.1))
  </style>
