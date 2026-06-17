<template>
  <section class="page dashboard-page">
    <div class="welcome-card">
      <div class="mascot">🐹</div>

      <div class="welcome-content">
        <h2>歡迎回來</h2>
        <p>{{ todayText }}</p>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="icon">📦</div>
        <div>
          <div class="value">{{ inventory.totalItems }}</div>
          <div class="label">總庫存</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="icon">💰</div>
        <div>
          <div class="value">${{ inventory.monthlyExpense }}</div>
          <div class="label">本月支出</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="icon">⚠️</div>
        <div>
          <div class="value">{{ inventory.expiringItems.length }}</div>
          <div class="label">即將過期</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="icon">🛒</div>
        <div>
          <div class="value">{{ inventory.restockItems.length }}</div>
          <div class="label">待補貨</div>
        </div>
      </div>
    </div>

    <h3>🐹 倉庫小精靈提醒</h3>

    <div class="note-card">
      <template v-if="inventory.restockItems.length">
        <strong>{{ inventory.restockItems[0].name }}</strong>
        <p>快要補貨囉，補給線正在閃燈。</p>
      </template>

      <template v-else-if="inventory.expiringItems.length">
        <strong>{{ inventory.expiringItems[0].name }}</strong>
        <p>快到期了，冰箱日曆在敲鈴。</p>
      </template>

      <template v-else>
        <strong>庫存狀況良好</strong>
        <p>今天的小倉庫很安靜。</p>
      </template>
    </div>

    <h3>⚠️ 即將過期</h3>

    <div v-if="inventory.expiringItems.length === 0" class="empty">
      目前沒有即將過期的商品。
    </div>

    <div v-else class="mini-list">
      <div
        v-for="item in inventory.expiringItems.slice(0, 3)"
        :key="item.id"
        class="mini-card"
      >
        <strong>{{ item.name }}</strong>
        <span>{{ item.expiryDate }}</span>
      </div>
    </div>

    <h3>🛒 待補貨</h3>

    <div v-if="inventory.restockItems.length === 0" class="empty">
      目前沒有需要補貨的商品。
    </div>

    <div v-else class="mini-list">
      <div
        v-for="item in inventory.restockItems.slice(0, 3)"
        :key="item.id"
        class="mini-card"
      >
        <strong>{{ item.name }}</strong>
        <span>{{ item.quantity }} {{ item.unit }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useInventoryStore } from '../stores/inventory'

const inventory = useInventoryStore()

const todayText = new Date().toLocaleDateString('zh-TW', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})
</script>