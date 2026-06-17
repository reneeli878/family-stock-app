<template>
  <section class="page">
    <h2>編輯商品</h2>

    <div v-if="!item" class="empty">
      找不到這個商品。
    </div>

    <form v-else @submit.prevent="saveItem" class="form">
      <input v-model="form.name" placeholder="商品名稱" required />

      <select v-model="form.category">
        <option>食品</option>
        <option>冷藏</option>
        <option>冷凍</option>
        <option>日用品</option>
        <option>清潔用品</option>
        <option>保健品</option>
        <option>藥品</option>
        <option>寵物用品</option>
        <option>其他</option>
      </select>

      <select v-model="form.room">
        <option>廚房</option>
        <option>浴室</option>
        <option>儲藏室</option>
        <option>客廳</option>
        <option>臥室</option>
        <option>其他</option>
      </select>

      <input v-model="form.location" placeholder="位置，例如：冰箱、A架、抽屜" />

      <input v-model.number="form.quantity" type="number" placeholder="數量" required />

      <input v-model="form.unit" placeholder="單位，例如：包、瓶、盒" />

      <input v-model.number="form.price" type="number" placeholder="購買金額" />

      <input v-model="form.purchaseDate" type="date" />

      <input v-model="form.expiryDate" type="date" />

      <input v-model.number="form.minStock" type="number" placeholder="最低庫存" />

      <textarea v-model="form.note" placeholder="備註"></textarea>

      <button type="submit">儲存修改</button>
    </form>
  </section>
</template>

<script setup>
import { computed, reactive, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useInventoryStore } from '../stores/inventory'

const route = useRoute()
const router = useRouter()
const inventory = useInventoryStore()

const itemId = Number(route.params.id)

const item = computed(() => {
  return inventory.items.find(item => item.id === itemId)
})

const form = reactive({
  name: '',
  category: '食品',
  room: '廚房',
  location: '',
  quantity: 1,
  unit: '',
  price: 0,
  purchaseDate: '',
  expiryDate: '',
  minStock: 1,
  note: '',
})

watchEffect(() => {
  if (!item.value) return

  form.name = item.value.name || ''
  form.category = item.value.category || '食品'
  form.room = item.value.room || '廚房'
  form.location = item.value.location || ''
  form.quantity = item.value.quantity || 1
  form.unit = item.value.unit || ''
  form.price = item.value.price || 0
  form.purchaseDate = item.value.purchaseDate || ''
  form.expiryDate = item.value.expiryDate || ''
  form.minStock = item.value.minStock || 1
  form.note = item.value.note || ''
})

function saveItem() {
  inventory.updateItem(itemId, { ...form })
  router.push('/inventory')
}
</script>