<template>
    <div class="cart-control">
      <transition name="move">
        <div class="cart-decrease" v-show="item.count > 0" @click.stop.prevent="decreaseCount($event)">
          <span class="inner">
            <i class="icon-remove_circle_outline"></i>
          </span>
        </div>
      </transition>
      <div class="cart-count" v-show="item.count > 0">{{item.count}}</div>
      <div class="cart-add" v-on:click.stop.prevent="addCount($event)">
        <i class="icon-add_circle"></i>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  export default {
    props: {
      item: {
        type: Object
      }
    },
    methods: {
      addCount (event) {
        if (!event._constructed) {
          return
        }
        if (!this.item.count) {
          Vue.set(this.item, 'count', 1)
        } else {
          this.item.count++
        }
      },
      decreaseCount (event) {
        if (!event._constructed) {
          return
        }
          if (this.item.count > 0) {
            this.item.count--
          }
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cart-control
    font-size 0
    .cart-decrease, .cart-add
      display inline-block
      padding 6px
      line-height 21px
      font-size 24px
      color rgb(0, 160, 220)
    .cart-decrease
      .inner
        display inline-block
        height 24px
        transition all 0.3s linear
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(24px)
        .inner
          transform rotate(180deg)
      &.move-enter-active, &.move-leave-active
        transition all 0.3s linear
  .cart-count
    display inline-block
    width 12px
    vertical-align top
    padding-top 6px
    text-align center
    font-size 10px
    color rgb(147, 153, 159)
    line-height 24px
</style>
