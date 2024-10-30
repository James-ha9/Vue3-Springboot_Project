<template>
  <div class="page-wrapper">
    <div class="content-wrapper">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>

        <el-form-item label="职业方向" prop="career_direction">
          <el-input v-model="ruleForm.career_direction" />
        </el-form-item>

        <el-form-item label="职位" prop="position">
          <el-input v-model="ruleForm.position" />
        </el-form-item>

        <el-form-item label="公司" prop="company">
          <el-input v-model="ruleForm.company" />
        </el-form-item>

        <el-form-item label="个人网站" prop="personal_website">
          <el-input v-model="ruleForm.personal_website" />
        </el-form-item>

        <el-form-item label="个人简介" prop="bio">
          <el-input
            v-model="ruleForm.bio"
            type="textarea"
            :rows="4"
          />
        </el-form-item>

        <el-form-item label="兴趣标签" prop="interest_tags">
          <el-select
            v-model="ruleForm.interest_tags"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择或输入兴趣标签"
          >
            <el-option
              v-for="tag in interestOptions"
              :key="tag"
              :label="tag"
              :value="tag"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            保存修改
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeMount } from "vue";
import { updateUserProfile, getUserProfile, getAvatarUrl } from '@/api/user';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const formSize = ref("default");
const ruleFormRef = ref(null);
const ruleForm = reactive({
  name: "",
  career_direction: "",
  position: "",
  company: "",
  personal_website: "",
  bio: "",
  interest_tags: [],
  avatar_url: ""
});

const rules = reactive({
  name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  career_direction: [{ required: true, message: "请输入职业方向", trigger: "blur" }],
  position: [{ required: true, message: "请输入职位", trigger: "blur" }],
  company: [{ required: true, message: "请输入公司", trigger: "blur" }],
  personal_website: [{ required: true, message: "请输入个人网站", trigger: "blur" }],
  bio: [{ required: true, message: "请输入个人简介", trigger: "blur" }],
  interest_tags: [{ required: true, message: "至少选择一个兴趣标签", trigger: "change" }],
});

const router = useRouter();

// 添加认证检查
onBeforeMount(() => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!token || !token.split('.').length === 3 || !user) {
    // 清除可能损坏的数据
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    
    ElMessage.error('请先登录');
    router.push('/login');
    return;
  }
});

onMounted(async () => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID not found');
    }

    const response = await getUserProfile(userId);
    const profile = response.data.profile;
    
    if (profile) {
      // 更新表单数据
      Object.assign(ruleForm, {
        name: profile.username || '',
        career_direction: profile.careerDirection || '',
        position: profile.position || '',
        company: profile.company || '',
        personal_website: profile.personalWebsite || '',
        bio: profile.bio || '',
        interest_tags: profile.interestTags ? profile.interestTags.split(',') : []
      });
    }
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    ElMessage.error('获取个人资料失败');
  }
});

const submitForm = async (formEl) => {
  if (!formEl) return;
  
  await formEl.validate(async (valid) => {
    if (valid) {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('User ID not found');
        }

        // 构建提交数据
        const profileData = {
          username: ruleForm.name,
          careerDirection: ruleForm.career_direction,
          position: ruleForm.position,
          company: ruleForm.company,
          personalWebsite: ruleForm.personal_website,
          bio: ruleForm.bio,
          interestTags: ruleForm.interest_tags.join(',')
        };

        const response = await updateUserProfile(userId, profileData);
        if (response.data.profile) {
          ElMessage.success('个人资料更新成功');
          // 更新导航栏用户信息
          const navbarInstance = getCurrentInstance()?.parent?.refs?.navbar;
          if (navbarInstance) {
            navbarInstance.fetchUserInfo();
          }
        }
      } catch (error) {
        console.error('Failed to update profile:', error);
        ElMessage.error(error.response?.data?.message || '更新失败');
      }
    }
  });
};

const options = Array.from({ length: 10000 }, (_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));

// 更新后的兴趣标签选项
const interestOptions = [
  { value: "环保倡导", label: "环保倡导" },
  { value: "教育扶贫", label: "教育扶贫" },
  { value: "动物保护", label: "动物保护" },
  { value: "志愿服务", label: "志愿服务" },
  { value: "健康与卫生", label: "健康与卫生" },
  { value: "文化传播", label: "文化传播" },
  { value: "灾害救援", label: "灾害救援" },
  { value: "社会公平", label: "社会公平" },
  { value: "心理援助", label: "心理援助" },
  { value: "可再生能源", label: "可再生能源" },
  { value: "国际援助", label: "国际援助" },
  { value: "残障人士关爱", label: "残障人士关爱" },
  { value: "老年人关怀", label: "老年人关怀" },
  { value: "儿童权益保护", label: "儿童权益保护" },
  { value: "性别平等", label: "性别平等" },
];

const handleChange = (value, checked) => {
  const index = ruleForm.interests.indexOf(value);
  if (checked && index === -1) {
    ruleForm.interests.push(value);
  } else if (!checked && index !== -1) {
    ruleForm.interests.splice(index, 1);
  }
};
</script>

<style scoped>
.page-wrapper {
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.page-wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("@/assets/background/image02.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  animation: zoomInOut 14s ease-in-out infinite;
}

@keyframes zoomInOut {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.page-wrapper::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle, transparent 70%, white 100%);
}

.content-wrapper {
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

.demo-ruleForm {
  max-width: 600px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.interest-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.el-check-tag {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
