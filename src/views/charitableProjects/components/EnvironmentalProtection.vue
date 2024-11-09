<template>
  <div class="background">
    <div class="background-image first"></div>
    <div class="background-image second"></div>
    <div class="page-container">
      <!-- 头部区域 -->
      <header class="header-section">
        <span class="tag">模块化解决方案</span>
        <h1 class="main-title">绿水青山：自然的财富</h1>
        <p class="header-desc">
          让我们共同守护自然环境，创造可持续发展的未来。通过科学的方法和持续的行动，实现生态与经济的双赢。
        </p>
      </header>

      <!-- 内容区域 -->
      <div class="content-sections">
        <!-- 科普简介 -->
        <section class="content-block">
          <div class="text-content">
            <h2>绿水青山的价值</h2>
            <p class="rich-content">
              在这个世界上，每一寸土地都承载着生命的奇迹，每一条河流都孕育着未来的希望。我们相信，绿色不仅仅是一种颜色，它是一种生活态度，一种对未来的承诺。"绿水青山就是金山银山"这一理念强调了自然环境与经济发展之间的和谐共生关系，我们汇聚了那些致力于守护自然、推动可持续发展的行动和故事。
            </p>
          </div>
          <div class="visual-content">
            <div class="image-wrapper">
              <img src="@/assets/background/bg1.png" alt="自然风光" />
              <div class="hover-text">
                守护绿水青山，共创绿色未来。<br />益行山区，与自然同行，为生命添彩！
              </div>
            </div>
          </div>
        </section>

        <!-- 山区之美 -->
        <section class="content-block reverse">
          <div class="text-content">
            <h2>山区之美</h2>
            <div class="seasons-gallery">
              <div
                class="season"
                v-for="(season, index) in seasons"
                :key="index"
              >
                <img :src="season.image" :alt="season.name" />
                <span class="season-name">{{ season.name }}</span>
              </div>
            </div>
            <p class="rich-content">
              壮丽的山川，清澈的溪流，这些都是大自然赐予我们的珍贵礼物。四季轮转间，山区呈现出不同的自然之美：春日山花烂漫，夏日郁郁葱葱，秋日层林尽染，冬日银装素裹。
            </p>
          </div>
          <div class="visual-content">
            <video
              src="@/assets/videos/EnvironmentalProtection.mp4"
              controls
            ></video>
          </div>
        </section>

        <!-- 行动起来 -->
        <section class="content-block">
          <div class="text-content">
            <h2>行动起来</h2>
            <p class="rich-content">
              加入我们，一起探索如何通过小小的行动，为地球带来巨大的改变。每一份努力都值得被看见，每一份贡献都值得被赞扬。
            </p>
            <ul class="action-list">
              <li>减少使用一次性塑料制品，选择可重复使用的购物袋和水瓶</li>
              <li>参与当地植树造林活动，为山区增添绿色</li>
              <li>在日常生活中节约用水，减少资源浪费</li>
              <li>支持可持续农业和生态旅游，促进当地经济发展</li>
            </ul>
            <button class="action-button" @click="showDonationForm">
              立即参与
            </button>
          </div>
          <div class="visual-content">
            <img src="@/assets/background/ActivityNews10.jpeg" alt="环保行动" />
          </div>
        </section>

        <!-- 新增：互动反馈区域 -->
        <section class="content-block feedback-section">
          <div class="text-content">
            <h2>留下你的声音</h2>
            <p class="rich-content">
              守护绿水青山，共创绿色未来。加入我们，让每一步行走都成为对地球的爱护，让每一次行动都为可持续发展注入活力。
            </p>
            <div class="feedback-form">
              <textarea
                v-model="userFeedback"
                placeholder="分享您对山区环境保护的看法和建议..."
              ></textarea>
              <button class="submit-button" @click="submitFeedback">
                提交反馈
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 背景相关样式更新 */
.background {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.9)
  );
}

.background::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/background/bg1.png");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  opacity: 0.8;
  z-index: -2;
}

.background::after {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/background/bg1.png");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  opacity: 0.4;
  z-index: -1;
  transform: scale(1.1);
  transition: transform 0.5s ease-out;
}

/* 修改容器样式使其更透明 */
.page-container {
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(0px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  max-width: 1200px;
  /* marg in: 2rem auto; */
  padding: 3rem 4rem;
  border-radius: 16px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .page-container {
    margin: 1rem;
    padding: 2rem 1.5rem;
  }
}

/* 内容块样式优化 */
.content-block {
  display: flex;
  align-items: center;
  gap: 4rem;
  margin-bottom: 8rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(5px);
  transition: transform 0.3s ease;
}

.content-block:hover {
  transform: translateY(-5px);
}

/* 调整原有文字颜色，确保在背景上清晰可见 */
.header-section {
  text-align: left;
  margin-bottom: 6rem;
  position: relative;
}

.tag {
  background: rgba(99, 91, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
}

.main-title {
  color: #1a1f36;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-desc {
  color: #425466;
}

.content-block {
  background: rgba(255, 255, 255, 0.7);
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 4rem;
}

.content-block.reverse {
  flex-direction: row-reverse;
}

.text-content {
  flex: 1;
}

.text-content h2 {
  font-size: 2rem;
  color: #1a1f36;
  margin-bottom: 1.5rem;
}

.text-content p {
  color: #425466;
  font-size: 1.1rem;
  line-height: 1.6;
}

.visual-content {
  flex: 1;
  position: relative;
}

.visual-content img,
.visual-content video {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.action-list {
  list-style: none;
  padding: 0;
  margin: 2rem 0;
}

.action-list li {
  margin: 1rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.action-list li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: #635bff;
}

.action-button {
  background: #635bff;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 24px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.action-button:hover {
  background: #4b45c6;
}

@media (max-width: 768px) {
  .page-container {
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 2rem 1rem;
  }

  .content-block {
    padding: 1rem;
  }
}

.rich-content {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #425466;
  margin-bottom: 2rem;
}

.seasons-gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin: 2rem 0;
}

.season {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.season img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.season:hover img {
  transform: scale(1.1);
}

.season-name {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0.5rem;
  text-align: center;
}

.feedback-section {
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  /* margin: 0 2rem 2rem 2rem; */
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.feedback-form {
  margin-top: 2rem;
  padding: 0 1rem;
}

.feedback-form textarea {
  width: 100%;
  height: 150px;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: vertical;
  margin-bottom: 1rem;
}

.submit-button {
  background: #635bff;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-button:hover {
  background: #4b45c6;
}

.image-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  transition: all 2.5s ease;
  object-fit: cover;
}

.hover-text {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: rgba(245, 245, 245, 0);
  color: transparent;
  padding: 0px;
  transition: all 0.81s ease;
  font-size: 1.2rem;
  line-height: 1.6;
}

.image-wrapper:hover img {
  transform: scale(1.1);
  filter: blur(1px);
}

.image-wrapper:hover .hover-text {
  background: rgba(0, 0, 0, 0.3);
  color: white;
}
</style>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import springImg from "@/assets/background/spring.jpg";
import summerImg from "@/assets/background/bg6.png";
import autumnImg from "@/assets/background/bg4.png";
import winterImg from "@/assets/background/winter.jpg";

// 用 ref 替代 data
const userFeedback = ref("");
const seasons = ref([
  { name: "春日山花", image: springImg },
  { name: "夏日葱郁", image: summerImg },
  { name: "秋日层林", image: autumnImg },
  { name: "冬日素裹", image: winterImg },
]);

// 方法定义
const handleScroll = () => {
  const scrolled = window.pageYOffset;
  const bgElement = document.querySelector(".background::after");
  if (bgElement) {
    bgElement.style.transform = `scale(1.1) translateY(${scrolled * 0.05}px)`;
  }
};

const showDonationForm = () => {
  // 实现捐款表单逻辑
};

const submitFeedback = () => {
  if (userFeedback.value.trim()) {
    alert("感谢您的反馈！");
    userFeedback.value = "";
  }
};

// 生命周期钩子
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
