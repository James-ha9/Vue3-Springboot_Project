<template>
  <div v-if="!isDetailView" class="background">
    <div class="title-content">
      <div class="title">活动新闻</div>
      <div class="subtitle">
        公益的本质是“唤醒”人的善意，为此我们一直不懈努力
      </div>
    </div>
    <div class="projects">
      <div class="project-list">
        <router-link
          v-for="item in paginatedProjects"
          :key="item.id"
          :to="item.link"
          class="project-item"
          @click="isDetailView = true"
        >
          <!-- 确保每个 project-item 只显示一个图片 -->
          <img :src="item.image" alt="" />
          <div class="description">
            {{ item.title }}
            <div class="data">{{ item.date }}</div>
          </div>
        </router-link>
      </div>
      <!-- Pagination Controls -->
      <div class="page">
        <a
          v-if="currentPage > 1"
          @click.prevent="changePage(currentPage - 1)"
          class="arrow prev"
        >
          &lt;
        </a>
        <a
          v-for="page in totalPages"
          :key="page"
          :href="'/news/list/' + page"
          :class="{ active: currentPage === page }"
          @click.prevent="changePage(page)"
        >
          {{ page }}
        </a>
        <a
          v-if="currentPage < totalPages"
          @click.prevent="changePage(currentPage + 1)"
          class="arrow next"
        >
          &gt;
        </a>
      </div>
    </div>
  </div>
  <router-view @router-view-leave="isDetailView = false"></router-view>
</template>

<script setup>
import { ref, computed, provide } from "vue";
import image from "@/assets/background/test.png";
import image1 from "@/assets/information/ActivityNews/1.png";
import image2 from "@/assets/information/ActivityNews/2.png";
import image3 from "@/assets/information/ActivityNews/3.png";
import image4 from "@/assets/information/ActivityNews/4.png";
import image5 from "@/assets/information/ActivityNews/5.png";
import image6 from "@/assets/information/ActivityNews/6.png";
import image7 from "@/assets/information/ActivityNews/7.png";
import image8 from "@/assets/information/ActivityNews/8.png";
import image9 from "@/assets/information/ActivityNews/9.png";

let isDetailView = ref(false);
provide("isDetailView", isDetailView);
// console.log(isDetailView.value);

const projects = ref([
  {
    id: 1,
    title: "让教育之光照亮贫困山区",
    date: "2021-02-22",
    image: image1,
    link: "/main/information/activity-news/detail01",
  },
  {
    id: 2,
    title: "从山区到城市：蓝山县易地搬迁助力幸福生活",
    date: "2024-10-11",
    image: image2,
    link: "/main/information/activity-news/detail02",
  },
  {
    id: 3,
    title: "举国同心 合力攻坚",
    date: "2022-09-10",
    image: image3,
    link: "/main/information/activity-news/detail03",
  },
  {
    id: 4,
    title: "乌蒙山区的幸福迁徙",
    date: "2020-04-12",
    image: image4,
    link: "/main/information/activity-news/detail04",
  },
  {
    id: 5,
    title: "义务教育有保障，山区的孩子有幸福快乐的童年",
    date: "2022-06-18",
    image: image5,
    link: "/main/information/activity-news/detail05",
  },
  {
    id: 6,
    title: "大别山区扶贫路",
    date: "2019-04-19",
    image: image6,
    link: "/main/information/activity-news/detail06",
  },
  {
    id: 7,
    title: "新华社长篇通讯：中国脱贫攻坚全纪实",
    date: "2021-02-24",
    image: image7,
    link: "/main/information/activity-news/detail07",
  },
  {
    id: 8,
    title: "决战千山万弄间",
    date: "2020-10-14",
    image: image8,
    link: "/main/information/activity-news/detail08",
  },
  {
    id: 9,
    title: "情系乡村教育 助力乡村振兴",
    date: "2023-12-16",
    image: image9,
    link: "/main/information/activity-news/detail09",
  },
  {
    id: 10,
    title: "第八届95公益周启动",
    date: "2022-12-12",
    image: image,
    link: "",
  },
  {
    id: 11,
    title: "第八届95公益周启动",
    date: "2022-12-12",
    image: image,
    link: "",
  },
]);

const itemsPerPage = 9;
const currentPage = ref(1);

const totalPages = computed(() =>
  Math.ceil(projects.value.length / itemsPerPage)
);

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return projects.value.slice(start, end);
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.background {
  background-color: rgb(245, 245, 245);
  font-size: 18px;
  margin: 0;
  padding: 0;
  background-image: url("../../../assets/background/ActivityNewsBackground.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: 120% 120%; /* 稍微放大背景图片 */
  background-position: center;
  overflow-x: hidden;
  animation: backgroundMove 20s ease-in-out infinite;
}

@keyframes backgroundMove {
  0%,
  100% {
    background-size: 100% 100%;
    background-position: center;
  }
  50% {
    background-size: 120% 120%;
    background-position: 30% 30%;
  }
}

.title-content {
  color: #fff;
  width: 80%;
  padding-top: 80px;
  padding-bottom: 70px;
  margin: 0 auto;
  position: relative;
  top: 0;
  z-index: 10;
  text-align: center;
  background: rgba(255, 255, 255, 0); /* 完全透明的白色背景 */
}

.title {
  font-size: 70px;
  line-height: 1.3;
  letter-spacing: 2px;
  margin-bottom: 30px;
}

.subtitle {
  font-size: 20px;
  line-height: 1.6;
  margin-top: 10px;
  letter-spacing: 1px;
  color: #fff;
}

.projects {
  padding-top: 20px;
  position: relative;
  z-index: 10;
  width: 86%; /* 将宽度改为100%以填充整个横向空间 */
  margin: 0 auto;
  margin-top: 10px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  margin-bottom: 50px;
}

.project-list {
  font-size: 0;
  margin-bottom: 50px;
  width: 80%; /* 保持80%宽度以维持新闻卡片的布局 */
  margin-left: auto;
  margin-right: auto;
}

.project-item {
  overflow: hidden;
  position: relative;
  background: #fff;
  border-radius: 20px;
  margin-top: 30px;
  margin-right: 20px;
  float: left;
  width: calc(33.333% - 20px);
  height: 350px;
}

.project-item img {
  width: 100%;
  height: 360px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-item:hover img {
  transform: scale(1.05);
}

.description {
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 18px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 10;
  text-align: left;
  padding: 15px 35px;
  color: #333;
  background-color: #fff;
  transition: all 0.3s ease;
}

.description .data {
  display: block;
  font-size: 14px;
  margin-top: 5px;
  color: #666;
}

.project-item:hover .description {
  background-color: #ffd700;
  color: #fff;
}

.project-item:hover .description .data {
  color: #fff;
}

/* Pagination styles */
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1200px;
}

.page a {
  text-decoration: none;
  color: #333;
  padding: 10px 15px;
  border-radius: 5px;
  margin: 0 5px;
  cursor: pointer;
}

.page a.arrow {
  font-size: 18px;
}

.page a.active {
  background-color: #ffffff7c;
  color: #fff;
}

.page a:hover:not(.active) {
  background-color: #eee;
}
</style>
