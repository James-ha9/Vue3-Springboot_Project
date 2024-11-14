<template>
  <div class="logo-section">
    <router-link class="logo-a" to="/main/charitable-projects/platform-charity">
      <img class="logo" src="@/assets/logo-icon.png" alt="Logo" />
    </router-link>
    <div class="logo-container">
      <h1 class="logo-text-c">益行山区</h1>
      <h2 class="logo-text-e">YingXing GOING!</h2>
    </div>
  </div>
</template>

<style scoped>
.logo-section {
  display: flex;
  align-items: center;
}

.logo-a {
  width: 4%;
}

.logo {
  height: 20%;
  width: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.logo-container {
  margin-left: 1%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 120px;
}

.logo-text-c {
  height: 40%;
  font-size: 15px;
  margin: 0;
}

.logo-text-e {
  height: 40%;
  font-size: 12px;
  margin: 0;
}
</style> 