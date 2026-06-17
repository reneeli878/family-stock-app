<template>
  <div class="app-shell">
    <header class="app-header">
      <div>
        <p class="eyebrow">Family Stock</p>
        <h1>家庭庫存</h1>
        <p>管理庫存、效期與生活開銷</p>
      </div>

      <div class="header-badge">
        📦
      </div>
    </header>

    <main class="app-main">
      <RouterView />
    </main>

    <nav class="bottom-nav">
      <RouterLink to="/">🏠<span>首頁</span></RouterLink>
      <RouterLink to="/inventory">📦<span>庫存</span></RouterLink>
      <RouterLink to="/add" class="add-link">＋</RouterLink>
      <RouterLink to="/records">🧾<span>紀錄</span></RouterLink>
      <RouterLink to="/shopping">🛒<span>採買</span></RouterLink>
    </nav>
  </div>
</template>