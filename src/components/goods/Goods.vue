<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu">
      <ul>
        <li v-for="(item, index) in goods" :key="item.key" class="menu-item"
            v-on:click="setIndex(index, $event)" :class="{'current':currentIndex===index}">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="food">
      <ul>
        <li v-for="food in goods" :key="food.key" class="food-list">
          <h1 class="title borderLeft-1px">{{food.name}}</h1>
          <ul>
            <li @click="selectFood(item, $event)" v-for="item in food.foods" :key="item.key" class="item-list">
              <div class="icon">
                <img :src="item.icon" width="57" height="57">
              </div>
              <div class="content-wrapper">
                <h1 class="name">{{item.name}}</h1>
                <p class="description">
                  {{item.description}}
                </p>
                <div class="rating">
                  <span class="monthSell">月售{{item.sellCount}}份</span>
                  <span>好评率{{item.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{item.price}}</span>
                  <span class="old" v-show="item.oldPrice">￥{{item.oldPrice}}</span>
                </div>
                <div class="cartControl-wrapper">
                  <cartcontrol :item="item"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :selectGoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
    <food :food="selectedFood" ref="foodDetail"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import ShopCart from '../shopcart/ShopCart.vue'
  import CartControl from '../cartControl/CartControl.vue'
  import Food from '../food/Food.vue'
  const ERR_OK = 0
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      'shopcart': ShopCart,
      'cartcontrol': CartControl,
      'food': Food
    },
    data () {
      return {
        goods: [],
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        heightList: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    created () {
      this.$http.get('/api/goods')
        .then(function (response) {
          if (response.data.errno === ERR_OK) {
            this.goods = response.data.data
            this.$nextTick(() => {
              this._initScroll()
              this._calculateHeight()
            })
          }
        })
    },
    computed: {
      currentIndex () {
        for (let i = 0, len = this.heightList.length; i < len; i++) {
          let height1 = this.heightList[i]
          let height2 = this.heightList[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods () {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count > 0) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    methods: {
      setIndex (index, event) {
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.food.getElementsByClassName('food-list')
        let el = foodList[index]
        this.foodScroll.scrollToElement(el, 200)
      },
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menu, {
          click: true
        })
        this.foodScroll = new BScroll(this.$refs.food, {
          click: true,
          probeType: 3
        })
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight () {
        let foodList = this.$refs.food.getElementsByClassName('food-list')
        let height = 0
        this.heightList.push(height)
        for (var i = 0, len = foodList.length; i < len; i++) {
          let item = foodList[i].clientHeight
          height += item
          this.heightList.push(height)
        }
      },
      selectFood (food, event) {
        if (!event._constructed) {
          return
        }
        this.selectedFood = food
        this.$refs.foodDetail.show()
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
.goods
  display flex
  position absolute
  width 100%
  top 174px
  bottom 46px
  overflow hidden
  .menu-wrapper
    flex 0 0 80px
    width 80px
    background #f3f5f7
    overflow hidden
    .menu-item
      display table
      padding 0 12px
      width 56px
      height 54px
      font-size 0
      line-height 14px
      &.current
        position relative
        z-index 10
        margin-top -1px
        background-color #fff
        font-weight 700
        .text
          border-none()
      .icon
        display inline-block
        vertical-align top
        width 12px
        height 12px
        margin-right 2px
        background-size 12px 12px
        &.decrease
          bg-image('decrease_3')
        &.discount
          bg-image('discount_3')
        &.guarantee
          bg-image('guarantee_3')
        &.invoice
          bg-image('invoice_3')
        &.special
          bg-image('special_3')
      .text
        display table-cell
        vertical-align middle
        text-align center
        font-size 12px
        border-1px(rgba(7, 17, 27, 0.1))
  .foods-wrapper
    flex 1
    .title
      padding-left 14px
      height 26px
      font-size 12px
      line-height 26px
      color rgb(147, 153, 159)
      border-left 2px solid #d9dde1
      background-color #f3f5f7
    .item-list
      display flex
      margin 18px
      border-1px(rgba(7, 17, 27, 0.1))
      padding-bottom 18px
      &:last-child
        border-none()
        margin-bottom 0
      .icon
        flex 0 0 57px
        margin-right 10px
      .content-wrapper
        position relative
        flex 1
        padding-top 2px
        .name
          font-size 14px
          line-height 1
          color rgb(7, 17, 27)
        .description
          font-size 10px
          line-height 1
          color rgb(147, 153, 157)
          margin 8px 0
        .rating
          font-size 0
          span
            font-size 10px
            line-height 1
            color rgb(147, 153, 157)
          .monthSell
            margin-right 12px
        .price
          margin 8px 8px 0 0
          line-height 24px
          .now
            font-size 14px
            font-weight 700
            color rgb(240, 20, 20)
          .old
            font-size 10px
            text-decoration line-through
            color rgb(147, 153, 159)
        .cartControl-wrapper
          position absolute
          right 0
          bottom 0
</style>
