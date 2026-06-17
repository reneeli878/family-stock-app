import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '../views/DashboardView.vue'
import InventoryView from '../views/InventoryView.vue'
import AddItemView from '../views/AddItemView.vue'
import ShoppingView from '../views/ShoppingView.vue'
import SettingsView from '../views/SettingsView.vue'
import EditItemView from '../views/EditItemView.vue'
import RecordsView from '../views/RecordsView.vue'

const router = createRouter({
  history: createWebHistory('/family-stock-app/'),
  routes: [
    { path: '/', name: 'dashboard', component: DashboardView },
    { path: '/inventory', name: 'inventory', component: InventoryView },
    { path: '/add', name: 'add-item', component: AddItemView },
    { path: '/shopping', name: 'shopping', component: ShoppingView },
    { path: '/settings', name: 'settings', component: SettingsView },
    { path: '/edit/:id', name: 'edit-item', component: EditItemView },
    { path: '/records', name: 'records', component: RecordsView },
  ],
})

export default router