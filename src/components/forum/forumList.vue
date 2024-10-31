<template>
  <div class="forum-list">
    <class class="forum-item" v-for="item in data" :key="item.id">
      <div class="main">
        <!-- <div class="avatar">
          <el-icon :size="30"><User /></el-icon>
        </div> -->
        <el-avatar
          shape="square"
          :size="50"
          :fit="fit"
          :src="item.user.avatar"
        />
        <div class="info">
          <div class="description">
            <!-- <router-link>
              {{ item.description }}
            </router-link> -->
            <a>
              {{ item.description }}
            </a>
          </div>
          <div class="user">
            <!-- <router-link>
              {{ item.user.nickname }}
            </router-link> -->
            <a>
              {{ item.user.nickname }}
            </a>
          </div>
        </div>
      </div>
      <el-divider class="divider" />
    </class>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import avatar1 from "@/assets/background/ActivityNews01.jpeg";
import avatar2 from "@/assets/background/ActivityNews02.jpeg";
import avatar3 from "@/assets/background/ActivityNews03.jpeg";
import avatar4 from "@/assets/background/ActivityNews04.jpeg";
import avatar5 from "@/assets/background/ActivityNews05.jpeg";

let fit = ref(null);

const data = reactive([
  {
    user: {
      avatar: avatar1,
      nickname: "sam1",
      id: 1,
      name: "sam wang",
      email: "12345@qq.com",
      sex: 1,
      create_time: "2020-07-10T03:13:22.000000Z",
      update_time: "2023-04-24T07:50:56.000000Z",
    },
    description: "20来度，这个温度真舒服，适合躺平",
    id: 1,
    causer_id: 1,
    event: "created",
    create_time: "2024-10-09T00:40:30.000000Z",
    update_time: "2024-10-09T00:40:30.000000Z",
  },
  {
    user: {
      avatar: avatar2,
      nickname: "lily1",
      id: 2,
      name: "lily",
      email: "12345@qq.com",
      sex: 0,
      create_time: "2020-07-10T03:13:22.000000Z",
      update_time: "2023-04-24T07:50:56.000000Z",
    },
    description: "每天坚持学习",
    id: 2,
    causer_id: 2,
    event: "created",
    create_time: "2024-10-09T00:40:30.000000Z",
    update_time: "2024-10-09T00:40:30.000000Z",
  },
  {
    user: {
      avatar: avatar3,
      nickname: "sam2",
      id: 3,
      name: "sam wang",
      email: "12345@qq.com",
      sex: 1,
      create_time: "2020-07-10T03:13:22.000000Z",
      update_time: "2023-04-24T07:50:56.000000Z",
    },
    description: "支持论坛，来签到了",
    id: 3,
    causer_id: 3,
    event: "created",
    create_time: "2024-10-09T00:40:30.000000Z",
    update_time: "2024-10-09T00:40:30.000000Z",
  },
  {
    user: {
      avatar: avatar4,
      nickname: "lily2",
      id: 4,
      name: "lily",
      email: "12345@qq.com",
      sex: 0,
      create_time: "2020-07-10T03:13:22.000000Z",
      update_time: "2023-04-24T07:50:56.000000Z",
    },
    description: "Hello World!",
    id: 4,
    causer_id: 4,
    event: "created",
    create_time: "2024-10-09T00:40:30.000000Z",
    update_time: "2024-10-09T00:40:30.000000Z",
  },
  {
    user: {
      avatar: avatar5,
      nickname: "sam3",
      id: 5,
      name: "sam wang",
      email: "12345@qq.com",
      sex: 1,
      create_time: "2020-07-10T03:13:22.000000Z",
      update_time: "2023-04-24T07:50:56.000000Z",
    },
    description: "坚持每天，积极向上",
    id: 5,
    causer_id: 5,
    event: "created",
    create_time: "2024-10-09T00:40:30.000000Z",
    update_time: "2024-10-09T00:40:30.000000Z",
  },
  {
    user: {
      avatar: avatar1,
      nickname: "sam1",
      id: 6,
      name: "sam wang",
      email: "12345@qq.com",
      sex: 1,
      create_time: "2020-07-10T03:13:22.000000Z",
      update_time: "2023-04-24T07:50:56.000000Z",
    },
    description: "20来度，这个温度真舒服，适合躺平",
    id: 6,
    causer_id: 6,
    event: "created",
    create_time: "2024-10-09T00:40:30.000000Z",
    update_time: "2024-10-09T00:40:30.000000Z",
  },
  {
    user: {
      avatar: avatar2,
      nickname: "lily1",
      id: 7,
      name: "lily",
      email: "12345@qq.com",
      sex: 0,
      create_time: "2020-07-10T03:13:22.000000Z",
      update_time: "2023-04-24T07:50:56.000000Z",
    },
    description: "每天坚持学习",
    id: 7,
    causer_id: 7,
    event: "created",
    create_time: "2024-10-09T00:40:30.000000Z",
    update_time: "2024-10-09T00:40:30.000000Z",
  },
  {
    user: {
      avatar: avatar3,
      nickname: "sam2",
      id: 8,
      name: "sam wang",
      email: "12345@qq.com",
      sex: 1,
      create_time: "2020-07-10T03:13:22.000000Z",
      update_time: "2023-04-24T07:50:56.000000Z",
    },
    description: "支持论坛，来签到了",
    id: 8,
    causer_id: 8,
    event: "created",
    create_time: "2024-10-09T00:40:30.000000Z",
    update_time: "2024-10-09T00:40:30.000000Z",
  },
  {
    user: {
      avatar: avatar4,
      nickname: "lily2",
      id: 9,
      name: "lily",
      email: "12345@qq.com",
      sex: 0,
      create_time: "2020-07-10T03:13:22.000000Z",
      update_time: "2023-04-24T07:50:56.000000Z",
    },
    description: "Hello World!",
    id: 9,
    causer_id: 9,
    event: "created",
    create_time: "2024-10-09T00:40:30.000000Z",
    update_time: "2024-10-09T00:40:30.000000Z",
  },
  {
    user: {
      avatar: avatar5,
      nickname: "sam3",
      id: 10,
      name: "sam wang",
      email: "12345@qq.com",
      sex: 1,
      create_time: "2020-07-10T03:13:22.000000Z",
      update_time: "2023-04-24T07:50:56.000000Z",
    },
    description: "坚持每天，积极向上",
    id: 10,
    causer_id: 10,
    event: "created",
    create_time: "2024-10-09T00:40:30.000000Z",
    update_time: "2024-10-09T00:40:30.000000Z",
  },
  {
    user: {
      avatar: avatar1,
      nickname: "sam1",
      id: 11,
      name: "sam wang",
      email: "12345@qq.com",
      sex: 1,
      create_time: "2020-07-10T03:13:22.000000Z",
      update_time: "2023-04-24T07:50:56.000000Z",
    },
    description: "20来度，这个温度真舒服，适合躺平",
    id: 11,
    causer_id: 11,
    event: "created",
    create_time: "2024-10-09T00:40:30.000000Z",
    update_time: "2024-10-09T00:40:30.000000Z",
  },
  {
    user: {
      avatar: avatar2,
      nickname: "lily1",
      id: 12,
      name: "lily",
      email: "12345@qq.com",
      sex: 0,
      create_time: "2020-07-10T03:13:22.000000Z",
      update_time: "2023-04-24T07:50:56.000000Z",
    },
    description: "每天坚持学习",
    id: 12,
    causer_id: 12,
    event: "created",
    create_time: "2024-10-09T00:40:30.000000Z",
    update_time: "2024-10-09T00:40:30.000000Z",
  },
  {
    user: {
      avatar: avatar3,
      nickname: "sam2",
      id: 13,
      name: "sam wang",
      email: "12345@qq.com",
      sex: 1,
      create_time: "2020-07-10T03:13:22.000000Z",
      update_time: "2023-04-24T07:50:56.000000Z",
    },
    description: "支持论坛，来签到了",
    id: 13,
    causer_id: 13,
    event: "created",
    create_time: "2024-10-09T00:40:30.000000Z",
    update_time: "2024-10-09T00:40:30.000000Z",
  },
  {
    user: {
      avatar: avatar4,
      nickname: "lily2",
      id: 14,
      name: "lily",
      email: "12345@qq.com",
      sex: 0,
      create_time: "2020-07-10T03:13:22.000000Z",
      update_time: "2023-04-24T07:50:56.000000Z",
    },
    description: "Hello World!",
    id: 14,
    causer_id: 14,
    event: "created",
    create_time: "2024-10-09T00:40:30.000000Z",
    update_time: "2024-10-09T00:40:30.000000Z",
  },
  {
    user: {
      avatar: avatar5,
      nickname: "sam3",
      id: 15,
      name: "sam wang",
      email: "12345@qq.com",
      sex: 1,
      create_time: "2020-07-10T03:13:22.000000Z",
      update_time: "2023-04-24T07:50:56.000000Z",
    },
    description: "坚持每天，积极向上",
    id: 15,
    causer_id: 15,
    event: "created",
    create_time: "2024-10-09T00:40:30.000000Z",
    update_time: "2024-10-09T00:40:30.000000Z",
  },
]);
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