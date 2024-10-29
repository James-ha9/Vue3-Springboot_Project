<template>
  <div class="background-container">
    <div class="content-box">
      <h1 class="title">2021年中国乡村振兴发展研究报告</h1>
      <p class="meta-info">2022年01月07日</p>
      <div class="article-content">
        <p>一、行业发展概况</p>
        <p>
          我国城乡居民收入差距大，城乡发展不平衡。实施乡村振兴战略可解决“三农”问题，促进“三生”协调与“三业”融合，弘扬文化传统。乡村振兴指数涵盖129支相关股票，近年来在国家政策推动下，主营业务收入有所增长，预测2023年将超18000亿元。
        </p>

        <p>二、商业模式和收入模式</p>

        <p>2.1 产业链价值链商业模式</p>
        <p>
          产业链价值链：“十四五”期间，我国坚持农业农村优先发展，强化农业基础地位，推动乡村产业振兴，涵盖众多行业。
        </p>
        <p>
          商业模式：乡村振兴覆盖行业广泛，商业模式复杂。畜禽养殖、影视传媒等产业链展示了行业多样性。部分龙头股如通威股份、芒果超煤、新希望等，业务构成多样。
        </p>
        <p>2.2 技术发展</p>
        <p>
          乡村振兴指数中，中联重科、隆鑫通用、一拖股份等公司拥有较多专利授权，助力现代化农村建设。
        </p>
        <p>2.3 政策和监管</p>
        <p>
          乡村振兴主要监管单位为农业农村部，同时受多部委监管。自律组织为乡村振兴工作委员会，有众多法规指导行业发展。
        </p>

        <p>三、基金会行业数据发布会</p>

        <p>3.1 行业综合财务分析和估值方法</p>
        <p>
          乡村振兴指数及其成分股有多种估值方法，如市盈率、市净率等。部分龙头股历史估值指标可供参考。
        </p>
        <p>3.2 行业发展和价格驱动机制及风险管理</p>
        <p>
          《全国乡村产业发展规划(2020-2025年)》提出到2025年乡村产业体系健全完备，政策环境优化将推进乡村振兴发展。
        </p>
        <p>3.3 竞争分析</p>
        <p>
          我国严守耕地红线，实施高标准农田建设工程等。黑龙江省等地新建高标准农田较多，各省市加快农业农村现代化改造。
        </p>

        <p>3.4 概念龙头股</p>
        <p>通威股份：农业、新能源双主业，全球高纯晶硅及晶硅电池龙头企业。</p>
        <p>芒果超煤：新型主流媒体产业集团，形成完整新媒体产业链布局。</p>
        <p>中联重科：全球化企业，工程机械技术发源地，国际标准制定者。</p>
        <p>新希望：农牧产业为主，业务遍布国内外近20个国家。</p>

        <p>3.5 全球重要竞争者</p>
        <p>
          美股农产品行业龙头股包括阿彻丹尼尔斯米德兰、Corteva、家乐氏、邦吉等，各公司在粮食加工、种子供应、即食谷物等领域有领先地位。
        </p>

        <p>四、 未来行业展望</p>
        <p>
          未来，乡村振兴将在政策扶持下继续发展，相关产业将受益。预测到2023年，乡村振兴指数的营业收入可达19000亿元以上，净利润约为779亿元，发展潜力巨大。部分省市已出台乡村振兴政策，推动行业发展。
        </p>
      </div>
      <p class="source-link">
        <a
          href="https://www.21jingji.com/article/20220107/herald/d2a02c01eb96225a91de0dcdecd73969.html"
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
