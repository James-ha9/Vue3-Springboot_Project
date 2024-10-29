<template>
  <div class="background-container">
    <div class="content-box">
      <h1 class="title">《中国网民慈善信任指数》</h1>
      <p class="meta-info">2024年9月23日</p>
      <div class="article-content">
        <p>近日，中央财经大学社会与心理学院课题组经过数月的调查与研究，举办中国网民慈善信任指数发布会暨数字时代慈善信任学术研讨会，并发布关于2024年度中国网民慈善信任指数的研究报告——《筑牢慈善信任基石 助力慈善事业高质量发展》。</p>
        <p>
          报告显示，当前网民慈善信任指数平均得分为69.31，总体上处于比较信任的水平，但还有一定的提升空间。在互联网发展背景下，公益慈善日益脱离传统制度和秩序，信任形成的时间和空间条件发生了显著变化，需要慈善组织、互联网募捐平台及慈善监督管理组织等主体，多管齐下，综合施策，不断筑牢慈善信任基石。
        </p>

        <p>课题组基于近2000份有效问卷调研发现，互联网已成为网民获取求助和募款信息及进行慈善捐赠的主渠道。87.14%的受访者在2023年捐过款，平均捐款次数为3.27次，互联网捐款额占捐款总额的比例为57.30%，给陌生人的捐赠金额占捐赠总额的比例为56.35%。社交媒体以及慈善组织网站、网络文章或视频是网民获取求助募款信息最广泛的渠道。网民更倾向于选择水滴筹、轻松筹等个人求助平台、民政部公布的互联网募捐信息平台以及单位或集体组织的捐款方式。调查也发现，我国网民的慈善政策素养仍有待提升，尤其是对公开募捐组织和平台相关管理政策缺乏了解。</p>

        <p>
          调查显示，公众对“慈善事业监督管理部门”、“具有公开募捐资格的慈善组织”和“慈善组织互联网公开募捐信息平台”的信任程度较高。但年龄越大、学历越高，慈善信任指数得分越低。受访者年龄每增加一岁，慈善信任指数得分相应下降0.126个单位；相对于学历为本科以下者，学历为本科及以上的受访者有着更低的慈善信任指数得分；已婚受访者比未婚者的慈善信任指数得分更高；曾是慈善捐赠受益人的受访者比非受益人慈善信任指数得分更高。
        </p>

        <p>与此同时，近75%的网民认同互联网公开募捐信息平台（如腾讯公益、联劝网等）有效提升了公众对慈善捐赠的信任；约68%的网民认为平台或企业配捐提升了公众对慈善捐赠的信任。然而，公益慈善领域负面舆情事件给公众信任造成的伤害较大，近80%的网民认同互联网募捐负面舆情事件降低了公众对慈善捐赠的信任，80%以上的人需要3年及以上的时间才能恢复对涉事慈善组织的信任，31.30%的人需要10年及以上时间。</p>

        <p>
          调研还发现，网民的慈善信任指数得分每增加一个单位，捐款次数的发生率之比会增加1.6%，捐赠金额会增加0.026个单位，互联网捐赠金额会增加0.031个单位。若一家慈善组织发生了负面舆情事件，信任波及对象首当其冲的是慈善监管部门、互联网公开募捐信息平台和服务对象相近的慈善组织。一旦某慈善组织发生了负面舆情事件，近80%的网民认为要由政府监管部门来公布该事件的相关信息，这更能赢得绝大多数人的信任。而且，大多数网民认为由监管部门公布事件处理结果并对涉事组织予以处罚、涉事组织退还捐款等应对方法更能有效修复负面舆情事件中失去的信任。
        </p>

        <p>报告建议，慈善组织要规范内部治理、做好信息公开、增强公众沟通；互联网平台要充分运用数字技术助力慈善透明；相关主体要进一步健全行业自律、社会监督和行政监督协调配套的慈善监督管理体系。只有慈善组织、互联网募捐平台及慈善监督管理组织等主体，多管齐下，综合施策，才能不断筑牢慈善信任基石，助力我国慈善事业高质量发展。</p>

        <p>
          中央财经大学社会与心理学院“慈善信任”研究团队发布的2024年度中国网民慈善信任指数研究报告和围绕“数字时代慈善信任”的跨界研讨会为筑牢慈善信任的基石提供了新的理论思路和行动视角，为有效促进慈善事业高质量发展的国家战略目标提供了助力。
        </p>

        
      </div>
      <p class="source-link">
        <a
          href="https://new.qq.com/rain/a/20240923A03TT500"
          target="_blank"
          >查看原文</a
        >
      </p>
      <!-- 添加返回按钮 -->
      <div class="back-button-container">
        <button class="back-button" @click="goBack">返回上一页</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { inject } from "vue";

let isDetailView = inject("isDetailView");
const router = useRouter();

onBeforeRouteLeave((to, from, next) => {
  isDetailView.value = false;
  next();
});

// 添加返回函数
const goBack = () => {
  isDetailView.value = false;
  router.push("/main/information/research-reports");
};
</script>

<style scoped>
.background-container {
  background-image: url("@/assets/background/image02.jpg");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-box {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 50px;
  max-width: 800px;
  width: 90%;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.meta-info {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.article-content {
  font-size: 1rem;
  line-height: 1.6;
}

.source-link {
  font-size: 0.8rem;
  text-align: right;
  margin-top: 1rem;
}

.source-link a {
  color: #007bff;
  text-decoration: none;
}

.source-link a:hover {
  text-decoration: underline;
}

.back-button-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.back-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #0056b3;
}
</style>
