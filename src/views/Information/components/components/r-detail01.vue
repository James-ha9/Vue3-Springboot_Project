<template>
  <div class="background-container">
    <div class="content-box">
      <h1 class="title">中基透明指数FTI2023报告</h1>
      <p class="meta-info">2024年01月07日</p>
      <div class="article-content">
        <p>一、民政部启动“阳光慈善”工程</p>
        <p>
          2023年，民政部启动“阳光慈善”工程，通过政策宣讲、监督管理、信息化和制度建设，推动慈善组织真实、完整、及时地进行信息公开，提升慈善事业公信力。
        </p>

        <p>二、慈善组织学习法规并自查自纠</p>

        <p>
          在“阳光慈善”工程推动下，各地慈善组织学习《慈善法》《慈善组织信息公开办法》等法规，进行自查自纠，整改存在的问题。
        </p>

        <p>三、基金会行业数据发布会</p>

        <p>
          1月12日，基金会中心网举办中国基金会行业数据发布会，发布了包括《中基透明指数FTI2023报告》在内的多项报告。
        </p>

        <p>四、基金会平均透明度提升</p>

        <p>
          数据显示，FTI2023平均值为61.39分，比FTI2022提升了2.32分，首次突破及格线，显示基金会信息公开水平在不断提升。
        </p>

        <p>五、中基透明指数介绍</p>

        <p>
          中基透明指数(FTI)由基金会中心网和清华大学廉政与治理研究中心联合开发，旨在反映基金会自律透明和信息公开水平。
        </p>

        <p>六、FTI指标和规则升级</p>

        <p>
          2023年，FTI指标和规则进行了升级迭代，包括增加新的财务指标和提升部分原有指标要求，以回应法律法规和公众诉求。
        </p>

        <p>七、FTI观测范围和结果</p>

        <p>
          FTI2023观测了2570家基金会，占比29.63%，但净资产占全国基金会总量的79.41%。观测结果显示，公募基金会的平均值为64.15分，非公募基金会为60.59分。
        </p>

        <p>八、信息公开存在的问题</p>

        <p>
          基金会信息公开存在的问题包括信息化建设有待提升、缺少“人”的信息、善款来源与去向不明晰、年度工作报告项目信息不全、项目信息少成效等。
        </p>

        <p>九、行动建议</p>

        <p>
          《中基透明指数FTI2023报告》从基金会、支持机构、管理部门三个方面提出了提升信息公开水平的行动建议。
        </p>

        <p>十、社会公众的选择和监督</p>

        <p>
          社会公众的选择和监督也是促进“阳光慈善”的重要一环。帮帮公益平台将于2024年1月中旬上线公益机构标签功能，包括“中国社会组织等级评估”和“中基透明指数FTI”两个标签，为用户提供参考。
        </p>

        <p>十一、基金会中心网未来计划</p>

        <p>
          基金会中心网将进一步向行业和社会开放数据，推动中国基金会更加透明和有效。
        </p>
      </div>
      <p class="source-link">
        <a
          href="http://www.gongyishibao.com/html/yanjiubaogao/2024/01/26314.html"
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
