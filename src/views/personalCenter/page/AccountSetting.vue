<template>
  <div class="page-wrapper">
    <div class="account-settings">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>账号设置</span>
          </div>
        </template>

        <el-row
          v-for="(item, index) in accountItems"
          :key="index"
          class="account-row"
        >
          <el-col :span="8">{{ item.name }}</el-col>
          <el-col :span="8">{{ item.status }}</el-col>
          <el-col :span="8">
            <el-button
              v-if="item.buttonText"
              :type="item.buttonType"
              size="small"
              @click="handleClick(item)"
            >
              {{ item.buttonText }}
            </el-button>
          </el-col>
        </el-row>
      </el-card>

      <!-- 通用对话框 -->
      <el-dialog 
        v-model="dialogVisible" 
        :title="dialogTitle" 
        width="30%" 
        center
      >
        <template v-if="dialogType === 'phone' || dialogType === 'email'">
          <el-input
            v-model="newValue"
            :placeholder="dialogType === 'phone' ? '请输入新手机号' : '请输入新邮箱'"
            class="verification-input"
          />
          <el-input
            v-model="verificationCode"
            placeholder="验证码"
            class="verification-input"
          >
            <template #append>
              <el-button 
                @click="getVerificationCode" 
                :disabled="countdown > 0"
              >
                {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
              </el-button>
            </template>
          </el-input>
        </template>
        <template v-if="dialogType === 'deactivate'">
          <span>验证码</span>
          <el-input
            v-model="verificationCode"
            placeholder="验证码"
            class="verification-input"
          >
            <template #append>
              <el-button @click="getVerificationCode">获取验证码</el-button>
            </template>
          </el-input>
        </template>
        <template v-if="dialogType === 'resetPassword'">
          <el-input
            v-model="currentEmail"
            placeholder="邮箱"
            disabled
            class="verification-input"
          />
          <el-input
            v-model="verificationCode"
            placeholder="请输入验证码"
            class="verification-input"
          >
            <template #append>
              <el-button 
                @click="getVerificationCode" 
                :disabled="countdown > 0"
              >
                {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
              </el-button>
            </template>
          </el-input>
          <el-input
            v-model="newValue"
            type="password"
            placeholder="请输入新密码"
            show-password
            class="verification-input"
          />
        </template>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitChange">下一步</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeMount, onBeforeUnmount } from "vue";
import { getAccountSettings, updateAccountSettings, bindPhone, bindEmail, bindWechat, deactivateAccount, sendVerificationCode, sendResetPasswordCode, confirmResetPassword } from '@/api/user';
import { logout } from '@/api/auth';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();
const dialogVisible = ref(false);
const dialogTitle = ref('');
const dialogType = ref(''); // 'phone', 'email', 'deactivate'
const currentPhone = ref('');
const currentEmail = ref('');
const verificationCode = ref('');
const newValue = ref(''); // 新手机号或邮箱
const loading = ref(false);

// 倒计时相关
const countdown = ref(0);
const timer = ref(null);

const startCountdown = () => {
  countdown.value = 60;
  timer.value = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(timer.value);
    }
  }, 1000);
};

const accountItems = ref([
  {
    name: "手机",
    status: "未绑定",
    buttonText: "绑定",
    buttonType: "primary",
  },
  {
    name: "微信",
    status: "未绑定",
    buttonText: "绑定",
    buttonType: "primary",
  },
  {
    name: "邮箱",
    status: "未绑定",
    buttonText: "绑定",
    buttonType: "primary",
  },
  {
    name: "密码",
    status: "",
    buttonText: "修改",
    buttonType: "primary",
  },
  {
    name: "账号注销",
    status: "",
    buttonText: "注销",
    buttonType: "danger",
  }
]);

// 修改 onBeforeMount 为路由守卫
const checkAuth = async () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  
  if (!token || !userId) {
    ElMessage.error('请先登录');
    router.push('/login');
    return false;
  }
  return true;
};

onBeforeMount(async () => {
  if (await checkAuth()) {
    await fetchAccountSettings();
  }
});

onMounted(async () => {
  if (await checkAuth()) {
    await fetchAccountSettings();
  }
});

const fetchAccountSettings = async () => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID not found');
    }

    const response = await getAccountSettings(userId);
    console.log('Settings response:', response);

    if (response.data) {
      const settings = response.data;
      
      // 更新邮箱状态
      if (settings.email) {
        currentEmail.value = settings.email;
        const emailItem = accountItems.value.find(item => item.name === "邮箱");
        if (emailItem) {
          emailItem.status = settings.email;
          emailItem.buttonText = "修改";
        }
      }

      // 更新手机号状态
      const phoneItem = accountItems.value.find(item => item.name === "手机");
      if (phoneItem) {
        if (settings.phone) {
          phoneItem.status = settings.phone;
          phoneItem.buttonText = "修改";
          currentPhone.value = settings.phone;
        } else {
          phoneItem.status = "未绑定";
          phoneItem.buttonText = "绑定";
        }
      }

      // 更新微信状态
      const wechatItem = accountItems.value.find(item => item.name === "微信");
      if (wechatItem) {
        if (settings.wechat) {
          wechatItem.status = settings.wechat;
          wechatItem.buttonText = "修改";
        } else {
          wechatItem.status = "未绑定";
          wechatItem.buttonText = "绑定";
        }
      }
    }
  } catch (error) {
    console.error('Failed to fetch account settings:', error);
    ElMessage.error('获取账户设置失败');
  }
};

const handleClick = async (item) => {
  dialogType.value = '';
  dialogTitle.value = '';
  newValue.value = '';
  verificationCode.value = '';

  switch (item.name) {
    case '手机':
      dialogType.value = 'phone';
      dialogTitle.value = '绑定手机号';
      break;
    case '邮箱':
      dialogType.value = 'email';
      dialogTitle.value = '绑定邮箱';
      break;
    case '密码':
      handleResetPassword();
      return;
    case '微信':
      handleWechatBind();
      return;
    case '账号注销':
      handleDeactivate();
      return;
  }
  
  if (dialogType.value) {
    dialogVisible.value = true;
  }
};

const getVerificationCode = async () => {
  if (countdown.value > 0) return;
  
  try {
    loading.value = true;
    let target;
    let type;

    switch (dialogType.value) {
      case 'phone':
        if (!newValue.value) {
          throw new Error('请输入手机号');
        }
        target = newValue.value;
        type = 'phone';
        await sendVerificationCode(type, target);
        break;
      case 'email':
        if (!newValue.value) {
          throw new Error('请输入邮箱');
        }
        target = newValue.value;
        type = 'email';
        await sendVerificationCode(type, target);
        break;
      case 'resetPassword':
        if (!currentEmail.value) {
          throw new Error('邮箱不能为空');
        }
        await sendResetPasswordCode(currentEmail.value);
        break;
      default:
        throw new Error('未知的验证码类型');
    }

    ElMessage.success('验证码已发送');
    startCountdown();
  } catch (error) {
    console.error('Failed to send verification code:', error);
    if (error.response?.status === 401 && dialogType.value !== 'resetPassword') {
      ElMessage.error('登录已过期，请重新登录');
      await logout();
      router.push('/login');
    } else {
      ElMessage.error(
        error.response?.data?.message || 
        error.message || 
        '发送验证码失败，请稍后重试'
      );
    }
  } finally {
    loading.value = false;
  }
};

const handleWechatBind = async () => {
  try {
    const userId = localStorage.getItem('userId');
    const response = await bindWechat(userId);
    // 跳转到微信授权页面
    window.location.href = response.data.authUrl;
  } catch (error) {
    ElMessage.error('获取微信授权失败');
  }
};

const handleDeactivate = async () => {
  try {
    // 直接弹出确认对话框
    await ElMessageBox.confirm(
      '注销账号后，所有数据将被永久删除且无法恢复。确定要继续吗？',
      '警告',
      {
        confirmButtonText: '确定注销',
        cancelButtonText: '取消',
        type: 'warning'
      }
    );
    
    // 用户确认后直接删除账号
    const userId = localStorage.getItem('userId');
    await deactivateAccount(userId);
    ElMessage.success('账号已注销');
    await logout();
    router.push('/register');
    
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Account deactivation failed:', error);
      ElMessage.error('账号注销失败');
    }
  }
};

const handleResetPassword = async () => {
  try {
    // 检查是否有邮箱
    if (!currentEmail.value) {
      ElMessage.warning('请先绑定邮箱');
      return;
    }

    // 重置表单状态
    newValue.value = ''; // 清空新密码
    verificationCode.value = ''; // 清空验证码
    
    // 打开对话框
    dialogType.value = 'resetPassword';
    dialogTitle.value = '重置密码';
    dialogVisible.value = true;
  } catch (error) {
    console.error('Reset password failed:', error);
    ElMessage.error(error.response?.data?.error || '重置密码失败');
  }
};

const submitChange = async () => {
  if (!verificationCode.value) {
    ElMessage.warning('请输入验证码');
    return;
  }

  try {
    loading.value = true;
    const userId = localStorage.getItem('userId');

    switch (dialogType.value) {
      case 'phone':
        await updateAccountSettings(userId, {
          phone: newValue.value
        });
        ElMessage.success('手机号更新成功');
        break;
        
      case 'email':
        await updateAccountSettings(userId, {
          email: newValue.value
        });
        ElMessage.success('邮箱更新成功');
        break;
        
      case 'wechat':
        await updateAccountSettings(userId, {
          wechat: newValue.value
        });
        ElMessage.success('微信更新成功');
        break;
        
      case 'resetPassword':
        if (!newValue.value) {
          ElMessage.warning('请输入新密码');
          return;
        }
        if (!verificationCode.value) {
          ElMessage.warning('请输入验证码');
          return;
        }
        
        await confirmResetPassword(
          currentEmail.value,
          verificationCode.value,
          newValue.value
        );
        
        ElMessage.success('密码重置成功，请重新登录');
        dialogVisible.value = false;
        await logout();
        router.push('/login');
        break;
        
      case 'deactivate':
        await ElMessageBox.confirm(
          '此操作将永久删除您的账号，是否继续？',
          '警告',
          {
            confirmButtonText: '确认删除',
            cancelButtonText: '取消',
            type: 'warning'
          }
        );
        
        await deactivateAccount(userId, verificationCode.value);
        ElMessage.success('账号已注销');
        await logout();
        router.push('/login');
        break;
    }

    dialogVisible.value = false;
    await fetchAccountSettings();
  } catch (error) {
    if (error === 'cancel') return;
    console.error('Operation failed:', error);
    ElMessage.error(
      error.response?.data?.message || 
      error.message || 
      '操作失败'
    );
  } finally {
    loading.value = false;
    verificationCode.value = '';
    newValue.value = '';
  }
};

// 组件卸载时清理定时器
onBeforeUnmount(() => {
  if (timer.value) {
    clearInterval(timer.value);
  }
});
</script>

<style scoped>
.page-wrapper {
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.page-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('@/assets/background/image02.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  animation: backgroundZoom 20s ease-in-out infinite; /* 修改动画 */
}

.page-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle, transparent 70%, white 100%);
}

.account-settings {
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box-card {
  width: 60%;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.9);
}

.card-header {
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
}

.account-row {
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #ebeef5;
}

.account-row:last-child {
  border-bottom: none;
}

.el-col {
  display: flex;
  align-items: center;
}

.el-button {
  margin-left: auto;
}

.verification-input {
  width: 100%;
  margin: 15px 0;
}

.dialog-footer {
  text-align: right;
}

@keyframes backgroundZoom {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
</style>
