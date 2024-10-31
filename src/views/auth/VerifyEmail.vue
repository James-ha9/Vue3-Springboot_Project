<template>
  <div class="verify-email-container">
    <div class="verify-card">
      <div class="status-icon" :class="status">
        <i v-if="status === 'loading'" class="el-icon-loading"></i>
        <i v-else-if="status === 'success'" class="el-icon-check"></i>
        <i v-else-if="status === 'error'" class="el-icon-close"></i>
      </div>
      
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      
      <div class="actions">
        <el-button 
          v-if="status === 'success'" 
          type="primary" 
          @click="goToLogin"
        >
          去登录
        </el-button>
        <el-button 
          v-if="status === 'error'" 
          @click="retryVerification"
        >
          重试
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { verifyEmail } from '@/api/auth';
import { ElMessage } from 'element-plus';

const router = useRouter();
const route = useRoute();

const status = ref('loading'); // loading, success, error
const title = ref('验证中...');
const message = ref('正在验证您的邮箱，请稍候...');

const verifyToken = async (token) => {
  try {
    status.value = 'loading';
    title.value = '验证中...';
    message.value = '正在验证您的邮箱，请稍候...';

    const response = await verifyEmail(token);
    
    status.value = 'success';
    title.value = '验证成功！';
    message.value = '您的邮箱已经成功验证，现在可以登录了。';
    
    // 可以在这里添加一个延时自动跳转
    setTimeout(() => {
      router.push('/login');
    }, 3000);
  } catch (error) {
    status.value = 'error';
    title.value = '验证失败';
    message.value = error.response?.data?.message || '邮箱验证失败，请重试或联系支持。';
  }
};

const goToLogin = () => {
  router.push('/login');
};

const retryVerification = () => {
  const token = route.query.token;
  if (token) {
    verifyToken(token);
  } else {
    ElMessage.error('无效的验证链接');
  }
};

onMounted(() => {
  const token = route.query.token;
  if (token) {
    verifyToken(token);
  } else {
    status.value = 'error';
    title.value = '验证失败';
    message.value = '无效的验证链接';
  }
});
</script>

<style scoped>
.verify-email-container {
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.verify-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.status-icon {
  font-size: 48px;
  margin-bottom: 1rem;
}

.status-icon.loading {
  color: #909399;
}

.status-icon.success {
  color: #67c23a;
}

.status-icon.error {
  color: #f56c6c;
}

h2 {
  margin: 1rem 0;
  color: #303133;
}

p {
  color: #606266;
  margin-bottom: 1.5rem;
}

.actions {
  margin-top: 1.5rem;
}

.el-button {
  min-width: 120px;
}

/* 添加动画效果 */
.verify-card {
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style> 