import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '../views/DashboardView.vue'
import InventoryView from '../views/InventoryView.vue'
import AddItemView from '../views/AddItemView.vue'
import ShoppingView from '../views/ShoppingView.vue'
import SettingsView from '../views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory('/family-stock-app/'),
  routes: [
    { path: '/', name: 'dashboard', component: DashboardView },
    { path: '/inventory', name: 'inventory', component: InventoryView },
    { path: '/add', name: 'add-item', component: AddItemView },
    { path: '/shopping', name: 'shopping', component: ShoppingView },
    { path: '/settings', name: 'settings', component: SettingsView },
  ],
})

export default router