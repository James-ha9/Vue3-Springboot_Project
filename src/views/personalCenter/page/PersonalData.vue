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
import { updateUserProfile, getUserProfile } from '@/api/user';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { getAvatar } from '@/api/file';

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
  name: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
  ],
  career_direction: [
    { required: false }
  ],
  position: [
    { required: false }
  ],
  company: [
    { required: false }
  ],
  personal_website: [
    { required: false },
    { type: 'url', message: '请输入正确的网址格式', trigger: 'blur' }
  ],
  bio: [
    { required: false },
    { max: 500, message: "个人简介不能超过500字", trigger: "blur" }
  ],
  interest_tags: [
    { type: 'array', required: false }
  ]
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
    // console.log('Profile response:', response);
    
    if (response.data) {
      const profile = response.data;
      
      // 更新表单数据，使用可选链和空值合并操作符
      ruleForm.name = profile?.username ?? '';
      ruleForm.career_direction = profile?.careerDirection ?? '';
      ruleForm.position = profile?.position ?? '';
      ruleForm.company = profile?.company ?? '';
      ruleForm.personal_website = profile?.personalWebsite ?? '';
      ruleForm.bio = profile?.bio ?? '';
      ruleForm.interest_tags = profile?.interestTags ? 
        profile.interestTags.split(',').filter(Boolean) : 
        [];
        
      // console.log('Updated form data:', ruleForm);
    }
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    ElMessage.error('获取个人资料失败');
  }
});

const submitForm = async (formEl) => {
  if (!formEl) return;
  
  try {
    const valid = await formEl.validate();
    if (!valid) return;

    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID not found');
    }

    // 构建提交数据，过滤掉空值
    const profileData = {
      username: ruleForm.name,
      ...(ruleForm.career_direction && { careerDirection: ruleForm.career_direction }),
      ...(ruleForm.position && { position: ruleForm.position }),
      ...(ruleForm.company && { company: ruleForm.company }),
      ...(ruleForm.personal_website && { personalWebsite: ruleForm.personal_website }),
      ...(ruleForm.bio && { bio: ruleForm.bio }),
      ...(ruleForm.interest_tags.length > 0 && { 
        interestTags: ruleForm.interest_tags.join(',') 
      })
    };

    console.log('Submitting profile data:', profileData);

    const response = await updateUserProfile(userId, profileData);
    console.log('Update response:', response);

    ElMessage.success('个人资料更新成功');
  } catch (error) {
    console.error('Failed to update profile:', error);
    ElMessage.error(error.response?.data?.message || '更新失败');
  }
};

// 修改 interestOptions 的格式
const interestOptions = [
  "环保倡导",
  "教育扶贫",
  "动物保护",
  "志愿服务",
  "健康与卫生",
  "文化传播",
  "灾害救援",
  "社会公平",
  "心理援助",
  "可再生能源",
  "国际援助",
  "残障人士关爱",
  "老年人关怀",
  "儿童权益保护",
  "性别平等"
];

// 添加重置表单的方法
const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
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
