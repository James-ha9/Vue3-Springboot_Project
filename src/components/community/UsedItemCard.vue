<template>
  <div class="item-card" @click="$emit('click', item)">
    <div class="item-image-container">
      <el-image
        :src="item.imageUrl"
        :alt="item.description"
        fit="cover"
        lazy
        :preview-src-list="[item.imageUrl]"
        @error="handleImageError"
        class="item-image"
      >
        <template #error>
          <div class="image-error">
            <el-icon><Picture /></el-icon>
            <span>图片加载失败</span>
          </div>
        </template>
        <template #placeholder>
          <div class="image-slot">
            <el-icon class="rotating"><Loading /></el-icon>
          </div>
        </template>
      </el-image>
      <div class="item-overlay">
        <span class="view-details">查看详情</span>
      </div>
    </div>
    <div class="item-info">
      <h3>{{ getCategoryLabel(item.category) }}</h3>
      <p class="description">{{ item.description }}</p>
      <div class="donor-info">
        <span class="donor-name">捐赠者：{{ item.name }}</span>
        <span class="donate-time">{{ formatTime(item.createdAt) }}</span>
      </div>
      <p class="love-message">{{ item.loveMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { Picture, Loading } from '@element-plus/icons-vue';
import defaultImg from '@/assets/home/default_image.png';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['click']);

const getCategoryLabel = (category) => {
  const categoryMap = {
    'electronics': '电子产品',
    'clothing': '衣物',
    'books': '书籍',
    'others': '其他'
  };
  return categoryMap[category] || category;
};

const formatTime = (time) => {
  if (!time) return '';
  const date = new Date(time);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const handleImageError = (e) => {
  if (e.target && e.target.src !== defaultImg) {
    e.target.src = defaultImg;
  }
};
</script>

<style scoped>
.item-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  height: 500px;
  display: flex;
  flex-direction: column;
}

.item-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.item-image-container {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.item-image {
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
}

.item-card:hover .item-image {
  transform: scale(1.15);
}

.item-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
}

.item-card:hover .item-overlay {
  opacity: 1;
}

.view-details {
  color: white;
  font-size: 1.2rem;
  padding: 12px 24px;
  border: 2px solid white;
  border-radius: 8px;
  transform: translateY(20px);
  transition: all 0.4s ease;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
}

.item-card:hover .view-details {
  transform: translateY(0);
}

.item-info {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
}

.item-info h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.3rem;
  font-weight: 600;
}

.description {
  color: #4a5568;
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 1rem;
}

.donor-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #718096;
  margin-top: auto;
  padding-top: 0.8rem;
  border-top: 1px solid #e2e8f0;
}

.love-message {
  font-style: italic;
  color: #4caf50;
  margin: 0;
  font-size: 0.95rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
  background: #f0f9f0;
  padding: 0.8rem;
  border-radius: 8px;
}

.image-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #f7fafc;
  color: #a0aec0;
}

.image-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #a0aec0;
  background: #f7fafc;
  gap: 1rem;
}

.rotating {
  animation: rotate 1.5s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .item-card {
    height: auto;
    min-height: 450px;
  }
  
  .item-image-container {
    height: 250px;
  }
  
  .item-info {
    padding: 1rem;
  }
  
  .view-details {
    font-size: 1rem;
    padding: 8px 16px;
  }
}
</style> 