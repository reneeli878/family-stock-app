<template>
  <section class="page inventory-page">
    <div class="page-title-row">
      <div>
        <h2>庫存清單</h2>
        <p>翻翻家裡的小補給本</p>
      </div>

      <button class="quick-add-btn" @click="router.push('/add')">
        ＋
      </button>
    </div>

    <input
      v-model="keyword"
      class="search-input"
      placeholder="🔍 搜尋商品..."
    />

    <div class="filter-tabs">
      <button
        v-for="category in categories"
        :key="category"
        :class="{ active: selectedCategory === category }"
        @click="selectedCategory = category"
      >
        {{ getCategoryIcon(category) }} {{ category }}
      </button>
    </div>

    <div v-if="filteredItems.length === 0" class="empty">
      沒有找到商品，倉庫小精靈翻不到這一頁。
    </div>

    <article
      v-for="item in filteredItems"
      :key="item.id"
      class="inventory-card sticker-card"
    >
      <button
        class="card-edit-btn"
        @click="router.push(`/edit/${item.id}`)"
      >
        ✏️
      </button>

      <div class="item-heading">
        <div class="item-icon">
          {{ getCategoryIcon(item.category) }}
        </div>

        <div>
          <strong>{{ item.name }}</strong>
          <p class="item-category">
            🏷️ {{ item.category || '其他' }}
          </p>
        </div>
      </div>

      <div class="info-grid">
        <div class="info-chip">
          <span>📍</span>
          <p>{{ item.room || '未設定' }} > {{ item.location || '未填位置' }}</p>
        </div>

        <div class="info-chip">
          <span>💰</span>
          <p>${{ item.price || 0 }}</p>
        </div>

        <div class="info-chip">
          <span>📅</span>
          <p>{{ item.purchaseDate || '未填購買日' }}</p>
        </div>

        <div class="info-chip">
          <span>📦</span>
          <p>最低 {{ item.minStock || 0 }} {{ item.unit }}</p>
        </div>
      </div>

      <div
        v-if="item.expiryDate"
        class="expiry-strip"
        :class="expiryClass(item.expiryDate)"
      >
        <span>到期 {{ item.expiryDate }}</span>
        <strong>{{ getExpiryText(item.expiryDate) }}</strong>
      </div>

      <div v-else class="expiry-strip no-expiry">
        <span>效期</span>
        <strong>未設定</strong>
      </div>

      <div class="quantity-control">
        <button @click="inventory.decreaseQuantity(item.id)">
          −
        </button>

        <div class="quantity-badge">
          <strong>{{ item.quantity }}</strong>
          <span>{{ item.unit || '個' }}</span>
        </div>

        <button @click="inventory.increaseQuantity(item.id)">
          +
        </button>
      </div>

      <button
        class="delete-text-btn"
        @click="confirmDelete(item)"
      >
        🗑️ 刪除商品
      </button>
    </article>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useInventoryStore } from '../stores/inventory'

const router = useRouter()
const inventory = useInventoryStore()

const keyword = ref('')
const selectedCategory = ref('全部')

const categories = computed(() => {
  return [
    '全部',
    ...new Set(
      inventory.items.map(item => item.category || '其他')
    ),
  ]
})

const filteredItems = computed(() => {
  return inventory.items.filter(item => {
    const matchKeyword =
      item.name
        ?.toLowerCase()
        .includes(keyword.value.toLowerCase())

    const matchCategory =
      selectedCategory.value === '全部' ||
      item.category === selectedCategory.value

    return matchKeyword && matchCategory
  })
})

function getCategoryIcon(category) {
  const icons = {
    全部: '📒',
    食品: '🥫',
    冷藏: '🧊',
    冷凍: '❄️',
    日用品: '🧻',
    清潔用品: '🧴',
    保健品: '💊',
    藥品: '🩹',
    寵物用品: '🐾',
    其他: '📦',
  }

  return icons[category] || '📦'
}

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

function confirmDelete(item) {
  const ok = confirm(`確定要刪除「${item.name}」嗎？這個動作不能復原。`)

  if (!ok) return

  inventory.deleteItem(item.id)
}
</script>