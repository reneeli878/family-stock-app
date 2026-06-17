<template>
  <section class="page">
    <div class="page-title-row">
      <div>
        <h2>操作紀錄</h2>
        <p>新增、編輯、加減、刪除都會記在這裡</p>
      </div>
    </div>

    <div class="note-card">
      目前紀錄數：{{ inventory.logs.length }}
    </div>

    <div v-if="inventory.logs.length === 0" class="empty">
      目前還沒有任何紀錄，先新增商品或按庫存 + / -。
    </div>

    <div v-else class="mini-list">
      <div
        v-for="log in inventory.logs"
        :key="log.id"
        class="record-card pop-card"
      >
        <div>
          <strong>{{ getTypeIcon(log.type) }} {{ log.itemName }}</strong>
          <p>{{ log.type }}｜{{ log.detail }}</p>
          <p>{{ formatDate(log.date) }}</p>
        </div>

        <div class="record-price">
          ${{ log.price || 0 }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useInventoryStore } from '../stores/inventory'

const inventory = useInventoryStore()

function getTypeIcon(type) {
  const icons = {
    新增商品: '🆕',
    增加庫存: '➕',
    減少庫存: '➖',
    編輯商品: '✏️',
    刪除商品: '🗑️',
  }

  return icons[type] || '🧾'
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleString('zh-TW', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>