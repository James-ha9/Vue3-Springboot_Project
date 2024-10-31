<template>
  <div class="function-container">
    <div class="text-area">
      <el-carousel :interval="4000" height="200px" autoplay>
        <el-carousel-item v-for="project in projects" :key="project.id">
          <div class="project-card">
            <img
              :src="project.image"
              alt="project image"
              style="object-fit: cover; width: 100%; height: 100%"
            />
            <div class="project-info">
              <h3>{{ project.name }}</h3>
              <p>{{ project.description }}</p>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-divider class="divider" />
    <div class="button-container">
      <el-button type="primary" plain @click="handleCreateButtonClick"
        >发帖交流</el-button
      >
      <el-button type="success" plain>加入益行</el-button>
      <el-button type="warning" plain>助力益行</el-button>
    </div>
    <el-divider class="divider" />
    <div class="statistic">
      <el-row :gutter="16">
        <el-col :span="8">
          <div class="statistic-card">
            <el-statistic :value="98500">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  今日活跃用户数
                  <el-tooltip
                    effect="dark"
                    content="当日内登录过益行的用户数量"
                    placement="top"
                  >
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item">
                <span>相比昨日</span>
                <span class="green">
                  24%
                  <el-icon>
                    <CaretTop />
                  </el-icon>
                </span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="statistic-card">
            <el-statistic :value="693700">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  本月活跃用户数
                  <el-tooltip
                    effect="dark"
                    content="本月内登录过益行的用户数量"
                    placement="top"
                  >
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item">
                <span>月度环比</span>
                <span class="red">
                  12%
                  <el-icon>
                    <CaretBottom />
                  </el-icon>
                </span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="statistic-card">
            <el-statistic :value="22" title="今日新增项目">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  今日新增项目
                </div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item">
                <span>相比昨日</span>
                <span class="green">
                  10
                  <el-icon>
                    <CaretTop />
                  </el-icon>
                </span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-divider class="divider" />
    <div class="calendar">
      <div class="calendar-container">
        <el-image :src="imageUrl" :fit="fit" />
        <div class="calendar-text">
          <h1>19</h1>
          <h2>2024.10</h2>
          <h3>桂花留晚色，帘影淡秋光</h3>
        </div>
      </div>
    </div>
    <el-divider class="divider" />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

import image1 from "@/assets/background/bg7.png";
import image2 from "@/assets/background/bg5.png";
import image3 from "@/assets/background/bg12.png";
import image4 from "@/assets/background/love1.png";

const route = useRoute();
const router = useRouter();
let fit = ref(null);

const imageUrl = ref(image4);

const projects = reactive([
  {
    id: 1,
    name: "益行公益项目1",
    description: "这是一个公益项目1的描述",
    image: image1,
    status: 1,
  },
  {
    id: 2,
    name: "益行公益项目2",
    description: "这是一个公益项目2的描述",
    image: image2,
    status: 2,
  },
  {
    id: 3,
    name: "益行公益项目3",
    description: "这是一个公益项目2的描述",
    image: image3,
    status: 3,
  },
]);

const handleCreateButtonClick = () => {
  router.push({ name: "create" });
};
</script>

<style lang="scss" scoped>
.function-container {
  .text-area {
    height: 200px;
    line-height: 50px;
    font-weight: 800;
  }

  .el-carousel {
    image {
      object-fit: cover;
    }
  }

  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
  }

  .statistic {
    margin: 20px;
    padding: 20px;
    .statistic-card {
      .statistic-footer {
        .footer-item {
          .green {
            color: var(--el-color-success);
          }

          .red {
            color: var(--el-color-error);
          }
        }
      }
    }
  }

  .calendar {
    display: flex;
    justify-content: center;
    .calendar-container {
      position: relative;
      height: 600px;
      width: 450px;
      background-color: black;
      border-radius: 10px;
      overflow: hidden;
      margin-top: 50px;
      margin-bottom: 50px;

      .el-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.8s ease;
      }

      .el-image:hover {
        transform: scale(1.1);
      }

      .calendar-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 24px;
        font-weight: bold;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);

        h1 {
          margin-top: 50px;
          margin-bottom: 30px;
        }

        h3 {
          white-space: nowrap;
        }
      }
    }
  }
}
</style>

