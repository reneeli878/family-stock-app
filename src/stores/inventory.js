import { defineStore } from 'pinia'

const STORAGE_KEY = 'family-stock-items'

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    items: JSON.parse(localStorage.getItem(STORAGE_KEY)) || [],
  }),

  getters: {
    totalItems: (state) => state.items.length,

    lowStockItems: (state) => {
      return state.items.filter(
        item => Number(item.quantity) <= Number(item.minStock)
      )
    },

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

          return (
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear
          )
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

    addItem(item) {
      this.items.unshift({
        id: Date.now(),
        ...item,
      })
      this.save()
    },

    increaseQuantity(id) {
      const item = this.items.find(item => item.id === id)
      if (!item) return
      item.quantity = Number(item.quantity) + 1
      this.save()
    },

    decreaseQuantity(id) {
      const item = this.items.find(item => item.id === id)
      if (!item) return
      item.quantity = Math.max(0, Number(item.quantity) - 1)
      this.save()
    },

    deleteItem(id) {
      this.items = this.items.filter(item => item.id !== id)
      this.save()
    },
  },
})