<template>
  <section class="page">
    <h2>家庭庫存儀表板</h2>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="icon">📦</div>
        <div class="value">{{ inventory.totalItems }}</div>
        <div class="label">總庫存</div>
      </div>

      <div class="stat-card">
        <div class="icon">⚠️</div>
        <div class="value">{{ inventory.expiringItems.length }}</div>
        <div class="label">即將過期</div>
      </div>

      <div class="stat-card">
        <div class="icon">🛒</div>
        <div class="value">{{ inventory.restockItems.length }}</div>
        <div class="label">待補貨</div>
      </div>

      <div class="stat-card">
        <div class="icon">💰</div>
        <div class="value">${{ inventory.monthlyExpense }}</div>
        <div class="label">本月支出</div>
      </div>
    </div>

    <h3>分類統計</h3>

    <div v-if="Object.keys(inventory.categorySummary).length === 0" class="empty">
      還沒有資料，先新增第一個商品。
    </div>

    <div v-else class="category-list">
      <div
        v-for="(count, category) in inventory.categorySummary"
        :key="category"
        class="category-item"
      >
        <span>{{ category }}</span>
        <strong>{{ count }}</strong>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useInventoryStore } from '../stores/inventory'

const inventory = useInventoryStore()
</script>