<template>
  <div class="preview-page">
    <div class="preview-card">
      <div class="preview-header">
        <h2>旧物信息预览</h2>
      </div>
      
      <div class="preview-content">
        <div class="preview-image-container">
          <img :src="getImageUrl(itemData.imageUrl)" alt="旧物图片" class="preview-image" />
        </div>
        
        <div class="preview-info">
          <div class="info-item">
            <span class="label">分类：</span>
            <span class="value">{{ getCategoryLabel(itemData.category) }}</span>
          </div>
          
          <div class="info-item">
            <span class="label">描述：</span>
            <span class="value">{{ itemData.description }}</span>
          </div>
          
          <div class="info-item">
            <span class="label">捐赠者：</span>
            <span class="value">{{ itemData.name }}</span>
          </div>
          
          <div class="info-item">
            <span class="label">联系方式：</span>
            <span class="value">{{ itemData.phoneNumber }}</span>
          </div>
          
          <div class="info-item">
            <span class="label">邮箱：</span>
            <span class="value">{{ itemData.email }}</span>
          </div>
          
          <div class="info-item">
            <span class="label">爱心寄语：</span>
            <span class="value">{{ itemData.loveMessage }}</span>
          </div>
        </div>
      </div>
      
      <div class="preview-actions">
        <el-button type="primary" @click="goBack">返回</el-button>
        <el-button type="success" @click="confirmSubmit">确认提交</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getUsedItem } from '@/api/usedItems';
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();
const itemData = ref({});

const getCategoryLabel = (category) => {
  const categoryMap = {
    'electronics': '电子产品',
    'clothing': '衣物',
    'books': '书籍',
    'others': '其他'
  };
  return categoryMap[category] || category;
};

const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `${import.meta.env.VITE_API_BASE_URL}${url}`;
};

onMounted(async () => {
  try {
    const id = route.params.id;
    if (!id) {
      ElMessage.error('未找到旧物信息');
      router.push('/main/community/recycling');
      return;
    }

    const response = await getUsedItem(id);
    if (response.data) {
      itemData.value = response.data;
    } else {
      throw new Error('获取数据失败');
    }
  } catch (error) {
    console.error('Failed to fetch item data:', error);
    ElMessage.error('获取旧物信息失败');
    router.push('/main/community/recycling');
  }
});

const goBack = () => {
  router.push('/main/community/recycling');
};

const confirmSubmit = async () => {
  // 这里可以添加确认提交的逻辑
  ElMessage.success('提交成功');
  router.push('/main/community/recycling');
};
</script>

<style scoped>
.preview-page {
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
}

.preview-card {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.preview-header {
  padding: 1.5rem;
  background: #4caf50;
  color: white;
  text-align: center;
}

.preview-content {
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}

.preview-image-container {
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 8px;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-item {
  display: flex;
  gap: 1rem;
}

.label {
  font-weight: bold;
  color: #666;
  min-width: 80px;
}

.value {
  color: #333;
}

.preview-actions {
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  background: #f5f5f5;
}
</style>