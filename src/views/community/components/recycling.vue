<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4"
  >
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <transition-group name="emoji">
        <div
          v-for="(item, index) in backgroundEmojis"
          :key="index"
          class="absolute text-4xl"
          :style="{
            left: item.x + '%',
            top: item.y + '%',
            animation: `rotate ${item.speed}s linear infinite`,
          }"
        >
          {{ item.emoji }}
        </div>
      </transition-group>
    </div>

    <div
      class=" bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-lg w-full relative z-10 backdrop-blur-sm"
    >
      <h1 class="text-3xl font-bold text-center mb-6 text-green-700">
        💞益回收
      </h1>
      <p class="text-center mb-8 text-gray-600">
        请将您的旧物信息填写完整，我们将尽快处理。
      </p>
      <el-form 
        :model="form" 
        label-width="auto" 
        style="max-width: 600px"
        @submit.prevent="onSubmit"
      >
        <el-form-item label="✨️旧物分类">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="💻️电子产品" value="electronicProduct" />
            <el-option label="👕衣物" value="clothes" />
            <el-option label="📖书籍" value="book" />
            <el-option label="🧸其他" value="another" />
          </el-select>
        </el-form-item>

        <el-form-item label="📃旧物描述">
          <el-input v-model="form.description" type="textarea" />
        </el-form-item>

        <el-form-item label="😁您的姓名">
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="🤗您的性别">
          <el-radio-group v-model="form.gender">
            <el-radio value="1">🙋‍♂️男</el-radio>
            <el-radio value="0">🙋‍♀️女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="📞电话号码">
          <el-input v-model="form.phoneNumber" />
        </el-form-item>

        <el-form-item label="📧邮箱地址">
          <el-input v-model="form.email" />
        </el-form-item>

        <el-form-item label="💌爱心寄语">
          <el-input v-model="form.loveMessage" type="textarea" />
        </el-form-item>

        <el-form-item label="📸旧物图片">
          <div class="upload-container">
            <el-upload
              class="image-uploader"
              action="#"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="beforeUpload"
            >
              <template #default>
                <div v-if="!tempFile && !form.imageUrl" class="upload-content">
                  <el-icon class="upload-icon"><Plus /></el-icon>
                  <div class="upload-text">点击选择图片</div>
                </div>
                <img
                  v-else-if="form.imageUrl"
                  :src="getImageUrl(form.imageUrl)"
                  class="preview-image"
                  @error="handleImageError"
                />
                <img
                  v-else-if="tempFile && previewUrl"
                  :src="previewUrl"
                  class="preview-image"
                />
              </template>
            </el-upload>

            <div v-if="tempFile || form.imageUrl" class="image-actions">
              <el-button type="danger" size="small" @click="handleRemove">
                删除图片
              </el-button>
            </div>
          </div>
        </el-form-item>

        <el-button
          type="primary"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
          @click="onSubmit"
        >
          提交
        </el-button>
      </el-form>
      <br>
      <div class="flex justify-center">
        <router-link to="/main/community/map" class="text-green-900 hover:text-green-500 transition-all ml-2 hover:text-blue-600" >查看旧物回收分布</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
<<<<<<< Updated upstream
import { ref, onMounted, reactive, computed, nextTick, onUnmounted } from "vue";
import { submitUsedItem, uploadUsedItemImage } from '@/api/usedItems';
import { ElMessage } from 'element-plus';
import { Plus, ZoomIn, Delete } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { getUsedItemImageUrl } from '@/api/file';

const router = useRouter();
=======

import { ref, onMounted, reactive } from "vue";
>>>>>>> Stashed changes

const emojis = [
  "♻️",
  "🌱",
  "🌿",
  "🍃",
  "🌳",
  "🌴",
  "🌲",
  "🍀",
  "🌵",
  "🌼",
  "🌻",
  "🌾",
];
const backgroundEmojis = ref([]);

onMounted(() => {
  for (let i = 0; i < 100; i++) {
    backgroundEmojis.value.push({
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: 3 + Math.random() * 3, // 随机速度，范围在 3s 到 6s 之间
    });
  }

  testUploadConfig();
});

// 修改上传 URL
const uploadUrl = `${import.meta.env.VITE_API_BASE_URL}/files/used-items/upload`;  // 修改为正确的上传路径

const form = ref({
  region: '',
  description: '',
  imageUrl: '',
  name: '',
  gender: '',
  phoneNumber: '',
  email: '',
  loveMessage: ''
});

// 上传相关的 headers
const uploadHeaders = computed(() => {
  return {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };
});

// 存储临时文件
const tempFile = ref(null);

// 添加预览URL的响应式引用
const previewUrl = ref('');

// 修改上传前处理函数
const beforeUpload = (uploadFile) => {
  // 确保文件对象存在
  if (!uploadFile || !uploadFile.raw) {
    ElMessage.error('文件上传失败');
    return false;
  }

  const file = uploadFile.raw;
  
  // 检查文件类型
  const isImage = file.type && file.type.startsWith('image/');
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isImage) {
    ElMessage.error('只能上传图片文件!');
    return false;
  }
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过 2MB!');
    return false;
  }

  // 保存文件引用并创建预览URL
  tempFile.value = file;
  previewUrl.value = URL.createObjectURL(file);
  return false; // 阻止自动上传
};

// 修改上传成功处理函数
const handleUploadSuccess = (response) => {
  console.log('Upload response:', response);
  if (response.url) {  // 直接使用返回的 url
    form.value.imageUrl = response.url;
    ElMessage.success('图片上传成功');
  } else {
    ElMessage.error('图片上传失败：未获取到图片URL');
    form.value.imageUrl = '';
  }
};

// 修改上传失败处理函数
const handleUploadError = (error) => {
  console.error('Upload error:', error);
  ElMessage.error(
    error.response?.data?.message || 
    error.message || 
    '图片上传失败，请稍后重试'
  );
};

// 修改表单提交函数
const onSubmit = async () => {
  try {
    // 验证登录状态
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (!token || !userId) {
      ElMessage.error('请先登录');
      router.push('/login');
      return;
    }

    // 表单验证
    if (!form.value.region || !form.value.description || !form.value.name || 
        !form.value.gender || !form.value.phoneNumber || !form.value.email) {
      ElMessage.error('请填写所有必填信息');
      return;
    }

    // 准备提交数据，匹配后端API格式
    const submitData = {
      userId: parseInt(userId), // 添加用户ID
      category: getCategoryValue(form.value.region),
      description: form.value.description.trim(),
      name: form.value.name.trim(),
      gender: form.value.gender === '1' ? 'male' : 'female', // 使用小写
      phoneNumber: form.value.phoneNumber.trim(),
      email: form.value.email.trim(),
      loveMessage: form.value.loveMessage?.trim() || '',
      imageUrl: form.value.imageUrl || '' // 添加图片URL字段
    };

    console.log('Submitting data:', submitData);

    // 提交旧物信息
    const itemResponse = await submitUsedItem(submitData);
    console.log('Submit response:', itemResponse);

    // 如果有新上传的图片
    if (tempFile.value && itemResponse.data?.id) {
      const formData = new FormData();
      formData.append('file', tempFile.value);

      try {
        const uploadResponse = await uploadUsedItemImage(itemResponse.data.id, formData);
        console.log('Upload response:', uploadResponse);
        
        if (uploadResponse.data) {
          form.value.imageUrl = uploadResponse.data;
        }
      } catch (error) {
        console.error('Image upload error:', error);
        ElMessage.warning('图片上传失败，但物品信息已保存');
      }
    }

    ElMessage.success('提交成功！');
    resetForm();
    router.push('/main/community/recycling-preview');
  } catch (error) {
    console.error('Submit error:', error);
    if (error.response?.status === 400) {
      ElMessage.error(error.response.data.message || '提交的数据格式不正确，请检查填写的信息');
    } else if (error.response?.status === 401) {
      ElMessage.error('登录已过期，请重新登录');
      router.push('/login');
    } else {
      ElMessage.error('提交失败，请稍后重试');
    }
  }
};

// 修改分类值转换函数
const getCategoryValue = (region) => {
  const categoryMap = {
    'electronicProduct': 'electronics',
    'clothes': 'clothing',
    'book': 'books',
    'another': 'others'
  };
  return categoryMap[region] || 'others';
};

// 重置表单
const resetForm = () => {
  form.value = {
    region: '',
    description: '',
    imageUrl: '',
    name: '',
    gender: '',
    phoneNumber: '',
    email: '',
    loveMessage: ''
  };
  tempFile.value = null;
};

// 修改图片 URL 处理数
const getImageUrl = (url) => {
  if (!url) return '';
  console.log('Processing image URL:', url);
  
  // 如果是相对路径，添加基础URL
  if (url.startsWith('/api/')) {
    return `${import.meta.env.VITE_API_BASE_URL}${url.substring(4)}`;
  }
  return url;
};

// 添加图片加载错误处理
const handleImageError = (e) => {
  console.error('Image load error:', e);
  console.log('Failed image URL:', e.target.src);
  ElMessage.warning('图片加载失败');
};

// 添加预览相关的状态
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

// 处理图片预览
const handlePreview = () => {
  if (!form.value.imageUrl) return;
  dialogImageUrl.value = getImageUrl(form.value.imageUrl);
  dialogVisible.value = true;
};

// 修改移除处理函数
const handleRemove = () => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = '';
  }
  tempFile.value = null;
  form.value.imageUrl = '';
};

// 添加测试函数
const testUploadConfig = () => {
  console.log('Upload URL:', uploadUrl);
  console.log('Upload Headers:', uploadHeaders);
  console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);
};

// 在组件卸载时清理资源
onUnmounted(() => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
  }
});
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.upload-demo {
  width: 100%;
}

.upload-demo :deep(.el-upload) {
  width: 100%;
  text-align: center;
}

.upload-demo :deep(.el-upload-list--picture) {
  width: 100%;
}

.upload-file {
  position: relative;
  overflow: hidden;
  border-radius: 6px;
}

.upload-file img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.el-upload-list__item-actions {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  opacity: 0;
  transition: opacity 0.3s;
}

.upload-file:hover .el-upload-list__item-actions {
  opacity: 1;
}

.el-upload-list__item-actions span {
  cursor: pointer;
  padding: 8px;
}

.el-upload-list__item-actions span:hover {
  opacity: 0.8;
}

.emoji-enter-active,
.emoji-leave-active {
  transition: all 0.1s ease;
}
.emoji-enter-from,
.emoji-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.fixed {
  overflow: hidden; /* 确保 emoji 不会超出父容器 */
}

/* 交互效果 */
input,
select,
textarea {
  transition: all 0.3s ease;
}

input:hover,
select:hover,
textarea:hover {
  border-color: #4caf50; /* 悬停时边框颜色 */
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.5); /* 悬停时阴影效果 */
}

input:focus,
select:focus,
textarea:focus {
  border-color: #4caf50; /* 聚焦时边框颜色 */
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.5); /* 聚焦时阴影效果 */
}

/* 添加上传组件相关 */
.upload-demo {
  width: 100%;
}

.upload-demo .el-upload {
  width: 100%;
}

.upload-demo .el-upload-dragger {
  width: 100%;
}

/* 图片预览容器样式 */
.image-preview {
  margin-top: 1rem;
  position: relative;
}

.image-preview img {
  max-width: 100%;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.upload-container {
  width: 100%;
  display: flex;
  gap: 16px;
}

.image-uploader {
  border: 2px dashed #4caf50;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
}

.image-uploader:hover {
  border-color: #45a049;
  background-color: rgba(76, 175, 80, 0.05);
}

.upload-content {
  padding: 20px;
  text-align: center;
}

.upload-icon {
  font-size: 28px;
  color: #4caf50;
  margin-bottom: 8px;
}

.upload-text {
  color: #666;
  font-size: 14px;
}

.preview-container {
  position: relative;
  width: 148px;
  height: 148px;
  border-radius: 8px;
  overflow: hidden;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-actions {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.preview-container:hover .preview-actions {
  opacity: 1;
}

.preview-actions .el-button {
  color: white;
  margin: 0 4px;
}
</style>
