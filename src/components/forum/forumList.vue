<template>
  <div class="forum-list">
    <div class="forum-item" v-for="item in forumList" :key="item.bbsPost.id">
      <div class="main">
        <el-avatar
          shape="square"
          :size="50"
          :fit="fit"
          :src="item.user.avatarUrl"
        />
        <div class="info">
          <div class="description">
            <router-link :to="`/forum/detail/${item.bbsPost.id}`">
              {{ item.bbsPost.title }}
            </router-link>
          </div>
          <div class="user">
            <router-link :to="`/user/${item.user.userId}`">
              {{ item.user.username }}
            </router-link>
          </div>
        </div>
      </div>
      <el-divider class="divider" />
    </div>
    <Pagination />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getForumList } from "@/api/forum";

let fit = ref('cover');
const forumList = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);

// 获取论坛列表数据
const fetchForumList = async () => {
  try {
    const response = await getForumList(currentPage.value, pageSize.value);
    console.log('API Response:', response);

    if (response.data && Array.isArray(response.data.list)) {
      forumList.value = response.data.list;
    } else {
      forumList.value = [];
      console.error('Unexpected data format:', response.data);
    }
  } catch (error) {
    console.error('Error fetching forum list:', error);
    forumList.value = [];
  }
};

onMounted(() => {
  fetchForumList();
});
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.forum-list {
  .main {
    height: 85px;
    display: flex;
    align-items: center;

    .user {
      height: 20px;
      width: 20px;
    }

    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      // background-color: rgb(245, 245, 245);
      border-radius: 5px;
    }
    .info {
      height: 40px;
      margin-left: 10px;
      margin-bottom: 5px;
      .description {
        display: block;
        .router-link-active {
          color: #31755d;
          font-weight: 800;
          transition: color 0.2s ease;
        }
        .router-link-active:hover {
          color: #14ae78;
        }
      }

      .user {
        .router-link-active {
          color: #b58c1d;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .router-link-active:hover {
          color: #e3c571;
        }
      }
    }
  }
}

.divider {
  margin: 0;
}
</style>