<template>
  <input
    type="file"
    ref="avatarInput"
    @change="handleAvatarUpload"
    accept="image/*"
    style="display: none"
  />

  <div class="navbar" ref="navbar" :class="{ scrolled: isScrolled }">
    <router-link class="logo-a" to="/main/charitable-projects/platform-charity"
      ><!----><img class="logo" src="../../assets/logo-icon.png" alt="Logo"
    /></router-link>
    <div class="logo-container">
      <h1 class="logo-text-c">益行山区</h1>
      <h2 class="logo-text-e">YingXing GOING!</h2>
    </div>
    <nav class="nav-menu">
      <router-link
        v-for="item in menuItems"
        :key="item.name"
        :to="getRouteForItem(item)"
        class="nav-item"
        :class="{ active: isActiveRoute(item) }"
        @mouseover="showDropdown(item.name)"
        @mouseleave="handleMenuItemMouseLeave"
        @click="handleMenuItemClick(item)"
      >
        <span
          v-if="item.name === 'personal-center'"
          class="personal-center"
          :ref="setAvatarRef"
        >
          <div 
            class="avatar-container"
            @mouseover="showAvatarDropdownMenu"
            @mouseleave="hideAvatarDropdownMenu"
          >
            <img 
              v-if="!avatarLoading"
              :src="userAvatar" 
              :alt="username"
              @error="handleAvatarError"
            />
            <div v-else class="avatar-placeholder">
              <el-icon class="loading-icon"><Loading /></el-icon>
            </div>
          </div>
        </span>
        <span v-else>{{ item.emoji }} {{ item.label }}</span>
      </router-link>
    </nav>
    <transition
      name="dropdown"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <div
        v-if="activeDropdown"
        class="dropdown-container"
        ref="dropdownContainer"
        @mouseover="clearHideDropdownTimer"
        @mouseleave="handleDropdownMouseLeave"
      >
        <div class="dropdown">
          <div class="dropdown-content">
            <h3>{{ activeDropdown.emoji }} {{ activeDropdown.label }}</h3>
            <ul>
              <li
                v-for="subItem in activeDropdown.subItems"
                :key="subItem.name"
                @click="handleSubItemClick(subItem)"
              >
                <router-link :to="{ name: subItem.name }">
                  {{ subItem.emoji }} {{ subItem.label }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
    <Teleport to="body">
      <transition name="dropdown">
        <div
          v-if="showAvatarDropdown"
          class="avatar-dropdown"
          :style="avatarDropdownPosition"
          @mouseover="clearAvatarDropdownTimer"
          @mouseleave="hideAvatarDropdownMenu"
        >
          <div class="avatar-dropdown-item" @click="triggerAvatarUpload">
            更改头像
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getUserProfile } from "@/api/user";
import defaultAvatarImg from "@/assets/home/default_image.png";
import { ElMessage } from "element-plus";
import { logout } from "@/api/auth";
import axios from "axios";
import { getAvatar, getAvatarUrl, uploadAvatar } from "@/api/file";
import { Loading } from "@element-plus/icons-vue";

const route = useRoute();
const router = useRouter();
const activeDropdown = ref(null);
const dropdownContainer = ref(null);
let hideDropdownTimer = null;
const isScrolled = ref(false);

const beforeEnter = (el) => {
  el.style.height = "0";
};

const enter = (el) => {
  nextTick(() => {
    el.style.height = el.scrollHeight + "px";
  });
};

const isActiveRoute = (item) => {
  if (item.subItems && item.subItems.length > 0) {
    return item.subItems.some((subItem) => subItem.name === route.name);
  }
  return item.name === route.name;
};

const getRouteForItem = (item) => {
  if (item.name === "personal-center") {
    return { name: "personal-data" };
  }
  if (item.subItems && item.subItems.length > 0) {
    return { name: item.subItems[0].name };
  }
  return { name: item.name };
};

const handleMenuItemClick = (item) => {
  if (item.name === "personal-center") {
    if (!checkLoginStatus()) {
      ElMessage.warning("请先登录");
      router.push("/login");
      return;
    }
    router.push({ name: "personal-data" });
  } else if (item.subItems && item.subItems.length > 0) {
    router.push({ name: item.subItems[0].name });
  } else {
    router.push({ name: item.name });
  }
  activeDropdown.value = null;
};

const handleSubItemClick = (subItem) => {
  if (!subItem.name) return;
  
  // 特殊处理 recycling-preview 路由
  // if (subItem.name === 'recycling-preview') {
  //   router.push('/main/community/recycling'); // 或者跳转到一个默认的展示页面
  //   return;
  // }
  
  router.push({ name: subItem.name });
  activeDropdown.value = null;
};

const leave = (el) => {
  el.style.height = "0";
};

const menuItems = [
  // {
  //   label: "首页",
  //   name: "home",
  //   emoji: "🏠",
  // },
  {
    label: "公益",
    name: "charitable-projects",
    emoji: "🌟",
    subItems: [
      { label: "平台公益", name: "platform-charity", emoji: "🏆" },
      { label: "绿水青山", name: "environmental-protection", emoji: "🌿" },
      { label: "乡村振兴", name: "rural-revitalization", emoji: "🏡" },
      { label: "应急救灾", name: "disaster-relief", emoji: "🆘" },
      // { label: "助残扶弱", name: "disability-support", emoji: "🤝" },
      { label: "健康公益", name: "health-charity", emoji: "❤️" },
      { label: "国际公益", name: "international-charity", emoji: "🌍" },
    ],
  },
  {
    label: "社区",
    name: "community",
    emoji: "🤗",
    subItems: [
      { label: "益留言", name: "forum", emoji: "💬" },
      { label: "益回收", name: "recycling", emoji: "♻️" },
      { label: "照片墙", name: "photoWall", emoji: "📸" },
      { label: "益AI", name: "ai", emoji: "🤖" },
      { label: "益物展", name: "recycling-preview", emoji: "🎁" }
    ],
  },
  // {
  //   label: "关于",
  //   name: "about-us",
  //   emoji: "ℹ️",
  //   subItems: [
  //     { label: "基金会简介", name: "foundation-introduction", emoji: "📚" },
  //     { label: "理事会简介", name: "board-intro", emoji: "👥" },
  //     { label: "荣誉表彰", name: "honors", emoji: "🏅" },
  //     { label: "联系我们", name: "contact-us", emoji: "📞" },
  //   ],
  // },
  {
    label: "资讯",
    name: "information",
    emoji: "📰",
    subItems: [
      { label: "活动新闻", name: "activity-news", emoji: "📣" },
      { label: "研究报告", name: "research-reports", emoji: "📊" },
    ],
  },
  {
    label: "个人中心",
    name: "personal-center",
    emoji: "👤",
    subItems: [
      { label: "个人数据", name: "personal-data", emoji: "📊" },
      { label: "账户设置", name: "account-setting", emoji: "⚙️" },
    ],
  },
];

const activeItem = computed(() => route.name);

const avatarInput = ref(null);
const showAvatarDropdown = ref(false);

const avatarRef = ref(null);
const avatarDropdownPosition = ref({ top: 'px', left: '0px' });

const avatarDropdownTimer = ref(null);

// 设置ref的函数
const setAvatarRef = (el) => {
  if (el) {
    avatarRef.value = el;
  }
};

// 更新下拉框位置的函数
const updateDropdownPosition = () => {
  if (!avatarRef.value) return;

  nextTick(() => {
    try {
      const element = avatarRef.value;
      if (element && typeof element.getBoundingClientRect === 'function') {
        const rect = element.getBoundingClientRect();
        avatarDropdownPosition.value = {
          top: `${rect.bottom + window.scrollY - 10}px`,
          left: `${rect.left + (rect.width - 100) / 2}px`,
        };
      }
    } catch (error) {
      console.error('Failed to calculate avatar dropdown position:', error);
    }
  });
};

// 显示下拉菜单
const showAvatarDropdownMenu = () => {
  clearTimeout(avatarDropdownTimer.value);
  updateDropdownPosition();
  showAvatarDropdown.value = true;
};

// 隐藏下拉菜单
const hideAvatarDropdownMenu = () => {
  avatarDropdownTimer.value = setTimeout(() => {
    showAvatarDropdown.value = false;
  }, 200);
};

// 清除定时器
const clearAvatarDropdownTimer = () => {
  if (avatarDropdownTimer.value) {
    clearTimeout(avatarDropdownTimer.value);
  }
};

// 在组件挂载时添加监听
onMounted(() => {
  // 确保个人中心菜单项存在时才更新位置
  if (menuItems.some(item => item.name === 'personal-center')) {
    nextTick(() => {
      updateDropdownPosition();
    });
  }
});

const showDropdown = (name) => {
  if (name === "personal-center") {
    nextTick(() => {
      showAvatarDropdown.value = true;
    });
    return;
  }
  showAvatarDropdown.value = false;
  activeDropdown.value = menuItems.find((item) => item.name === name);
};

const handleMenuItemMouseLeave = (event) => {
  hideDropdownTimer = setTimeout(() => {
    const target = event.relatedTarget;
    if (
      !target ||
      (!target.closest(".avatar-dropdown") && !target.closest(".nav-item"))
    ) {
      activeDropdown.value = null;
      showAvatarDropdown.value = false;
    }
  }, 200);
};

const triggerAvatarUpload = () => {
  if (!checkLoginStatus()) {
    ElMessage.warning("请先登录");
    router.push('/login');
    return;
  }
  
  // 使用原生 DOM API 创建和触发文件选择
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = handleAvatarUpload;
  input.click();
};

const handleDropdownMouseLeave = (event) => {
  if (dropdownContainer.value) {
    const dropdownRect = dropdownContainer.value.getBoundingClientRect();
    const { clientX, clientY } = event;

    // 只有当鼠标位置在下拉框的下方或左右两侧时才启动隐藏计时器
    if (
      clientY > dropdownRect.bottom ||
      clientX < dropdownRect.left ||
      clientX > dropdownRect.right
    ) {
      startHideDropdownTimer();
    }
  }
};

const startHideDropdownTimer = () => {
  hideDropdownTimer = setTimeout(() => {
    activeDropdown.value = null;
  }, 200);
};

const clearHideDropdownTimer = () => {
  clearTimeout(hideDropdownTimer);
};

const handleClickOutside = (event) => {
  if (activeDropdown.value) {
    const navbar = document.querySelector(".navbar");
    const dropdown = dropdownContainer.value;
    if (
      !navbar ||
      !dropdown ||
      (!navbar.contains(event.target) && !dropdown.contains(event.target))
    ) {
      activeDropdown.value = null;
    }
  }
};

const checkScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const defaultAvatar = defaultAvatarImg;

const userAvatar = ref(defaultAvatar);
const username = ref("");

const handleAvatarError = (e) => {
  e.target.src = defaultAvatar;
};

// 添加加载状态
const avatarLoading = ref(true);

const fetchUserInfo = async () => {
  avatarLoading.value = true; // 开始加载

  if (!localStorage.getItem('token')) {
    userAvatar.value = defaultAvatar;
    avatarLoading.value = false;
    return;
  }

  try {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID not found');
    }

    // 获取用户信息
    const response = await getUserProfile(userId);
    const profile = response.data.profile;

    // 从本地存储获取用户基本信息
    const user = JSON.parse(localStorage.getItem('user'));
    username.value = user?.username || '';

    // 获取头像URL
    const avatarFilename = await getAvatar(userId);
    if (avatarFilename) {
      const img = new Image();
      img.src = getAvatarUrl(avatarFilename);
      img.onload = () => {
        userAvatar.value = img.src;
        avatarLoading.value = false;
      };
      img.onerror = () => {
        userAvatar.value = defaultAvatar;
        avatarLoading.value = false;
      };
    } else {
      userAvatar.value = defaultAvatar;
      avatarLoading.value = false;
    }
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    userAvatar.value = defaultAvatar;
    avatarLoading.value = false;

    if (error.response?.status === 401) {
      ElMessage.error('请重新登录');
      logout();
    }
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  window.addEventListener("scroll", checkScroll);
  fetchUserInfo();
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  window.removeEventListener("scroll", checkScroll);
});

const checkLoginStatus = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user || token.split(".").length !== 3) {
    // 清除无效的登录状态
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    return false;
  }
  return true;
};

const handleLogout = async () => {
  try {
    const success = await logout();
    if (success) {
      ElMessage.success("已功退出登录");
      await router.push("/login");
    } else {
      throw new Error("登出失败");
    }
  } catch (error) {
    console.error("Logout failed:", error);
    ElMessage.error("登出失败，请重试");
  }
};

let hideAvatarDropdownTimer = null;

const clearHideAvatarDropdownTimer = () => {
  if (hideAvatarDropdownTimer) {
    clearTimeout(hideAvatarDropdownTimer);
  }
};

const hideAvatarDropdown = () => {
  hideAvatarDropdownTimer = setTimeout(() => {
    showAvatarDropdown.value = false;
  }, 200);
};

const handleAvatarUpload = async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  // 验证文件类型
  if (!file.type.startsWith('image/')) {
    ElMessage.error('请上传图片文件');
    return;
  }

  // 验证文件大小（例如：2MB）
  const maxSize = 2 * 1024 * 1024;
  if (file.size > maxSize) {
    ElMessage.error('图片大小不能超过2MB');
    return;
  }

  try {
    const userId = localStorage.getItem('userId');
    if (!userId) throw new Error('User ID not found');

    // 创建 FormData
    const formData = new FormData();
    formData.append('file', file);

    // 添加调试信息
    console.log('Uploading file:', file);
    console.log('FormData contents:', Array.from(formData.entries()));

    // 上传头像
    const response = await uploadAvatar(userId, formData);
    console.log('Upload response:', response); // 添加这行来查看响应内容

    if (response.data) {
      // 重新获取头像
      await fetchUserInfo();
      ElMessage.success('头像上传成功');
    } else {
      console.error('Unexpected response format:', response);
      throw new Error('Upload failed: Invalid response format');
    }

    // 关闭下拉菜单
    showAvatarDropdown.value = false;
  } catch (error) {
    console.error('Avatar upload failed:', error);
    if (error.response?.data?.message) {
      ElMessage.error(error.response.data.message);
    } else {
      ElMessage.error('头像上传失败，请重试');
    }
  } finally {
    // 使用可选链操作符来避免空引用错误
    if (event.target) {
      event.target.value = '';
    }
  }
};

const fetchUserAvatar = async () => {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const response = await axios.get(`/users/${userId}/avatar`, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    userAvatar.value = URL.createObjectURL(response.data);
  } catch (error) {
    console.error("Failed to fetch avatar:", error);
    userAvatar.value = defaultAvatar;
  }
};

// 在组件挂载时获取头像
onMounted(() => {
  fetchUserAvatar();
});
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 10vh;
  min-height: 50px;
  padding: 0 2%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(
    to right,
    #d7eaf3,
    rgb(198, 216, 204)
  ); // 淡蓝色半透明背景
  z-index: 1000;
  box-sizing: border-box;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &.scrolled {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px); /* 添加模糊效果，模拟磨砂玻璃 */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 阴影增强立���感 */
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}

.logo-a {
  width: 4%;
}

.logo {
  height: 20%;
  width: 100%;
}

.logo,
.logo-text {
  object-fit: contain;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05); // 轻微放大效果
  }
}

.logo-container {
  margin-left: 1%;
  display: flex;
  flex-direction: column; // 垂直排列
  justify-content: center; // 垂直齐到中间
  margin-left: 10px; // 可选，调整 logo 和文本之间的间距
  width: 120px;
}

.logo {
  margin-left: 2%;
}

.logo-text-c {
  height: 40%;
  font-size: 15px;
  margin: 0;
}

.logo-text-e {
  height: 40%;
  font-size: 12px;
  margin: 0;
}

.nav-menu {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 10vh;
}

.personal-center {
  width: 90%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.avatar-container {
  width: 40px;
  height: 40px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
}

.avatar-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-icon {
  animation: rotate 1s linear infinite;
}

.nav-item {
  font-size: 1.3vw;
  padding: 0 1vw;
  height: 100%;
  line-height: 10vh;
  white-space: nowrap;
  margin-right: 3.5vw;
  text-decoration: none;
  color: #333;
  transition: color 0.3s, transform 0.3s;
  width: 7%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:last-child {
    margin-right: 0;
  }

  &.active {
    color: #31755d;
  }

  &:hover {
    color: #31755d;
    transform: translateY(-px);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 10%;
    left: 0;
    height: 2px;
    width: 0;
    background-color: #31755d;
    transition: width 0.3s ease-in-out, left 0.3s ease-in-out;
  }

  &:hover::after {
    width: 110%;
    left: 0;
  }

  &:first-child {
    object-fit: contain;
    transition: transform 0.3s ease;

    // 取消下划线效果
    &::after {
      content: none;
    }

    &:hover {
      transform: scale(1.05); // 轻微放大果
    }
  }
  &:last-child {
    margin-right: 0;
    object-fit: contain;
    transition: transform 0.3s ease;

    // 取消下划线效果
    &::after {
      content: none;
    }

    &:hover {
      transform: scale(1.05); // 轻微放大效果
    }
  }
}

.dropdown-container {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8); /* 添加透明度 */
  z-index: 999;
  overflow: hidden;
  transition: height 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dropdown {
  margin: 0 auto;
  width: 100%;
  border: none;
  padding: 2%;
  box-sizing: border-box;
}

.dropdown-content {
  display: flex;
  align-items: flex-start;

  h3 {
    width: 20%;
    margin: 0;
    padding-right: 20px;
    border-right: none;
    font-size: 1.2em;
  }

  ul {
    width: 80%;
    list-style-type: none;
    padding-left: 1%;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: right;

    li {
      width: 10%;
      padding: 5px 0;
      a {
        text-decoration: none;
        color: #333;
        transition: color 0.3s, transform 0.3s;

        &:hover {
          color: #31755d;
          transform: translateX(5px); // 轻微右移效果
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .nav-item {
    font-size: 3vw;
    padding: 0 1vw;
    margin-right: 2vw;
  }

  .dropdown-content {
    flex-direction: column;

    h3 {
      width: 100%;
      border-right: none;
      border-bottom: 1px solid #ddd;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }

    ul {
      width: 100%;
      padding-left: 0;

      li {
        width: 50%;
      }
    }
  }
}

.avatar-dropdown {
  position: fixed;
  top: 100px;
  left: 0;
  width: 100px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  z-index: 1001;
  transform-origin: top center;

  &:hover {
    display: block;
  }
}

.avatar-dropdown-item {
  padding: 8px 16px;
  cursor: pointer;
  white-space: nowrap;
  text-align: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f5f5f5;
    color: #31755d;
  }
}

// 添加过渡动画
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

// 添加淡入淡出过渡效果
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
