<template>
  <div class="app-shell">
    <header class="app-header">
      <h1>家庭庫存</h1>
      <p>把家裡的小倉庫變成有秩序的補給站</p>
    </header>

    <main class="app-main">
      <RouterView />
    </main>

    <nav class="bottom-nav">
      <RouterLink to="/">首頁</RouterLink>
      <RouterLink to="/inventory">庫存</RouterLink>
      <RouterLink to="/add">新增</RouterLink>
      <RouterLink to="/shopping">採買</RouterLink>
      <RouterLink to="/settings">設定</RouterLink>
    </nav>
  </div>
</template>