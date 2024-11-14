<template>
  <span class="personal-center" ref="avatarRef">
    <div 
      class="avatar-container"
      @mouseover="showDropdown"
      @mouseleave="hideDropdown"
    >
      <img 
        v-if="!loading"
        :src="avatar" 
        :alt="username"
        @error="handleAvatarError"
      />
      <div v-else class="avatar-placeholder">
        <el-icon class="loading-icon"><Loading /></el-icon>
      </div>
    </div>
  </span>
  <Teleport to="body">
    <transition name="dropdown">
      <div
        v-if="isVisible"
        class="avatar-dropdown"
        :style="dropdownPosition"
        @mouseover="clearHideTimer"
        @mouseleave="hideDropdown"
      >
        <div class="avatar-dropdown-item" @click="triggerUpload">
          更改头像
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Loading } from '@element-plus/icons-vue';
import defaultAvatar from '@/assets/home/default_image.png';

const props = defineProps({
  username: String,
  loading: Boolean,
  avatar: {
    type: String,
    default: defaultAvatar
  }
});

const emit = defineEmits(['upload', 'error']);

const avatarRef = ref(null);
const isVisible = ref(false);
const hideTimer = ref(null);

const dropdownPosition = computed(() => {
  if (!avatarRef.value) return { top: '0px', left: '0px' };
  
  const rect = avatarRef.value.getBoundingClientRect();
  const scrollY = window.scrollY || window.pageYOffset;
  const viewportHeight = window.innerHeight;
  
  let top = rect.bottom + scrollY;
  let left = rect.left + (rect.width - 100) / 2;
  
  if (top + 100 > scrollY + viewportHeight) {
    top = rect.top + scrollY - 100;
  }
  
  return {
    top: `${top}px`,
    left: `${left}px`,
    position: 'fixed',
    zIndex: 2000
  };
});

const showDropdown = () => {
  clearTimeout(hideTimer.value);
  isVisible.value = true;
};

const hideDropdown = () => {
  hideTimer.value = setTimeout(() => {
    isVisible.value = false;
  }, 200);
};

const clearHideTimer = () => {
  clearTimeout(hideTimer.value);
};

const triggerUpload = () => {
  emit('upload');
};

const handleAvatarError = (e) => {
  e.target.src = defaultAvatar;
  emit('error');
};

const updatePosition = () => {
  if (isVisible.value) {
    avatarRef.value?.getBoundingClientRect();
  }
};

onMounted(() => {
  window.addEventListener('resize', updatePosition);
  window.addEventListener('scroll', updatePosition);
  document.addEventListener('DOMContentLoaded', updatePosition);
});

onUnmounted(() => {
  window.removeEventListener('resize', updatePosition);
  window.removeEventListener('scroll', updatePosition);
  document.removeEventListener('DOMContentLoaded', updatePosition);
});
</script>

<style scoped>
.avatar-dropdown {
  position: fixed;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  min-width: 100px;
  z-index: 2000;
}

/* 保持原有的相关样式 */
</style> 