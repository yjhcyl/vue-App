<template>
  <div class="shopcart-wrapper">
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="shopcart-left">
          <div class="cart-wrapper">
            <div class="cart" :class="{'highLight':selectCount>0}">
              <i class="icon icon-shopping_cart" :class="{'highLight':selectCount>0}"></i>
            </div>
            <div class="num" v-show="selectCount > 0">{{selectCount}}</div>
          </div>
          <div class="price" :class="{'highLight':selectCount>0}">￥{{selectPrice}}</div>
          <div class="desc">另需要配送费{{deliveryPrice}}元</div>
        </div>
        <div class="shopcart-right" :class="{'highLight':selectPrice >= 20}" @click.stop.prevent="pay">{{sendPrice}}</div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow()">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="deleteCart">清空</span>
          </div>
          <div class="list-content" ref="scoll">
            <ul>
              <li v-for="good in selectGoods" class="food" :key="good.key">
                <span class="name">{{good.name}}</span>
                <div class="price">
                  <span>￥{{good.price * good.count}}</span>
                </div>
                <div class="cartControl-wrapper">
                  <cartcontrol :item="good"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow()" @click="hideList"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import CartControl from '../cartControl/CartControl.vue'
  import BScroll from 'better-scroll'
  export default {
    components: {
      'cartcontrol': CartControl
    },
    data () {
      return {
        balls: [
          {
            show: false, el: null
          },
          {
            show: false, el: null
          },
          {
            show: false, el: null
          },
          {
            show: false, el: null
          },
          {
            show: false, el: null
          }
        ],
        droppedBalls: [],
        fold: true
      }
    },
    props: {
      selectGoods: {
        type: Array,
        default () {
          return [
            {
              price: 10,
              count: 1
            }
          ]
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    methods: {
      pay () {
        if (this.selectPrice < this.minPrice) {
          return false
        } else {
          window.alert('支付' + this.selectPrice + '元')
        }
      },
      hideList () {
        this.fold = true
      },
      deleteCart () {
        this.selectGoods.forEach((food) => {
          food.count = 0
        })
      },
      toggleList () {
        if (!this.selectCount) {
          return
        }
        this.fold = !this.fold
      },
      listShow () {
        if (!this.selectCount) {
          this.fold = true
          return false
        }
//        折叠小窗显示
        if (!this.fold) {
          this.$nextTick(() => {
//            如果实例化scoll已经存在则调用refresh方法
            if (!this.scoll) {
              this.scoll = new BScroll(this.$refs.scoll, {
                click: true
              })
            } else {
              this.scoll.refresh()
            }
          })
        }
        return !this.fold
      }
    },
    computed: {
      selectPrice () {
        let price = 0
        this.selectGoods.forEach((food) => {
          price += food.price * food.count
        })
        return price
      },
      selectCount () {
        let count = 0
        this.selectGoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      sendPrice () {
        let price = 0
        this.selectGoods.forEach((food) => {
          price += food.price * food.count
        })
        if (price < 20 && price > 0) {
          let margin = 20 - price
          return '还差' + margin + '元起送'
        } else if (price === 0) {
          return '￥20元起送'
        } else {
          return '去结算'
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
.shopcart
  position fixed
  left 0
  bottom 0
  z-index 300
  height 48px
  width 100%
  .content
    display flex
    overflow visible
    background-color #141d27
    font-size 0
    .shopcart-left
      flex 1
      .cart-wrapper
        display inline-block
        position relative
        top -10px
        margin 0 12px
        padding 6px
        width 56px
        height 56px
        border-radius 50px
        background-color #141d27
        box-sizing border-box
        .num
          position absolute
          top 0
          right 0
          width 24px
          height 16px
          text-align center
          border-radius 12px
          background-color rgb(240, 20, 20)
          font-size 9px
          line-height 16px
          color #fff
          box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .cart
          display table
          width 100%
          height 100%
          border-radius 50%
          background-color #2b343c
          text-align center
          &.highLight
            background-color rgb(0, 160, 220)
          .icon
            display table-cell
            width 100%
            height 100%
            vertical-align middle
            font-size 24px
            color #80858a
            &.highLight
              color #fff
      .price
        display inline-block
        vertical-align top
        margin-top 12px
        line-height 24px
        padding-right 12px
        box-sizing border-box
        border-right 1px solid rgba(255, 255, 255, 0.4)
        font-size 16px
        font-weight 700
        color rgba(255, 255, 255, 0.4)
        &.highLight
          color #fff
      .desc
        display inline-block
        vertical-align top
        margin 18px 0 0 12px
        font-size 10px
        color rgba(255, 255, 255, 0.4)
    .shopcart-right
      flex 0 0 105px
      width 105px
      text-align center
      font-size 12px
      font-weight 700
      line-height 48px
      color rgba(255, 255, 255, 0.4)
      background-color #2b333b
      &.highLight
        background-color #00b43c
        color #fff
  .shopcart-list
    position absolute
    top 0
    left 0
    z-index -1
    width 100%
    transform translate3d(0, -100%, 0)
    &.fold-enter, &.fold-leave-to
      transform translate3d(0, 0, 0)
    &.fold-enter-to
      transform translate3d(0, -100%, 0)
    &.fold-enter-active, &.fold-leave-active
      transition all 0.5s
    .list-header
      height 40px
      padding 0 18px
      line-height 40px
      background-color #f3f5f7
      border-bottom 2px solid rgba(7, 17, 27, 0.1)
      .title
        float left
        font-size 14px
        color rgb(7, 17, 27)
      .empty
        float right
        font-size 12px
        color rgb(0, 160, 220)
    .list-content
      padding 0 18px
      max-height 217px
      overflow hidden
      background-color #fff
      .food
        position relative
        padding 12px 0
        box-sizing border-box
        border-1px(rgba(7, 17, 27, 0.1))
        .name
          line-height 24px
          font-size 14px
          color rgb(7, 17, 27)
        .price
          position absolute
          right 90px
          bottom 12px
          line-height 24px
          font-size 14px
          font-weight 700
          color rgb(240, 20, 20)
        .cartControl-wrapper
          position absolute
          right 0
          bottom 6px
.list-mask
  position fixed
  top 0
  right 0
  z-index 40
  width 100%
  height 100%
  background-color rgba(7, 17, 27,0.6)
  &.fade-enter, &.fade-leave-to
    opacity 0
  &.fade-enter-active, &.fade-leave-active
    transition all 0.3s
</style>
