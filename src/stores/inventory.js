import { defineStore } from 'pinia'

const STORAGE_KEY = 'family-stock-items'
const LOG_KEY = 'family-stock-logs'

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    items: JSON.parse(localStorage.getItem(STORAGE_KEY)) || [],
    logs: JSON.parse(localStorage.getItem(LOG_KEY)) || [],
  }),

  getters: {
    totalItems: (state) => state.items.length,

    restockItems: (state) => {
      return state.items.filter(
        item => Number(item.quantity) <= Number(item.minStock)
      )
    },

    expiringItems: (state) => {
      const today = new Date()

      return state.items.filter((item) => {
        if (!item.expiryDate) return false
        const expiry = new Date(item.expiryDate)
        const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24))
        return diffDays >= 0 && diffDays <= 7
      })
    },

    monthlyExpense: (state) => {
      const now = new Date()
      const currentMonth = now.getMonth()
      const currentYear = now.getFullYear()

      return state.items
        .filter((item) => {
          if (!item.purchaseDate) return false
          const date = new Date(item.purchaseDate)
          return date.getMonth() === currentMonth && date.getFullYear() === currentYear
        })
        .reduce((sum, item) => sum + Number(item.price || 0), 0)
    },

    categorySummary: (state) => {
      const result = {}

      state.items.forEach((item) => {
        const category = item.category || '其他'
        result[category] = (result[category] || 0) + 1
      })

      return result
    },
  },

  actions: {
    save() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
    },

    saveLogs() {
      localStorage.setItem(LOG_KEY, JSON.stringify(this.logs))
    },

    addLog(type, item, detail = '') {
      this.logs.unshift({
        id: Date.now() + Math.random(),
        type,
        itemName: item.name || '未命名商品',
        category: item.category || '其他',
        price: Number(item.price || 0),
        quantity: Number(item.quantity || 0),
        unit: item.unit || '',
        date: new Date().toISOString(),
        purchaseDate: item.purchaseDate || '',
        detail,
      })

      this.saveLogs()
    },

    addItem(item) {
      const newItem = {
        id: Date.now(),
        ...item,
      }

      this.items.unshift(newItem)
      this.addLog('新增商品', newItem, `新增 ${newItem.quantity}${newItem.unit || ''}`)
      this.save()
    },

    increaseQuantity(id) {
      const item = this.items.find(item => item.id === id)
      if (!item) return

      item.quantity = Number(item.quantity) + 1
      this.addLog('增加庫存', item, `+1 ${item.unit || ''}`)
      this.save()
    },

    decreaseQuantity(id) {
      const item = this.items.find(item => item.id === id)
      if (!item) return

      item.quantity = Math.max(0, Number(item.quantity) - 1)
      this.addLog('減少庫存', item, `-1 ${item.unit || ''}`)
      this.save()
    },

    updateItem(id, updatedItem) {
      const index = this.items.findIndex(item => item.id === id)
      if (index === -1) return

      this.items[index] = {
        ...this.items[index],
        ...updatedItem,
      }

      this.addLog('編輯商品', this.items[index], '修改商品資料')
      this.save()
    },

    deleteItem(id) {
      const item = this.items.find(item => item.id === id)
      if (!item) return

      this.addLog('刪除商品', item, '商品已從庫存刪除')
      this.items = this.items.filter(item => item.id !== id)
      this.save()
    },
  },
})