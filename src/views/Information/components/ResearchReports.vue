<template>
  <div v-if="!isDetailView" class="background">
    <div class="title-content">
      <div class="title-content">
        <div class="title">研究报告</div>
        <div class="subtitle">
          为了深入理解社会问题、评估公益活动成效、提供政策建议、促进公众参与与意识提升以及推动学术研究与理论创新。这些目的共同构成了公益研究报告的核心价值和意义。
        </div>
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
import image1 from "@/assets/background/ActivityNews01.jpeg";
import image4 from "@/assets/background/ActivityNews04.jpeg";
import image5 from "@/assets/background/ActivityNews05.jpeg";
import image6 from "@/assets/background/ActivityNews06.jpeg";
import image7 from "@/assets/background/ActivityNews07.jpeg";

let isDetailView = ref(false);
provide('isDetailView', isDetailView);
// console.log(isDetailView.value);

const projects = ref([
  {
    id: 1,
    title: "中基透明指数FTI2023报告",
    date: "2022-12-12",
    image: image1,
    link: "/main/information/research-reports/r-detail01",
  },
  {
    id: 2,
    title: "《中国网民慈善信任指数》",
    date: "2022-12-12",
    image: image4,
    link: "/main/information/research-reports/r-detail02",
  },
  {
    id: 3,
    title: "2021年中国乡村振兴发展研究报告",
    date: "2022-12-12",
    image: image5,
    link: "/main/information/research-reports/r-detail03",
  },
  {
    id: 4,
    title: "迈向互惠共生",
    date: "2022-12-12",
    image: image6,
    link: "/main/information/research-reports/r-detail04",
  },
  {
    id: 5,
    title: "基于利益再分配的视角",
    date: "2022-12-12",
    image: image7,
    link: "/main/information/research-reports/r-detail05",
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

/* .background {
  background: #f6f6f6;
  font-size: 18px;
  min-height: 100vh;
  overflow: hidden;
} */
.background {
  background-color: rgb(245, 245, 245);
  font-size: 18px;
  margin: 0;
  padding: 0;
  margin: 0;
  padding: 0;
  background-image: url("../../../assets/background/ResearchReportsBackground.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.title-content {
  color: #000000;
  width: 80%;
  padding-top: 80px;
  padding-bottom: 70px;
  margin: 0 auto;
  position: relative;
  top: 0;
  z-index: 10;
  text-align: center;
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
  color: #000000;
}

.projects {
  max-height: 1200px;
  padding-top: 20px;
  position: relative;
  z-index: 10;
  width: 80%;
  margin: 0 auto;
  margin-top: 10px;
}

.project-list {
  font-size: 0;
  margin-bottom: 50px;
  width: calc(100% + 20px);
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
  background-color: #fff;
  z-index: 10;
  text-align: left;
  padding: 15px 35px;
  color: #222;
  transition: background-color 0.3s ease;
  transition: color 0.3s ease;
}

.description .data {
  display: block;
  font-size: 14px;
  margin-top: 5px;
  color: #888;
}

.project-item:hover .description {
  background-color: #fbc934;
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
  background-color: #fbc934;
  color: #fff;
}

.page a:hover:not(.active) {
  background-color: #eee;
}
</style>
