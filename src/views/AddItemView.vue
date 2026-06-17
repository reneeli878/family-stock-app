<template>
  <section class="page">
    <h2>新增商品</h2>

        <form @submit.prevent="addItem" class="form">
    <label>
        <span>商品名稱</span>
        <input v-model="form.name" placeholder="例如：鮮奶、衛生紙" required />
    </label>

    <label>
        <span>分類</span>
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
    </label>

    <label>
        <span>房間</span>
        <select v-model="form.room">
        <option>廚房</option>
        <option>浴室</option>
        <option>儲藏室</option>
        <option>客廳</option>
        <option>臥室</option>
        <option>其他</option>
        </select>
    </label>

    <label>
        <span>位置</span>
        <input v-model="form.location" placeholder="例如：冰箱、A架、抽屜" />
    </label>

    <label>
        <span>數量</span>
        <input v-model.number="form.quantity" type="number" placeholder="例如：2" required />
    </label>

    <label>
        <span>單位</span>
        <input v-model="form.unit" placeholder="例如：包、瓶、盒" />
    </label>

    <label>
        <span>購買金額</span>
        <input v-model.number="form.price" type="number" placeholder="例如：399" />
    </label>

    <label>
        <span>購買日期</span>
        <input v-model="form.purchaseDate" type="date" />
    </label>

    <label>
        <span>有效期限</span>
        <input v-model="form.expiryDate" type="date" />
    </label>

    <label>
        <span>最低庫存</span>
        <input v-model.number="form.minStock" type="number" placeholder="例如：1" />
    </label>

    <label>
        <span>備註</span>
        <textarea v-model="form.note" placeholder="例如：全聯購入、買一送一"></textarea>
    </label>

    <button type="submit">新增商品</button>
    </form>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useInventoryStore } from '../stores/inventory'

const router = useRouter()
const inventory = useInventoryStore()

const today = new Date().toISOString().slice(0, 10)

const form = reactive({
  name: '',
  category: '食品',
  room: '廚房',
  location: '',
  quantity: 1,
  unit: '',
  price: 0,
  purchaseDate: today,
  expiryDate: '',
  minStock: 1,
  note: ''
})

function addItem() {
  inventory.addItem({ ...form })

  form.name = ''
  form.category = '食品'
  form.room = '廚房'
  form.location = ''
  form.quantity = 1
  form.unit = ''
  form.price = 0
  form.purchaseDate = today
  form.expiryDate = ''
  form.minStock = 1
  form.note = ''

  router.push('/inventory')
}
</script>