<template>
  <div class="background" @scroll="handleScroll" ref="background">
    <!-- 标题部分 -->
    <div class="banner" ref="banner">
      <div class="banner-background" :style="{ opacity: bannerOpacity }"></div>
      <div class="title-content" :style="{ opacity: bannerOpacity }">
        <h1 class="main-title typewriter">公益募捐</h1>
        <p class="main-subtitle typewriter-delay-1">点滴爱心，汇聚成海</p>
        <p class="sub-text typewriter-delay-2">
          加入我们的公益之旅，让爱心成就改变！
        </p>
      </div>
    </div>

    <!-- 引言部分 -->
    <div class="intro-section animate__animated animate__fadeInUp">
      <div class="container">
        <p class="intro-text">
          在这个充满挑战与机遇的世界里，每一个小小的行动都能引发巨大的波澜。
          我们相信，当普通人的力量汇聚在一起时，没有什么是不可能的。
          在这里，你不仅仅是一个旁观者，而是改变的参与者，是希望的播种者。
        </p>
      </div>
    </div>

    <!-- 项目展示部分 -->
    <div class="projects-section">
      <div class="container">
        <h2 class="section-title">当前项目</h2>
        <div class="project-grid">
          <!-- 项目卡片1 -->
          <div class="project-card animate__animated animate__fadeInUp">
            <div class="project-image">
              <img
                src="../../../assets/background/educate.jpg"
                alt="山区教育援助计划"
              />
              <div class="project-category">教育助学</div>
            </div>
            <div class="project-info">
              <h3>山区教育援助计划</h3>
              <p class="project-desc">
                为云南省怒江州贫困山区的孩子们提供教育支持，
                包括学习用品、营养餐和教师培训等综合援助项目。
              </p>
              <div class="project-progress">
                <div class="progress-bar">
                  <div class="progress" style="width: 65%"></div>
                </div>
                <div class="progress-stats">
                  <span>已筹：¥65,000</span>
                  <span>目标：¥100,000</span>
                </div>
              </div>
              <div class="project-actions">
                <button class="btn-claim" @click="claimProject">
                  认领项目
                </button>
                <button class="btn-donate" @click="startDonation">
                  筹款募捐
                </button>
              </div>
            </div>
          </div>

          <!-- 项目卡片2 -->
          <div class="project-card animate__animated animate__fadeInUp">
            <div class="project-image">
              <img
                src="../../../assets/background/medicine.jpg"
                alt="乡村医疗援助"
              />
              <div class="project-category">医疗救助</div>
            </div>
            <div class="project-info">
              <h3>乡村医疗援助计划</h3>
              <p class="project-desc">
                为四川省凉山州贫困地区提供基础医疗设备和医疗培训，
                提升当地医疗服务水平。
              </p>
              <div class="project-progress">
                <div class="progress-bar">
                  <div class="progress" style="width: 45%"></div>
                </div>
                <div class="progress-stats">
                  <span>已筹：¥90,000</span>
                  <span>目标：¥200,000</span>
                </div>
              </div>
              <div class="project-actions">
                <button class="btn-claim" @click="claimProject">
                  认领项目
                </button>
                <button class="btn-donate" @click="startDonation">
                  筹款募捐
                </button>
              </div>
            </div>
          </div>

          <!-- 项目卡片3 -->
          <div class="project-card animate__animated animate__fadeInUp">
            <div class="project-image">
              <img src="../../../assets/background/river1.jpg" alt="环保行动" />
              <div class="project-category">环境保护</div>
            </div>
            <div class="project-info">
              <h3>长江流域生态修复计划</h3>
              <p class="project-desc">
                针对长江流域的生态环境保护，开展植树造林、
                水质监测和环保教育等综合性项目。
              </p>
              <div class="project-progress">
                <div class="progress-bar">
                  <div class="progress" style="width: 30%"></div>
                </div>
                <div class="progress-stats">
                  <span>已筹：¥150,000</span>
                  <span>目标：¥500,000</span>
                </div>
              </div>
              <div class="project-actions">
                <button class="btn-claim" @click="claimProject">
                  认领项目
                </button>
                <button class="btn-donate" @click="startDonation">
                  筹款募捐
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 认领者名单部分 -->
    <div class="supporters-section">
      <div class="container">
        <h2 class="section-title">感谢有你</h2>
        <p class="supporters-intro">
          感谢每一位支持者的无私奉献，让我们一起创造更美好的明天！
        </p>

        <div class="supporters-grid">
          <div
            v-for="(supporter, index) in supporters"
            :key="index"
            class="supporter-card animate__animated animate__fadeInUp"
            :style="{ animationDelay: `${index * 0.2}s` }"
          >
            <div class="supporter-avatar">
              <img :src="supporter.avatar" :alt="supporter.name" />
            </div>
            <div class="supporter-info">
              <h3>{{ supporter.isAnonymous ? "爱心人士" : supporter.name }}</h3>
              <p class="support-project">支持项目：{{ supporter.project }}</p>
              <p class="support-amount">捐赠金额：{{ supporter.amount }}</p>
              <p class="support-message">{{ supporter.message }}</p>
              <p class="support-date">{{ supporter.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 常见问题解答部分 -->
    <div class="faq-section">
      <div class="container">
        <h2 class="section-title" @click="toggleFaqVisible">
          捐款问答
          <span class="toggle-icon">{{ faqVisible ? '▼' : '▶' }}</span>
        </h2>
        
        <div v-show="faqVisible" class="faq-grid animate__animated animate__fadeIn">
          <div v-for="(qa, index) in faqs" 
               :key="index" 
               class="faq-card"
               @click="toggleFaq(index)">
            <div class="faq-question">
              <span class="question-mark">Q{{ index + 1 }}</span>
              <h3>{{ qa.question }}</h3>
              <span class="arrow">{{ qa.isOpen ? '▼' : '▶' }}</span>
            </div>
            <p v-show="qa.isOpen" 
               class="faq-answer animate__animated animate__fadeIn">
              {{ qa.answer }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.banner {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
}

.banner-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1)),
    url("../../../assets/background/InternationalCharity02.png");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  animation: zoomInOut 10s infinite alternate;
  transition: opacity 0.3s ease;
}

.title-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 20px;
  transition: opacity 0.3s ease;
}

.main-title,
.main-subtitle,
.sub-text {
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  opacity: 0;
  white-space: nowrap;
  overflow: hidden;
  border-right: 3px solid #fff;
}

.main-title {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
  animation: typing 1s steps(6) forwards, cursor 1s steps(1) forwards;
}

.main-subtitle {
  font-size: 24px;
  margin-bottom: 15px;
  animation: typing 1.5s steps(11) forwards, cursor 1.5s steps(1) forwards;
  animation-delay: 1s;
}

.sub-text {
  font-size: 18px;
  animation: typing 2s steps(22) forwards, cursor 2s steps(1) forwards;
  animation-delay: 2.5s;
}

.intro-section {
  background: white;
  padding: 60px 0;
  margin-bottom: 40px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.intro-text {
  font-size: 18px;
  line-height: 1.8;
  text-align: center;
  color: #2c3e50;
  max-width: 800px;
  margin: 0 auto;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  padding: 40px 0;
}

.project-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
}

.project-image {
  position: relative;
  height: 200px;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-category {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(251, 201, 52, 0.9);
  padding: 5px 15px;
  border-radius: 20px;
  color: white;
  font-size: 14px;
}

.project-info {
  padding: 25px;
}

.project-info h3 {
  font-size: 20px;
  margin-bottom: 15px;
  color: #2c3e50;
}

.project-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
}

.project-progress {
  margin-bottom: 20px;
}

.progress-bar {
  height: 8px;
  background: #eee;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress {
  height: 100%;
  background: #fbc934;
  border-radius: 4px;
  transition: width 1s ease;
}

.progress-stats {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
}

.project-actions {
  display: flex;
  gap: 15px;
}

.btn-claim,
.btn-donate {
  flex: 1;
  padding: 12px 0;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-claim {
  background: white;
  border: 2px solid #fbc934;
  color: #fbc934;
}

.btn-donate {
  background: #fbc934;
  color: white;
}

.btn-claim:hover {
  background: #fbc934;
  color: white;
}

.btn-donate:hover {
  background: #eab41b;
}

@media (max-width: 768px) {
  .project-grid {
    grid-template-columns: 1fr;
  }

  .main-title {
    font-size: 36px;
  }

  .main-subtitle {
    font-size: 20px;
  }

  .sub-text {
    font-size: 16px;
  }
}

@keyframes zoomInOut {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}

@keyframes typing {
  from {
    width: 0;
    opacity: 1;
  }
  to {
    width: 100%;
    opacity: 1;
  }
}

@keyframes cursor {
  from {
    border-right: 3px solid #fff;
  }
  to {
    border-right: 3px solid transparent;
  }
}

.supporters-section {
  padding: 60px 0;
  background: #fff;
}

.supporters-intro {
  text-align: center;
  color: #666;
  margin-bottom: 40px;
  font-size: 16px;
}

.supporters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px 0;
}

.supporter-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  transition: transform 0.3s ease;
}

.supporter-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.supporter-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.supporter-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.supporter-info {
  flex-grow: 1;
}

.supporter-info h3 {
  margin: 0 0 10px;
  color: #2c3e50;
  font-size: 18px;
}

.support-project {
  color: #fbc934;
  font-weight: 500;
  margin-bottom: 8px;
}

.support-amount {
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
}

.support-message {
  color: #666;
  font-size: 14px;
  font-style: italic;
  margin-bottom: 8px;
}

.support-date {
  color: #999;
  font-size: 12px;
}

@media (max-width: 768px) {
  .supporters-grid {
    grid-template-columns: 1fr;
  }
}

.faq-section {
  padding: 60px 0;
  background: #f8f9fa;
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px 0;
}

.faq-card {
  cursor: pointer;
  padding: 15px 20px;
}

.faq-question {
  display: flex;
  align-items: center;
  gap: 15px;
  position: relative;
}

.question-mark {
  background: #fbc934;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 14px;
}

.faq-question h3 {
  color: #2c3e50;
  font-size: 16px;
  margin: 0;
  line-height: 1.4;
}

.faq-answer {
  margin-top: 15px;
}

.arrow {
  margin-left: auto;
  font-size: 12px;
  transition: transform 0.3s ease;
}

.animate__fadeIn {
  animation-duration: 0.3s;
}

.section-title {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-icon {
  font-size: 14px;
  transition: transform 0.3s ease;
}
</style>

<script>
// 导入默认头像
import defaultAvatar from "../../../assets/background/ActivityNews01.jpeg";

export default {
  data() {
    return {
      supporters: [
        {
          name: "张明",
          isAnonymous: false,
          avatar: defaultAvatar,
          project: "山区教育援助计划",
          amount: "¥2,000",
          message: "希望能为山区的孩子们带来一些改变",
          date: "2024-03-15",
        },
        {
          name: "李华",
          isAnonymous: true,
          avatar: defaultAvatar,
          project: "乡村医疗援助计划",
          amount: "¥5,000",
          message: "为了让更多人获得基本的医疗保障",
          date: "2024-03-14",
        },
        {
          name: "王芳",
          isAnonymous: false,
          avatar: defaultAvatar,
          project: "长江流域生态修复计划",
          amount: "¥3,000",
          message: "保护环境，从我做起",
          date: "2024-03-13",
        },
      ],
      faqs: [
        {
          question: "如何确保我的捐款是安全的？",
          answer: "我们使用行业标准的加密技术来保护您的个人信息和捐款。所有在线交易都是通过安全的支付网关进行的，该网关符合PCI DSS标准。此外，我们的网站采用了SSL加密，确保您的捐款过程中的数据传输安全。",
          isOpen: false
        },
        {
          question: "我如何知道我的捐款被用于哪里？",
          answer: "我们承诺捐款的透明度。您可以通过我们的网站跟踪捐款的使用情况。每个项目页面都会定期更新，提供项目进展报告和财务报告，让您看到您的捐款如何被使用。",
          isOpen: false
        },
        {
          question: "我的捐款可以享受税收优惠吗？",
          answer: "是的，我们的组织是经过认证的慈善机构，您的捐款可能符合税收减免条件。具体的税收优惠政策可能因国家和地区的税法而异，我们建议咨询税务顾问以获取详细信息。",
          isOpen: false
        },
        {
          question: "如果我想取消捐款，我该怎么办",
          answer: "我们理解有时情况会变化。如果您需要取消或更改您的捐款，我们提供一定时间的退款政策。请在捐款后的48小时内联系我们的客户服务团队，我们将协助您处理。",
          isOpen: false
        },
        {
          question: "我可以以匿名方式捐款吗？",
          answer: "当然可以。我们尊重您的隐私。在捐款过程中，您可以选择匿名捐款的选项。我们不会在任何公开材料中披露您的个人信息。",
          isOpen: false
        },
        {
          question: "我如何知道我支持的项目取得了进展？",
          answer: "我们定期发布项目更新和成果报告。您也可以通过注册我们的邮件列表来接收最新信息。此外，我们鼓励捐款者参与我们的社交媒体平台，以便更直接地获取项目进展和故事。",
          isOpen: false
        },
        {
          question: "我可以捐款给特定的项目吗？",
          answer: "是的，您可以选择特定的项目进行捐款。在我们的项目页面上，每个项目都有gi明确的捐款按钮，您可以直接点击并选择您想要支持的项目。",
          isOpen: false
        },
        {
          question: "如果我对捐款有疑问，我应该联系谁？",
          answer: "如果您有任何疑问或需要帮助，我们的客户服务团队随时为您服务。您可以通过网站上提供的联系方式，如电话、电子邮件或在线聊天与我们联系。",
          isOpen: false
        }
      ],
      faqVisible: false,
      bannerOpacity: 1
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    claimProject() {
      // 处理项目认领逻辑
    },
    startDonation() {
      // 处理筹款募捐逻辑
    },
    toggleFaqVisible() {
      this.faqVisible = !this.faqVisible;
    },
    toggleFaq(index) {
      this.faqs[index].isOpen = !this.faqs[index].isOpen;
    },
    handleScroll() {
      const scrollPosition = window.scrollY;
      const fadeStart = 100; // 开始渐变的滚动位置
      const fadeEnd = 500;   // 结束渐变的滚动位置
      
      if (scrollPosition <= fadeStart) {
        this.bannerOpacity = 1;
      } else if (scrollPosition >= fadeEnd) {
        this.bannerOpacity = 0;
      } else {
        this.bannerOpacity = 1 - ((scrollPosition - fadeStart) / (fadeEnd - fadeStart));
      }

      // 当滚回顶部时重新触发打字机效果
      if (scrollPosition === 0) {
        const titles = document.querySelectorAll('.typewriter, .typewriter-delay-1, .typewriter-delay-2');
        titles.forEach(title => {
          title.style.animation = 'none';
          title.offsetHeight; // 触发重排
          title.style.animation = null;
        });
      }
    },
  },
};
</script>
