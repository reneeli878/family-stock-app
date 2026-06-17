<template>
  <section class="page">
    <h2>採買清單</h2>

    <div v-if="inventory.restockItems.length === 0" class="empty">
      目前沒有需要補貨的商品，倉庫小精靈很安靜。
    </div>

    <div
      v-for="item in inventory.restockItems"
      :key="item.id"
      class="card"
    >
      <strong>{{ item.name }}</strong>

      <p>{{ item.category }}｜{{ item.room }} > {{ item.location || '未填位置' }}</p>
      <p>目前：{{ item.quantity }} {{ item.unit }}</p>
      <p>最低庫存：{{ item.minStock }} {{ item.unit }}</p>

      <div class="actions">
        <button @click="inventory.increaseQuantity(item.id)">
          已補貨 +1
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useInventoryStore } from '../stores/inventory'

const inventory = useInventoryStore()
</script>