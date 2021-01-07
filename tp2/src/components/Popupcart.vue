<!--Component to create a window popup regarding the itens existing on the shopping cart-->
<template>
  <div class="box">
    <span v-if="(shoppingCart) == null">Sem produtos</span>
    <div v-for="x in shoppingCart"  :key="x.idShow" class="box-item">
      <!--<img :src="product.image" alt="" class="item-thumb">-->
      <h3 class="item-name">{{ x.idShow }}</h3>
      <span class="item-amount">{{ x.quantity}}</span>
      <span class="item-price">{{ x.subtotal }} €</span>
    </div>
    <!--<div class="cart-info" v-if="hasProduct()">
      <span>Total: R$ {{ totalPrice() }}, 00</span>
      <router-link to="/checkout">
        <btn btnColor="btn btn-small btn-info"
          @click.native="showPopupCart()">
          View cart
        </btn>
      </router-link>
    </div>-->
  </div>
</template>

<script>
//Imports getter and actions from the vuex store
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    
  },
  methods: {
  },
  computed: {
    ...mapGetters({
      shoppingCart: 'cart/getPurchaseLine'
    }),
  },
};
</script>

<style scoped>
  .box {
    width: 400px;
    height: auto;
    background-color: #FAFAFA;
    box-shadow: 0px 0px 10px rgba(73, 74, 78, 0.1);
    border-radius: 5px;
    box-sizing: border-box;
    padding: 1em .5em;
    position: absolute;
    z-index: 1;
  }

  .box:after {
    content: '';
    width: 30px;
    height: 30px;
    transform: rotate(45deg);
    background: inherit;
    position: absolute;
    top: -15px;
    right: 15px;
  }

  .box-item {
    width: 100%;
    height: 130px;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 3px;
    padding: 0 .5em;
    margin-top: .3em;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }

  .item-thumb {
    max-width: 70%;
    grid-column: 1/2;
    grid-row: 1/4;
    align-self: center;
  }

  .item-name {
    grid-column: 2/4;
    grid-row: 1/2;
    font-weight: normal;
  }

  .item-amount {
    grid-column: 2/3;
    grid-row: 2/4;
    color: #ddd;
  }

  .cart-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

</style>
