<template>
  <section class="page">
    <h2>庫存清單</h2>

    <div v-if="inventory.items.length === 0" class="empty">
      目前還沒有庫存，先去新增商品。
    </div>

    <div
      v-for="item in inventory.items"
      :key="item.id"
      class="card"
    >
      <strong>{{ item.name }}</strong>

      <p>{{ item.category }}｜{{ item.location }}</p>
      <p>{{ item.quantity }} {{ item.unit }}</p>
      <p>金額：${{ item.price || 0 }}</p>

      <div class="actions">
        <button @click="inventory.decreaseQuantity(item.id)">-</button>
        <button @click="inventory.increaseQuantity(item.id)">+</button>
        <button @click="inventory.deleteItem(item.id)">刪除</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useInventoryStore } from '../stores/inventory'

const inventory = useInventoryStore()
</script>