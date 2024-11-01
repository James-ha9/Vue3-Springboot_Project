<template>
  <el-row>
    <el-col :span="24">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical-demo"
        :router="true"
      >
        <el-sub-menu index="user-settings">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>用户设置</span>
          </template>
          <el-menu-item 
            v-for="item in menuItems" 
            :key="item.name"
            :index="item.name"
            :route="{ name: item.name }"
          >
            {{ item.label }}
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { Setting } from "@element-plus/icons-vue";

const route = useRoute();

// 计算当前激活的菜单项
const activeIndex = computed(() => route.name);

const menuItems = [
  {
    name: "personal-data",
    label: "个人资料",
  },
  {
    name: "account-setting",
    label: "账户设置",
  },
];
</script>

<style scoped>
.el-menu-vertical-demo {
  border-right: none;
}

.el-menu-item.is-active {
  background-color: #ecf5ff;
}
</style>
