<template>
  <section class="page">
    <h2>庫存清單</h2>

    <input
      v-model="keyword"
      class="search-input"
      placeholder="搜尋商品..."
    />

    <div class="filter-tabs">
      <button
        v-for="category in categories"
        :key="category"
        :class="{ active: selectedCategory === category }"
        @click="selectedCategory = category"
      >
        {{ category }}
      </button>
    </div>

    <div v-if="filteredItems.length === 0" class="empty">
      沒有找到商品，倉庫雷達暫時安靜。
    </div>

    <div
      v-for="item in filteredItems"
      :key="item.id"
      class="inventory-card"
    >
      <div class="card-top">
        <div>
          <strong>{{ item.name }}</strong>
          <p>{{ item.category }}｜{{ item.room || '未填房間' }} > {{ item.location || '未填位置' }}</p>
        </div>

        <span class="price">${{ item.price || 0 }}</span>
      </div>

      <div class="quantity-row">
        <button @click="inventory.decreaseQuantity(item.id)">-</button>
        <span>{{ item.quantity }} {{ item.unit }}</span>
        <button @click="inventory.increaseQuantity(item.id)">+</button>
      </div>

      <div class="detail-row">
        <span>購買：{{ item.purchaseDate || '未填' }}</span>
        <span
            v-if="item.expiryDate"
            :class="expiryClass(item.expiryDate)"
            >
            {{ getExpiryText(item.expiryDate) }}
            </span>

            <span v-else>
            無效期
            </span>
      </div>

      <button class="delete-btn" @click="inventory.deleteItem(item.id)">
        刪除
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useInventoryStore } from '../stores/inventory'

const inventory = useInventoryStore()

const keyword = ref('')
const selectedCategory = ref('全部')

const categories = computed(() => {
  return ['全部', ...new Set(inventory.items.map(item => item.category || '其他'))]
})

const filteredItems = computed(() => {
  return inventory.items.filter((item) => {
    const matchKeyword = item.name
      .toLowerCase()
      .includes(keyword.value.toLowerCase())

    const matchCategory =
      selectedCategory.value === '全部' ||
      item.category === selectedCategory.value

    return matchKeyword && matchCategory
  })
})

function getRemainingDays(expiryDate) {
  const today = new Date()
  const expiry = new Date(expiryDate)

  return Math.ceil(
    (expiry - today) /
    (1000 * 60 * 60 * 24)
  )
}

function getExpiryText(expiryDate) {
  const days = getRemainingDays(expiryDate)

  if (days < 0) {
    return `已過期 ${Math.abs(days)} 天`
  }

  return `剩餘 ${days} 天`
}

function expiryClass(expiryDate) {
  const days = getRemainingDays(expiryDate)

  if (days < 0) return 'expired'
  if (days <= 7) return 'danger'
  if (days <= 30) return 'warning'

  return 'safe'
}
</script>

<style scoped>
.search-input {
  width: 100%;
  padding: 14px;
  border: 1px solid #ddd;
  border-radius: 14px;
  margin: 12px 0;
  font-size: 16px;
}

.filter-tabs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  margin-bottom: 16px;
}

.filter-tabs button {
  border: none;
  border-radius: 999px;
  padding: 8px 14px;
  background: #eee;
  white-space: nowrap;
}

.filter-tabs button.active {
  background: #222;
  color: white;
}

.inventory-card {
  background: white;
  border-radius: 18px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.card-top {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.card-top p {
  margin: 6px 0 0;
  color: #666;
  font-size: 14px;
}

.price {
  font-weight: bold;
}

.quantity-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  margin: 16px 0;
}

.quantity-row button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  font-size: 20px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  font-size: 13px;
  color: #666;
}

.delete-btn {
  width: 100%;
  margin-top: 12px;
  border: none;
  border-radius: 12px;
  padding: 10px;
  background: #ffecec;
  color: #d33;
}

.safe {
  color: #16a34a;
  font-weight: bold;
}

.warning {
  color: #d97706;
  font-weight: bold;
}

.danger {
  color: #dc2626;
  font-weight: bold;
}

.expired {
  color: white;
  background: #dc2626;
  padding: 4px 8px;
  border-radius: 8px;
  font-weight: bold;
}
</style>