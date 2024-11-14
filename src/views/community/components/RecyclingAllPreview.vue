<template>
  <div class="preview-page">
    <div class="floating-emojis">
      <span v-for="(emoji, index) in floatingEmojis" 
            :key="index" 
            :style="emoji.style"
            class="floating-emoji"
      >
        {{ emoji.icon }}
      </span>
    </div>

    <div class="decorative-elements">
      <div class="circle-decoration"></div>
      <div class="wave-decoration"></div>
    </div>

    <div class="page-header">
      <div class="header-content">
        <h2>益物展览馆</h2>
        <p class="subtitle">这里展示了所有爱心人士捐赠的物品</p>
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-number">{{ total }}</span>
            <span class="stat-label">展品总数</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">{{ donorsCount }}</span>
            <span class="stat-label">爱心人士</span>
          </div>
        </div>
      </div>
    </div>

    <div class="items-container">
      <div v-if="loading" class="loading-container">
        <div class="loading-animation">
          <span v-for="n in 3" :key="n" class="loading-dot"></span>
        </div>
        <p>正在加载爱心展品...</p>
      </div>

      <el-empty v-else-if="items.length === 0">
        <template #description>
          <p>暂无展品</p>
          <p class="empty-subtitle">成为第一个展示爱心的人吧！</p>
        </template>
        <el-button type="primary" @click="goToDonate">
          我要捐赠
        </el-button>
      </el-empty>
      
      <div v-else class="items-grid">
        <used-item-card
          v-for="item in items"
          :key="item.id"
          :item="item"
          @click="showItemDetails"
        />
      </div>

      <custom-pagination
        v-if="items.length > 0"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog
      v-model="dialogVisible"
      :title="selectedItem?.category ? getCategoryLabel(selectedItem.category) : ''"
      width="50%"
      class="item-dialog"
    >
      <div class="dialog-content" v-if="selectedItem">
        <div class="dialog-image">
          <el-image
            :src="selectedItem.imageUrl"
            fit="contain"
            :preview-src-list="[selectedItem.imageUrl]"
          />
        </div>
        <div class="dialog-info">
          <h4>物品描述</h4>
          <p>{{ selectedItem.description }}</p>
          <h4>爱心寄语</h4>
          <p class="love-message">{{ selectedItem.loveMessage }}</p>
          <div class="donor-details">
            <p><strong>捐赠者：</strong>{{ selectedItem.name }}</p>
            <p><strong>捐赠时间：</strong>{{ formatTime(selectedItem.createdAt) }}</p>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getUsedItems } from '@/api/usedItems';
import { getUsedItemImageUrl } from '@/api/file';
import CustomPagination from '@/components/common/CustomPagination.vue';
import UsedItemCard from '@/components/community/UsedItemCard.vue';
import { ElMessage } from 'element-plus';

// 数据初始化
const loading = ref(false);
const items = ref([]);
const currentPage = ref(1);
const pageSize = ref(12);
const total = ref(0);

const isDev = ref(process.env.NODE_ENV === 'development');

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
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

// 获取数据的函数
const fetchItems = async () => {
  if (loading.value) return;
  
  try {
    loading.value = true;
    const response = await getUsedItems(currentPage.value, pageSize.value);
    
    if (response && response.data) {
      // 打印原始数据
      // console.log('API Response:', response.data);
      
      items.value = response.data.map(item => {
        const originalUrl = item.imageUrl;
        const processedUrl = getUsedItemImageUrl(item.imageUrl);
        
        // 打印URL转换过程
        // console.log('Image URL Processing:', {
        //   original: originalUrl,
        //   processed: processedUrl
        // });
        
        return {
          ...item,
          imageUrl: processedUrl || defaultImg
        };
      });
      total.value = response.total || response.data.length;
    } else {
      items.value = [];
      total.value = 0;
    }
  } catch (error) {
    console.error('Failed to fetch items:', error);
    ElMessage.error('获取展品信息失败');
    items.value = [];
  } finally {
    loading.value = false;
  }
};

// 分页处理函数
const handleSizeChange = (val) => {
  pageSize.value = val;
  currentPage.value = 1; // 重置到第一页
  fetchItems();
};

const handleCurrentChange = (val) => {
  currentPage.value = val;
  fetchItems();
};

// 图片错误处理
const handleImageError = (e, item) => {
  console.error('Image load failed:', {
    url: e.target.src,
    item: item
  });
  
  if (e.target && e.target.src !== defaultImg) {
    e.target.src = defaultImg;
  }
};

// 只在组件挂载时请求一次
onMounted(() => {
  fetchItems();
});

// 添加新的响应式变量
const dialogVisible = ref(false);
const selectedItem = ref(null);

// 显示物品详情
const showItemDetails = (item) => {
  selectedItem.value = item;
  dialogVisible.value = true;
};

// 添加浮动emoji相关逻辑
const emojiList = ['🎁', '💝', '💖', '🌟', '✨', '💫', '🎈', '🎀'];
const floatingEmojis = ref([]);

const createFloatingEmoji = () => {
  const emoji = {
    icon: emojiList[Math.floor(Math.random() * emojiList.length)],
    style: {
      left: `${Math.random() * 100}vw`,
      animationDuration: `${15 + Math.random() * 10}s`,
      animationDelay: `${Math.random() * 5}s`,
      opacity: 0.3 + Math.random() * 0.4
    }
  };
  floatingEmojis.value.push(emoji);
};

// 初始化浮动emoji
onMounted(() => {
  for (let i = 0; i < 20; i++) {
    createFloatingEmoji();
  }
  // 每隔一段时间刷新一些emoji
  setInterval(() => {
    floatingEmojis.value = floatingEmojis.value.slice(5);
    for (let i = 0; i < 5; i++) {
      createFloatingEmoji();
    }
  }, 10000);
});

// 添加捐赠者数量统计
const donorsCount = computed(() => {
  const uniqueDonors = new Set(items.value.map(item => item.name));
  return uniqueDonors.size;
});

// 跳转到捐赠页面
const goToDonate = () => {
  router.push({ name: 'recycling' });
};
</script>

<style scoped>
.preview-page {
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  position: relative;
  overflow: hidden;
}

/* 浮动emoji样式 */
.floating-emojis {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.floating-emoji {
  position: fixed;
  font-size: 2rem;
  animation: floatUp linear infinite;
}

@keyframes floatUp {
  0% {
    transform: translateY(100vh) rotate(0deg);
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
  }
}

/* 装饰元素样式 */
.decorative-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.circle-decoration {
  position: absolute;
  top: 10%;
  right: 5%;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3));
  animation: pulse 4s ease-in-out infinite;
}

.wave-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: url('@/assets/wave.svg') repeat-x;
  animation: waveMove 20s linear infinite;
}

/* 页头样式优化 */
.page-header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
}

.header-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  gap: 2rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #4caf50;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: #ddd;
}

/* Loading 动画优化 */
.loading-container {
  text-align: center;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
}

.loading-animation {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.loading-dot {
  width: 12px;
  height: 12px;
  background: #4caf50;
  border-radius: 50%;
  animation: bounce 0.5s ease-in-out infinite;
}

.loading-dot:nth-child(2) {
  animation-delay: 0.1s;
}

.loading-dot:nth-child(3) {
  animation-delay: 0.2s;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.1); opacity: 0.5; }
}

@keyframes waveMove {
  0% { background-position: 0 0; }
  100% { background-position: 100% 0; }
}

/* 空状态优化 */
.empty-subtitle {
  color: #666;
  margin-top: 0.5rem;
}

/* 响应式优化 */
@media (max-width: 768px) {
  .header-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .stat-divider {
    width: 50%;
    height: 1px;
  }
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* 响应式布局 */
@media (max-width: 1200px) {
  .items-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .items-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
