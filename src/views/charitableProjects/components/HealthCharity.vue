<template>
  <div class="background">
    <!-- 主横幅区域 -->
    <div class="banner">
      <div class="overlay"></div>
      <div class="title-content">
        <h1 class="main-title">健康，是生活最好的礼物</h1>
        <p class="main-subtitle">在快节奏的现代生活中，健康成为了我们最宝贵的财富。</p>
      </div>
    </div>

    <!-- 引言部分 -->
    <div class="introduction">
      <div class="intro-content">
        <div class="intro-header">
          <h2 class="intro-title">提高公众健康水平</h2>
          <p class="intro-subtitle">增强民众身体素质，减少疾病发生，提升生活质量和预期寿命。</p>
        </div>
        
        <div class="intro-media">
          <!-- 将复杂的video标签改为简单的实现 -->
          <video src="../../../assets/videos/health.mp4" controls></video>
          <p class="video-caption">视频源于央视网新闻</p>
        </div>  

        <div class="intro-text">
          <p>在快节奏的现代生活中，健康成为了我们最宝贵的财富。</p>
          <p>在益行山区，我们坚信健康是每个人最宝贵的财富。我们的"健康公益"页面，致力于通过各种公益活动和服务，提升公众的健康水平，让健康的光芒照亮每一个角落。</p>
          <p>加入我们，成为健康使者。在这里，每一次科普都是对生命的守护，每一次服务都是对幸福的投资。让我们携手，用爱心和行动，为公众健康保驾护航，共同创造一个更加健康、和谐的社会。</p>
        </div>
      </div>
    </div>

    <!-- 健康小贴士部分 -->
    <div class="health-tips">
      <h2>健康小贴士</h2>
      <div class="tips-container">
        <!-- 第一行 -->
        <div class="image-card">
          <img src="../../../assets/background/002.jpg" alt="健康图片">
        </div>
        <div class="tip-card">
          <i class="fas fa-utensils"></i>
          <h3>健康饮食</h3>
          <p>山区居民的饮食中蕴含着丰富的天然营养。我们鼓励居民多食用当地种植的新鲜蔬菜和水果。</p>
        </div>
        <div class="image-card">
          <img src="../../../assets/background/000.jpg" alt="健康图片">
        </div>

        <!-- 第二行 -->
        <div class="tip-card">
          <i class="fas fa-running"></i>
          <h3>适量运动</h3>
          <p>在山区，自然就是我们的健身房。我们提倡居民参与徒步、爬山等户外活动。</p>
        </div>
        <div class="image-card">
          <img src="../../../assets/background/yundong.png" alt="健康图片">
        </div>
        <div class="image-card">
          <img src="../../../assets/background/yd2.jpg" alt="健康图片">
        </div>

        <!-- 第三行 -->
        <div class="image-card">
          <img src="../../../assets/background/PlatformCharity05.jpg" alt="健康图片">
        </div>
        <div class="image-card">
          <img src="../../../assets/background/heart.jpg" alt="健康图片">
        </div>
        <div class="tip-card">
          <i class="fas fa-brain"></i>
          <h3>心理健康</h3>
          <p>心理健康同样重要。我们提供简单的减压技巧，如深呼吸、冥想和瑜伽。</p>
        </div>

        <!-- 第四行 -->
        <div class="image-card">
          <img src="../../../assets/background/qibing.jpg" alt="健康图片">
        </div>
        <div class="tip-card">
          <i class="fas fa-shield-virus"></i>
          <h3>疾病预防</h3>
          <p>清洁的饮水和良好的个人卫生习惯是预防疾病的关键。</p>
        </div>
        <div class="image-card">
          <img src="../../../assets/background/jibing.jpg" alt="健康图片">
        </div>
      </div>
    </div>

    <!-- 互动问答部分 -->
    <div class="qa-section">
      <h2>你问我答</h2>
      <div class="qa-description">
        <p>健康是我们每个人最关心的话题之一。在这里，我们为您提供了一个平台，让您能够直接向我们的智能健康小助手提问。无论是关于日常饮食的疑惑，还是对特定运动计划的咨询，或是对心理健康的探讨，我们都将为您提供专业的解答。</p>
      </div>
      <div class="qa-button-container">
        <a href="https://tbox.alipay.com/share/202411AP6dZA00119103?platform=WebService" 
           target="_blank" 
           class="qa-button">
          <i class="fas fa-comments"></i>
          向健康小助手提问
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  background-image: url("../../../assets/background/bg12.png");
  background-attachment: fixed;
  background-size: cover;
  color: #333;
}

.banner {
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}

.title-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
}

.main-title {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: fadeInUp 1s ease;
}

.introduction {
  background: rgba(255, 255, 255, 0.85);
  padding: 4rem 0;
  backdrop-filter: blur(5px);
}

.intro-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.intro-header {
  text-align: center;
  margin-bottom: 3rem;
}

.intro-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}

.intro-subtitle {
  font-size: 1.2rem;
  color: #333;
  line-height: 1.6;
}

.intro-media {
  margin: 2rem 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.5);
}

.intro-image, .intro-video {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.intro-text {
  text-align: left;
  line-height: 1.8;
}

.intro-text p {
  margin-bottom: 1.5rem;
  color: #333;
  font-weight: 500;
}

.health-tips {
  padding: 4rem 0;
  background: rgba(248, 249, 250, 0.85);
  backdrop-filter: blur(5px);
}

.tips-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.image-card {
  aspect-ratio: 1;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  background: rgba(255, 255, 255, 0.85);
}

.image-card:hover {
  transform: translateY(-5px);
}

.image-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tip-card {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  aspect-ratio: 1;
  transition: transform 0.3s ease;
}

.tip-card:hover {
  transform: translateY(-5px);
}

.qa-section {
  padding: 4rem 0;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(5px);
}

.qa-description {
  max-width: 800px;
  margin: 0 auto 2rem;
  padding: 0 1.5rem;
  text-align: center;
  line-height: 1.8;
  color: #555;
}

.qa-button-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.qa-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #4CAF50;
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.qa-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  background: #45a049;
}

.qa-button i {
  font-size: 1.4rem;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2.5rem;
  }
  
  .tips-container {
    grid-template-columns: 1fr;
  }

  .intro-title {
    font-size: 2rem;
  }
  
  .intro-image, .intro-video {
    height: 250px;
  }

  .image-card, .tip-card {
    aspect-ratio: 16/9;
  }
}

.health-tips h2,
.qa-section h2 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.9);
}

.tip-card h3 {
  color: #2c3e50;
  margin: 1rem 0;
}

.tip-card p,
.question span,
.answer {
  color: #333;
  font-weight: 500;
}

.video-caption {
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  font-style: italic;
}
</style>
