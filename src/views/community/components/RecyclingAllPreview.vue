<template>
  <div class="preview-page">
    <div class="page-header">
      <h2>益物展览馆</h2>
      <p class="subtitle">这里展示了所有爱心人士捐赠的物品</p>
    </div>

    <div class="items-container">
      <!-- 加载状态 -->
      <div v-if="loading" class="loading-container">
        <el-skeleton :rows="3" animated />
      </div>

      <!-- 展示物品 -->
      <el-empty v-else-if="items.length === 0" description="暂无展品" />
      
      <div v-else class="items-grid">
        <div v-for="item in items" :key="item.id" class="item-card">
          <div class="item-image">
            <el-image
              :src="item.imageUrl"
              :alt="item.description"
              fit="cover"
              lazy
              :preview-src-list="[item.imageUrl]"
              @error="handleImageError"
            >
              <template #error>
                <div class="image-error">
                  <el-icon><Picture /></el-icon>
                  <span>图片加载失败</span>
                </div>
              </template>
              <template #placeholder>
                <div class="image-slot">
                  <el-icon><Loading /></el-icon>
                </div>
              </template>
            </el-image>
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
      </div>

      <!-- 分页 -->
      <div v-if="items.length > 0" class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[12, 24, 36, 48]"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getUsedItems } from '@/api/usedItems';
import { getUsedItemImageUrl } from '@/api/file';
import defaultImg from '@/assets/home/default_image.png';
import { ElMessage } from 'element-plus';

// 数据初始化
const loading = ref(false);
const items = ref([]);
const currentPage = ref(1);
const pageSize = ref(12);
const total = ref(0);

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
  if (loading.value) return; // 防止重复请求
  
  try {
    loading.value = true;
    const response = await getUsedItems(currentPage.value, pageSize.value);
    
    if (response && response.data) {
      items.value = response.data.map(item => ({
        ...item,
        imageUrl: getUsedItemImageUrl(item.imageUrl) || defaultImg
      }));
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
const handleImageError = (e) => {
  if (e.target && e.target.src !== defaultImg) {
    e.target.src = defaultImg;
  }
};

// 只在组件挂载时请求一次
onMounted(() => {
  fetchItems();
});
</script>

<style scoped>
.preview-page {
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.page-header h2 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
}

.items-container {
  max-width: 1200px;
  margin: 0 auto;
}

.loading-container {
  padding: 2rem;
  background: white;
  border-radius: 8px;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.item-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.item-card:hover {
  transform: translateY(-5px);
}

.item-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  padding: 1rem;
}

.item-info h3 {
  margin: 0 0 0.5rem;
  color: #2c3e50;
}

.description {
  color: #666;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.donor-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.love-message {
  font-style: italic;
  color: #4caf50;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.pagination {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
}

.image-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
}

.el-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.image-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #909399;
}

@media (max-width: 768px) {
  .items-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  .page-header h2 {
    font-size: 2rem;
  }
}
</style>
