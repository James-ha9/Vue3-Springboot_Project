<template>
  <div class="page-container">
    <!-- 主视觉区域 -->
    <section class="hero-section" id="home">
      <div class="hero-background">
        <img 
          src="@/assets/background/RuralRevitalization01.png"
          alt="Emergency Relief"
          class="hero-image"
        />
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="text-animate">生命至上</span>
          <span class="text-animate delay-1">救援为民</span>
        </h1>
        <div class="hero-subtitle text-animate delay-2">
          专业救援 · 快速响应 · 守护生命
        </div>
        <div class="hero-description text-animate delay-3">
          我们始终坚持"快速响应、科学施救、高效协同"的救援理念，
          致力于在灾害发生后的黄金救援时间内，提供最及时、最专业的救援服务。
        </div>
        <div class="hero-actions">
          <button class="primary-btn" @click="handleEmergency">
            <i class="fas fa-phone-alt"></i>
            紧急救援
          </button>
          <button class="outline-btn" @click="handleDonate">
            <i class="fas fa-heart"></i>
            我要捐助
          </button>
        </div>
      </div>
    </section>

    <!-- 救援数据 -->
    <section class="stats-section" id="stats">
      <div class="stats-grid">
        <div v-for="(stat, index) in stats" 
             :key="index"
             class="stat-card"
             style="opacity: 1;">
          <div class="stat-icon">
            <i :class="stat.icon"></i>
          </div>
          <div class="stat-number" ref="statRefs">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
          <div class="stat-desc">{{ stat.description }}</div>
        </div>
      </div>
    </section>

    <!-- 当前救援行动 -->
    <section class="missions-section" id="missions">
      <h2 class="section-title">进行中的救援行动</h2>
      <div class="missions-grid">
        <div v-for="(mission, index) in missions" 
             :key="index"
             class="mission-card"
             style="opacity: 1;"
             :class="{ 'active': activeMission === index }"
             @mouseenter="handleMissionEnter(index)"
             @mouseleave="handleMissionLeave">
          <div class="mission-image">
            <img :src="mission.image" :alt="mission.title">
            <div class="mission-status" :class="mission.status">
              {{ mission.statusText }}
            </div>
          </div>
          <div class="mission-content">
            <h3>{{ mission.title }}</h3>
            <p class="mission-desc">{{ mission.description }}</p>
            <div class="mission-stats">
              <div class="stat-item">
                <i class="fas fa-user-friends"></i>
                <span>{{ mission.volunteers }} 名救援人员</span>
              </div>
              <div class="stat-item">
                <i class="fas fa-users"></i>
                <span>{{ mission.beneficiaries }} 受助群众</span>
              </div>
            </div>
            <div class="mission-equipment">
              <h4>救援装备</h4>
              <div class="equipment-tags">
                <span v-for="(item, index) in mission.equipments" 
                      :key="index" 
                      class="equipment-tag">
                  {{ item }}
                </span>
              </div>
            </div>
            <div class="mission-progress">
              <div class="progress-bar">
                <div class="progress" :style="{ width: `${mission.progress}%` }"></div>
              </div>
              <div class="progress-info">
                <span>已筹：¥{{ mission.raised }}</span>
                <span>目标：¥{{ mission.target }}</span>
              </div>
            </div>
            <div class="mission-footer">
              <div class="mission-meta">
                <span><i class="fas fa-map-marker-alt"></i> {{ mission.location }}</span>
                <span><i class="fas fa-clock"></i> {{ mission.startDate }}</span>
              </div>
              <button class="action-btn" @click="joinMission(mission)">
                参与救援
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 救援能力 -->
    <section class="capabilities-section" id="capabilities">
      <h2 class="section-title">专业救援能力</h2>
      <div class="capabilities-grid">
        <div v-for="(cap, index) in capabilities" 
             :key="index"
             class="capability-card">
          <div class="capability-icon">
            <i :class="cap.icon"></i>
          </div>
          <h3>{{ cap.title }}</h3>
          <p>{{ cap.description }}</p>
          <ul class="capability-features">
            <li v-for="(feature, fIndex) in cap.features" 
                :key="fIndex">
              <i class="fas fa-check"></i>
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 统计数据
const stats = ref([
  {
    icon: 'fas fa-users',
    value: '50,000+',
    label: '受助人数',
    description: '累计帮助超过5万人'
  },
  {
    icon: 'fas fa-hand-holding-heart',
    value: '¥1000万',
    label: '募集资金',
    description: '筹集善款超过1000万元'
  },
  {
    icon: 'fas fa-clock',
    value: '24/7',
    label: '响应时间',
    description: '全天候紧急救援响应'
  },
  {
    icon: 'fas fa-map-marked-alt',
    value: '100+',
    label: '救援范围',
    description: '覆盖全国100多个地区'
  }
])

// 救援行动
const missions = ref([
  {
    title: '河南暴雨紧急救援行动',
    description: '河南多地遭遇极端暴雨，郑州等地区发生严重内涝。我们已紧急调派200名专业救援人员，携带橡皮艇、水泵等专业设备驰援灾区。目前主要开展受困群众转移、物资发放、积水区域排涝等工作。',
    image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800',
    status: 'urgent',
    statusText: '紧急',
    progress: 65,
    raised: '650,000',
    target: '1,000,000',
    location: '河南省郑州市',
    startDate: '2023-07-20',
    volunteers: 200,
    beneficiaries: 5000,
    equipments: ['橡皮艇', '水泵', '发电机', '救生衣']
  },
  {
    title: '四川甘孜地震救援项目',
    description: '四川甘孜州泸定县发生6.8级地震，造成房屋倒塌、道路中断。救援队已携带生命探测仪、破拆工具等装备抵达震中。正在开展搜救、医疗救助、临时安置等工作，确保受灾群众基本生活需求。',
    image: 'https://images.unsplash.com/photo-1587653263995-422546a7a569?w=800',
    status: 'ongoing',
    statusText: '进行中',
    progress: 45,
    raised: '450,000',
    target: '1,000,000',
    location: '四川省甘孜州',
    startDate: '2023-09-05',
    volunteers: 150,
    beneficiaries: 3000,
    equipments: ['生命探测仪', '破拆工具', '帐篷', '救灾物资']
  },
  {
    title: '云南红河山洪灾害救援',
    description: '云南省红河州突发山洪灾害，多个乡镇受灾。救援队正在开展受灾群众转移安置、伤员救治、道路抢通等工作��同时配合当地政府进行灾情评估和次生灾害防范。',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800',
    status: 'ongoing',
    statusText: '进行中',
    progress: 35,
    raised: '350,000',
    target: '800,000',
    location: '云南省红河州',
    startDate: '2023-08-15',
    volunteers: 120,
    beneficiaries: 2000,
    equipments: ['抽水设备', '救援车辆', '医疗用品']
  },
  {
    title: '广东台风"天鸽"救援行动',
    description: '超强台风"天鸽"登陆广，造成严重灾情。救援队正在开展群众转移、设施加固、道路清障等工作。重点关注沿海地区渔民安全转移和受灾群众基本生活保障。',
    image: 'https://images.unsplash.com/photo-1584267385494-9fdd9a71ad75?w=800',
    status: 'ongoing',
    statusText: '进行中',
    progress: 55,
    raised: '440,000',
    target: '800,000',
    location: '广东省湛江市',
    startDate: '2023-08-25',
    volunteers: 180,
    beneficiaries: 4000,
    equipments: ['救生艇', '应急照明', '通讯设备']
  }
])

// 救援能力
const capabilities = ref([
  {
    icon: 'fas fa-helicopter',
    title: '空中救援',
    description: '配备专业直升机救援队伍，提供全天候空中救援支持',
    features: [
      '24小时待命起飞',
      '全天候救援能力',
      '专业救援设备'
    ]
  },
  {
    icon: 'fas fa-water',
    title: '水域救援',
    description: '专业水域救援队伍，应对洪涝灾害',
    features: [
      '专业救生设备',
      '快速反应能力',
      '水下搜救能力'
    ]
  },
  {
    icon: 'fas fa-mountain',
    title: '山地救援',
    description: '专业山地救援队伍，处理地质灾害',
    features: [
      '专业绳索技术',
      '地质灾害评估',
      '高空救援能力'
    ]
  }
])

const activeMission = ref(null)

// 方法定义
const handleMissionEnter = (index) => {
  activeMission.value = index
}

const handleMissionLeave = () => {
  activeMission.value = null
}

const handleEmergency = () => {
  window.location.href = 'tel:400-000-0000'
}

const handleDonate = () => {
  // 实现捐赠逻辑
}

const joinMission = (mission) => {
  // 实现参与救援逻辑
}

// 生命周期钩子
onMounted(() => {
  // 确保DOM完全加载
  nextTick(() => {
    initAnimations()
  })
})

// 初始化动画
const initAnimations = () => {
  // 标题动画
  gsap.from('.hero-title .text-animate', {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power4.out',
    delay: 0.5
  })

  // 统计卡片动画
  gsap.from('.stat-card', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
      trigger: '.stats-grid',
      start: 'top center+=100',
      once: true
    }
  })

  // 救援行动卡片动画
  gsap.from('.mission-card', {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.3,
    scrollTrigger: {
      trigger: '.missions-grid',
      start: 'top center+=100',
      once: true
    }
  })
}
</script>

<style scoped>
/* 基础样式 */
.page-container {
  width: 100%;
  min-height: 100vh;
  background: #fff;
  overflow-x: hidden;
}

/* 主视觉区域 */
.hero-section {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.7)
  );
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #fff;
  max-width: 800px;
  padding: 0 20px;
}

.hero-title {
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.8);
}

.hero-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.primary-btn, .outline-btn {
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.primary-btn {
  background: #e53935;
  color: #fff;
  border: none;
}

.primary-btn:hover {
  background: #d32f2f;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(229, 57, 53, 0.3);
}

.outline-btn {
  background: transparent;
  color: #fff;
  border: 2px solid #fff;
}

.outline-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

/* 统计数据区域 */
.stats-section {
  padding: 4rem 0;
  background: #f5f5f5;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.stat-card {
  background: #fff;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  font-size: 2.5rem;
  color: #e53935;
  margin-bottom: 1rem;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.stat-desc {
  font-size: 0.9rem;
  color: #888;
}

/* 救援行动区域 */
.missions-section {
  padding: 4rem 0;
  max-width: 1200px;
  margin: 0 auto;
}

.missions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  padding: 0 20px;
}

.mission-card {
  position: relative;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  opacity: 1;
  transform: none;
  will-change: transform;
}

.mission-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.mission-image {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
}

.mission-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.mission-card:hover .mission-image img {
  transform: scale(1.05);
}

.mission-status {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1.2rem;
  border-radius: 30px;
  font-size: 0.875rem;
  font-weight: 600;
  z-index: 2;
}

.urgent {
  background: rgba(229, 57, 53, 0.95);
  color: #fff;
}

.ongoing {
  background: rgba(251, 140, 0, 0.95);
  color: #fff;
}

.mission-content {
  padding: 1.5rem;
}

.mission-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.75rem;
}

.mission-desc {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 1.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.mission-progress {
  margin-bottom: 1.25rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.progress {
  height: 100%;
  background: linear-gradient(45deg, #e53935, #ff5252);
  border-radius: 4px;
  transition: width 0.6s ease;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #666;
}

.mission-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid #eee;
}

.mission-meta {
  display: flex;
  gap: 1.25rem;
  font-size: 0.875rem;
  color: #888;
}

.mission-meta span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.mission-meta i {
  color: #e53935;
}

.action-btn {
  padding: 0.75rem 1.5rem;
  background: #e53935;
  color: #fff;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: #d32f2f;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(229, 57, 53, 0.3);
}

/* 救援能力区域 */
.capabilities-section {
  padding: 4rem 0;
  background: #f5f5f5;
}

.capabilities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.capability-card {
  background: #fff;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.capability-card:hover {
  transform: translateY(-5px);
}

.capability-icon {
  font-size: 2.5rem;
  color: #e53935;
  margin-bottom: 1rem;
}

.capability-card h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #333;
}

.capability-card p {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.capability-features {
  text-align: left;
  list-style: none;
  padding: 0;
}

.capability-features li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.capability-features i {
  color: #4caf50;
}

/* 动画类 */
.text-animate {
  opacity: 1;
  transform: none;
}

.delay-1 {
  animation-delay: 0.2s;
}

.delay-2 {
  animation-delay: 0.4s;
}

.delay-3 {
  animation-delay: 0.6s;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-actions {
    flex-direction: column;
  }

  .missions-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 2rem;
  }

  .missions-grid {
    grid-template-columns: 1fr;
  }
  
  .mission-image {
    height: 200px;
  }
  
  .mission-content {
    padding: 1.25rem;
  }
}

/* 救援行动卡片的补充样式 */
.mission-stats {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}

.stat-item i {
  color: #e53935;
  font-size: 1.1rem;
}

.mission-equipment {
  margin-bottom: 1.25rem;
}

.mission-equipment h4 {
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.75rem;
}

.equipment-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.equipment-tag {
  background: #f5f5f5;
  color: #666;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
}

/* 调整卡片整体样式 */
.mission-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 550px; /* 确保卡片高度统一 */
}

.mission-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.mission-footer {
  margin-top: auto;
}
</style>
  