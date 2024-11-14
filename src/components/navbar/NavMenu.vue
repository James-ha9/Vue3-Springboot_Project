<template>
  <nav class="nav-menu">
    <router-link
      v-for="item in menuItems"
      :key="item.name"
      :to="getRouteForItem(item)"
      class="nav-item"
      :class="{ active: isActiveRoute(item) }"
      @mouseover="$emit('show-dropdown', item.name)"
      @mouseleave="$emit('hide-dropdown')"
      @click="handleClick(item)"
    >
      <nav-avatar
        v-if="item.name === 'personal-center'"
        :username="username"
        :loading="avatarLoading"
        :avatar="userAvatar"
        @upload="$emit('avatar-upload')"
        @error="$emit('avatar-error')"
      />
      <span v-else>{{ item.emoji }} {{ item.label }}</span>
    </router-link>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router';
import NavAvatar from './NavAvatar.vue';

const props = defineProps({
  menuItems: {
    type: Array,
    required: true
  },
  username: String,
  userAvatar: String,
  avatarLoading: Boolean
});

const emit = defineEmits(['show-dropdown', 'hide-dropdown', 'click', 'avatar-upload', 'avatar-error']);

const route = useRoute();

const isActiveRoute = (item) => {
  if (item.subItems && item.subItems.length > 0) {
    return item.subItems.some(subItem => subItem.name === route.name);
  }
  return item.name === route.name;
};

const getRouteForItem = (item) => {
  if (item.name === 'personal-center') {
    return { name: 'personal-data' };
  }
  if (item.subItems && item.subItems.length > 0) {
    return { name: item.subItems[0].name };
  }
  return { name: item.name };
};

const handleClick = (item) => {
  emit('click', item);
};
</script>

<style scoped>
.nav-menu {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 10vh;
}

.nav-item {
  font-size: 1.3vw;
  padding: 0 1vw;
  height: 100%;
  line-height: 10vh;
  white-space: nowrap;
  margin-right: 3.5vw;
  text-decoration: none;
  color: #333;
  transition: color 0.3s, transform 0.3s;
  width: 7%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.nav-item:last-child {
  margin-right: 0;
}

.nav-item.active {
  color: #31755d;
}

.nav-item:hover {
  color: #31755d;
}

/* 修改下划线样式 */
.nav-item::after {
  content: "";
  position: absolute;
  bottom: 10%;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #31755d;
  transition: width 0.3s ease-in-out;
}

.nav-item:hover::after {
  width: 100%;
}

/* 为个人中心和logo特殊处理 */
.nav-item:first-child::after,
.nav-item:last-child::after {
  display: none;
}

/* 确保下划线不会被其他元素遮挡 */
.nav-item {
  z-index: 1;
}

.nav-item::after {
  z-index: -1;
}
</style> 