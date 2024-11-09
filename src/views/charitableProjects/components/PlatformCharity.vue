<template>
  <div class="background">
    <div class="main">
      <section class="sec">
        <div class="title">
          公益项目<br />
          为改善人们的生活和创造一个更美好的社会
        </div>
      </section>
      <div class="projects">
        <router-link
          to="/main/charitable-projects/platform-charity"
          class="project-li platform-charity"
        >
          <div class="image-container">
            <img
              src="../../../assets/background/PlatformCharity01.jpg"
              alt="平台公益"
            />
            <div class="overlay">
              <p class="overlay-text">
                加入益行山区，用互联网的力量点亮公益之光。在这里，每一次点击都能改善社会，每一次分享都在传承文化。让我们共同行动，用爱连接世界，用善行改变未来。
              </p>
            </div>
          </div>
          <div class="project-info">
            <div class="info1">平台公益</div>
            <div class="info2">
              互联网公益<br />通过非营利的方式，改善社会问题、提升社会福利、保护环境或促进文化传承
            </div>
          </div>
        </router-link>
        <router-link
          to="/main/charitable-projects/environmental-protection"
          class="project-li green-mountains"
        >
          <div class="image-container">
            <img src="../../../assets/background/bg1.png" alt="绿水青山" />
            <div class="overlay">
              <p class="overlay-text">
                守护绿水青山，共创绿色未来。加入我们，让每一步行走都成为对地球的爱护，让每一次行动都为可持续发展注入活力。益行山区，与自然同行，为生命添彩！
              </p>
            </div>
          </div>
          <div class="project-info">
            <div class="info1">绿水青山</div>
            <div class="info2">环境保护、绿色发展</div>
          </div>
        </router-link>
        <router-link
          to="/main/charitable-projects/rural-revitalization"
          class="project-li rural-revitalization"
        >
          <div class="image-container">
            <img src="../../../assets/background/bg11.png" alt="乡村振兴" />
            <div class="overlay">
              <p class="overlay-text">
                携手益行山区，共筑乡村未来。让我们一起用科技和智慧，点燃产业的火花，培育人才的沃土，巩固脱贫的成果。每一次参与，都是对乡村明天的投资，每一次支持，都是对农民希望的助力。
              </p>
            </div>
          </div>
          <div class="project-info">
            <div class="info1">乡村振兴</div>
            <div class="info2">
              产业振兴 科技振兴<br />人才振兴 巩固脱贫攻坚
            </div>
          </div>
        </router-link>
        <router-link
          to="/main/charitable-projects/disaster-relief"
          class="project-lia4 disaster-relief"
        >
          <div class="image-container">
            <img
              src="../../../assets/background/PlatformCharity04.jpg"
              alt="应急救灾"
            />
            <div class="overlay">
              <p class="overlay-text">
                在益行山区，我们迅速响应，为生命护航。加入我们的"应急救灾"行动，每一次援助都是希望的火种，每一次参与都是力量的汇聚。让我们共同守护每一个需要帮助的生命。
              </p>
            </div>
          </div>
          <div class="project-info">
            <div class="info1">应急救灾</div>
            <div class="info2">才能最大限度地减少人员<br />伤亡和财产损失</div>
          </div>
        </router-link>
        <router-link
          to="/main/charitable-projects/disability-support"
          class="project-li disability-support"
        >
          <div class="image-container">
            <img
              src="../../../assets/background/PlatformCharity05.jpg"
              alt="公益筹款"
            />
            <div class="overlay">
              <p class="overlay-text">
                改变，从你我开始。加入我们的公益筹款，用你的爱心点亮希望之光。每一份捐赠，无论大小，都能在需要帮助的地方引发变革。立即行动，成为改变的一份子！              </p>
            </div>
          </div>
          <div class="project-info">
            <div class="info1">公益筹款</div>
            <div class="info2">汇聚爱心，助力希望<br />募捐筹款与项目认领</div>
          </div>
        </router-link>
        <router-link
          to="/main/charitable-projects/health-charity"
          class="project-li health-charity"
        >
          <div class="image-container">
            <img src="../../../assets/background/bg12.png" alt="健康公益" />
            <div class="overlay">
              <p class="overlay-text">
                在益行山区，我们致力于用公益行动点亮健康之光。加入我们的"健康公益"行动，每一次参与都是对生命的投资，每一次科普都是对未来的关怀。让我们共同为提升公众健康水平而努力。
              </p>
            </div>
          </div>
          <div class="project-info">
            <div class="info1">健康公益</div>
            <div class="info2">
              提高公众健康水平<br />而展开的各种公益活动和服务
            </div>
          </div>
        </router-link>
        <router-link
          to="/main/charitable-projects/international-charity"
          class="project-li international-charity"
        >
          <div class="image-container">
            <img
              src="../../../assets/background/PlatformCharity07.jpg"
              alt="国际公益"
            />
            <div class="overlay">
              <p class="overlay-text">
                在益行山区，我们相信每个微小的行动都能在全球引发美好的涟漪。加入我们的"国际公益"，让爱跨越国界，用行动改变世界。一起为创造一个更加和谐的地球贡献力量。
              </p>
            </div>
          </div>
          <div class="project-info">
            <div class="info1">国际公益</div>
            <div class="info2">为世界带来<br />微小而美好的改变</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.background {
  background-color: rgb(245, 245, 245);
  font-size: 8px;
  margin: 0;
  padding: 0;
  margin: 0;
  padding: 0;
  background-image: url("../../../assets/background/bg13.png");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  overflow-x: hidden;
}

.main {
  padding: 170px 0;
  min-height: 60vh;
  margin: 0 auto;
  width: 92%;
  max-width: 1300px;
  letter-spacing: 2px;
}

.title-content {
  color: #9d1c1c;
  line-height: 1.6;
  margin: 0;
  padding: 0;
  text-align: left;
}

.title {
  font-size: 47px;
  font-weight: 500;
  color: #f3ebeb;
}

.subtitle {
  font-size: 19px;
  margin-top: 5px;
  color: #666;
}

.subtitle p {
  margin: 0;
}

.projects {
  margin-top: 90px;
  overflow: hidden;
  width: calc(100% + 20px);
  padding: 0;
  display: block;
}

.project-li {
  border-radius: 20px;
  float: left;
  height: 410px;
  margin-bottom: 20px;
  margin-right: 20px;
  overflow: hidden;
  width: calc(50% - 20px);
  background-color: #222;
  overflow: hidden;
  position: relative;
}

.project-lia4 {
  border-radius: 20px;
  float: left;
  height: 410px;
  margin-bottom: 20px;
  margin-right: 20px;
  overflow: hidden;
  width: calc(50% - 20px);
  background-color: #222;
  overflow: hidden;
  position: relative;
}

.project-li:nth-child(3) {
  border-radius: 20px;
  display: inline-block;
  float: left;
  height: 410px;
  margin-bottom: 20px;
  margin-right: 20px\\;
  overflow: hidden;
  width: calc(100% - 20px);
  background-color: #222;
}

.project-lia4:nth-child(4) {
  border-radius: 20px;
  display: inline-block;
  float: left;
  height: 840px;
  margin-bottom: 20px;
  margin-right: 20px\\;
  overflow: hidden;
  width: calc(50% - 20px);
  background-color: #222;
}

.project-li:nth-child(7) {
  border-radius: 20px;
  display: inline-block;
  float: left;
  height: 410px;
  margin-bottom: 20px;
  margin-right: 20px;
  overflow: hidden;
  width: calc(100% - 20px);
  background-color: #222;
}
.project-li img {
  height: 420px;
  width: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-lia4 img {
  height: 920px;
  width: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-li:hover img {
  transform: scale(1.05);
}
.project-lia4:hover img {
  transform: scale(1.05);
}

.project-info {
  bottom: 0;
  left: 0;
  position: absolute;
  width: calc(50% - 20px);
  margin: 0;
  padding: 30px;
  text-align: left;
}
.info1 {
  font-size: 0px;
  font-weight: 500;
  margin: 0;
  padding: 0;
  color: rgb(114, 30, 30);
}
.project-info {
  bottom: 0;
  left: 0;
  position: absolute;
  width: calc(50% - 20px);
  margin: 0;
  padding: 30px;
  text-align: left;
}
.info1 {
  font-size: 40px;
  font-weight: 500;
  margin: 0;
  padding: 0;
  color: rgb(234, 225, 225);
}

.info2 {
  font-size: 18px;
  margin: 0;
  padding: 0;
  margin-top: 5px;
  color: rgb(245, 241, 241);
}

.green-mountains .image-container {
  position: relative;
  overflow: hidden;
  height: 100%;
}

.green-mountains img {
  transition: transform 0.5s ease, filter 0.5s ease;
}

.green-mountains:hover img {
  transform: scale(1.05);
  filter: blur(5px);
}

.green-mountains .overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(195, 188, 188, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 2s ease;
}

.green-mountains:hover .overlay {
  opacity: 1;
}

.green-mountains .overlay-text {
  color: white;
  font-size: 16px;
  text-align: center;
  padding: 20px;
  max-width: 80%;
  line-height: 1.6;
}

.platform-charity .image-container {
  position: relative;
  overflow: hidden;
  height: 100%;
}

.platform-charity img {
  transition: transform 0.5s ease, filter 0.5s ease;
}

.platform-charity:hover img {
  transform: scale(1.05);
  filter: blur(5px);
}

.platform-charity .overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 1.5s ease;
}

.platform-charity:hover .overlay {
  opacity: 1;
}

.platform-charity .overlay-text {
  color: white;
  font-size: 16px;
  text-align: center;
  padding: 20px 20px 100px;
  max-width: 80%;
  line-height: 1.6;
}

.rural-revitalization .image-container {
  position: relative;
  overflow: hidden;
  height: 100%;
}

.rural-revitalization img {
  transition: transform 0.5s ease, filter 0.5s ease;
}

.rural-revitalization:hover img {
  transform: scale(1.05);
  filter: blur(5px);
}

.rural-revitalization .overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 1.5s ease;
}

.rural-revitalization:hover .overlay {
  opacity: 1;
}

.rural-revitalization .overlay-text {
  color: white;
  font-size: 16px;
  text-align: center;
  padding: 20px;
  max-width: 80%;
  line-height: 1.6;
}

.disaster-relief .image-container {
  position: relative;
  overflow: hidden;
  height: 100%;
}

.disaster-relief img {
  transition: transform 0.5s ease, filter 0.5s ease;
}

.disaster-relief:hover img {
  transform: scale(1.05);
  filter: blur(5px);
}

.disaster-relief .overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 1.5s ease;
}

.disaster-relief:hover .overlay {
  opacity: 1;
}

.disaster-relief .overlay-text {
  color: white;
  font-size: 16px;
  text-align: center;
  padding: 20px;
  max-width: 80%;
  line-height: 1.6;
}

.disability-support .image-container {
  position: relative;
  overflow: hidden;
  height: 100%;
}

.disability-support img {
  transition: transform 0.5s ease, filter 0.5s ease;
}

.disability-support:hover img {
  transform: scale(1.05);
  filter: blur(5px);
}

.disability-support .overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 1.5s ease;
}

.disability-support:hover .overlay {
  opacity: 1;
}

.disability-support .overlay-text {
  color: white;
  font-size: 16px;
  text-align: center;
  padding: 20px;
  max-width: 80%;
  line-height: 1.6;
}

.health-charity .image-container {
  position: relative;
  overflow: hidden;
  height: 100%;
}

.health-charity img {
  transition: transform 0.5s ease, filter 0.5s ease;
}

.health-charity:hover img {
  transform: scale(1.05);
  filter: blur(5px);
}

.health-charity .overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 1.5s ease;
}

.health-charity:hover .overlay {
  opacity: 1;
}

.health-charity .overlay-text {
  color: white;
  font-size: 16px;
  text-align: center;
  padding: 20px;
  max-width: 80%;
  line-height: 1.6;
}

.international-charity .image-container {
  position: relative;
  overflow: hidden;
  height: 100%;
}

.international-charity img {
  transition: transform 0.5s ease, filter 0.5s ease;
}

.international-charity:hover img {
  transform: scale(1.05);
  filter: blur(5px);
}

.international-charity .overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 1.5s ease;
}

.international-charity:hover .overlay {
  opacity: 1;
}

.international-charity .overlay-text {
  color: white;
  font-size: 16px;
  text-align: center;
  padding: 20px;
  max-width: 80%;
  line-height: 1.6;
}
</style>
