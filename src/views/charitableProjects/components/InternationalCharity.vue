<template>
  <div class="background">
    <!-- banner部分 -->
    <div class="banner">
      <div class="title-content">
        <div class="title">国际公益</div>
        <div class="subtitle">为世界带来<br />微小而美好的改变</div>
      </div>
    </div>
  </div>
  <div class="project-content">
    <el-card
      class="project-card"
      v-for="project in projects"
      :key="project.id"
      style="max-width: 480px"
    >
      <template #header>
        <div class="card-header">
          <span class="project-title">{{ project.title }}</span>
          <el-button
            class="project-status"
            :type="project.statusInfo.type"
            round
            >{{ project.statusInfo.stat }}</el-button
          >
        </div>
      </template>
      <div class="image-content">
        <img src="../../../assets/background/bg1.png" alt="" />
      </div>
      <template #footer>
        <div class="start-time">
          <el-icon size="20"><Calendar /></el-icon>
          开始时间：{{ project.startDate }}
        </div>
        <div class="member-count">
          <el-icon size="20"><User /></el-icon>
          参与人数：{{ project.memberCount }}
        </div>
        <div class="location">
          <el-icon size="20"><LocationInformation /></el-icon>
          地点：{{ project.location }}
        </div>

        <div class="tags">
          <el-icon size="20"><Bell /></el-icon>
          需求：
          <span v-for="request in project.requests" class="tag">
            {{ request }}
          </span>
        </div>
        <div class="tags">
          <el-icon size="20"><CollectionTag /></el-icon>
          类别：
          <span v-for="tag in project.tags" class="tag">
            {{ tag }}
          </span>
        </div>
        <div class="description">
          <el-icon size="20"><ChatLineSquare /></el-icon>
          简介：{{ project.desciption }}
        </div>
      </template>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const projectStatus = ref([
  {
    id: 1,
    stat: "待开始",
    type: "primary",
  },
  {
    id: 2,
    stat: "进行中",
    type: "success",
  },
  {
    id: 3,
    stat: "已结束",
    type: "info",
  },
]);

const projects = ref([
  {
    id: 1,
    title: "项目1",
    desciption: "这是一个项目的简介，用于描述项目的目的和内容。",
    image: "",
    location: "somewhere1",
    startDate: "2024-11-11",
    memberCount: 101,
    tags: ["干旱", "儿童", "教育"],
    requests: ["图书📚️", "衣物👕", "食物🍛"],
    statusInfo: projectStatus.value[0],
    contactMethods: {
      phone: "123456789",
      qqGroup: {
        qrcode: "",
        groupCode: "123456789",
      },
      wechatGroup: {
        qrcode: "",
        groupCode: "123456789",
      },
    },
  },
  {
    id: 2,
    title: "项目2",
    desciption: "这是一个项目的简介，用于描述项目的目的和内容。",
    image: "",
    location: "somewhere1",
    startDate: "2024-11-11",
    memberCount: 101,
    tags: ["干旱", "儿童", "教育"],
    requests: ["图书📚️", "衣物👕", "食物🍛"],
    statusInfo: projectStatus.value[1],
    contactMethods: {
      phone: "123456789",
      qqGroup: {
        qrcode: "",
        groupCode: "123456789",
      },
      wechatGroup: {
        qrcode: "",
        groupCode: "123456789",
      },
    },
  },
  {
    id: 3,
    title: "项目3",
    desciption: "这是一个项目的简介，用于描述项目的目的和内容。",
    image: "",
    location: "somewhere1",
    startDate: "2024-11-11",
    memberCount: 101,
    tags: ["干旱", "儿童", "教育"],
    requests: ["图书📚️", "衣物👕", "食物🍛"],
    statusInfo: projectStatus.value[2],
    contactMethods: {
      phone: "123456789",
      qqGroup: {
        qrcode: "",
        groupCode: "123456789",
      },
      wechatGroup: {
        qrcode: "",
        groupCode: "123456789",
      },
    },
  },
  {
    id: 4,
    title: "项目4",
    desciption: "这是一个项目的简介，用于描述项目的目的和内容。",
    image: "",
    location: "somewhere1",
    startDate: "2024-11-11",
    memberCount: 101,
    tags: ["干旱", "儿童", "教育"],
    requests: ["图书📚️", "衣物👕", "食物🍛"],
    statusInfo: projectStatus.value[0],
    contactMethods: {
      phone: "123456789",
      qqGroup: {
        qrcode: "",
        groupCode: "123456789",
      },
      wechatGroup: {
        qrcode: "",
        groupCode: "123456789",
      },
    },
  },
  {
    id: 5,
    title: "项目5",
    desciption: "这是一个项目的简介，用于描述项目的目的和内容。",
    image: "",
    location: "somewhere1",
    startDate: "2024-11-11",
    memberCount: 101,
    tags: ["干旱", "儿童", "教育"],
    requests: ["图书📚️", "衣物👕", "食物🍛"],
    statusInfo: projectStatus.value[1],
    contactMethods: {
      phone: "123456789",
      qqGroup: {
        qrcode: "",
        groupCode: "123456789",
      },
      wechatGroup: {
        qrcode: "",
        groupCode: "123456789",
      },
    },
  },
  {
    id: 6,
    title: "项目6",
    desciption: "这是一个项目的简介，用于描述项目的目的和内容。",
    image: "",
    location: "somewhere1",
    startDate: "2024-11-11",
    memberCount: 101,
    tags: ["干旱", "儿童", "教育"],
    requests: ["图书📚️", "衣物👕", "食物🍛"],
    statusInfo: projectStatus.value[2],
    contactMethods: {
      phone: "123456789",
      qqGroup: {
        qrcode: "",
        groupCode: "123456789",
      },
      wechatGroup: {
        qrcode: "",
        groupCode: "123456789",
      },
    },
  },
]);
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}

.background {
  height: 100vh;
  background-color: rgb(245, 245, 245);
  font-size: 18px;
  background-image: url("../../../assets/background/earth.png");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  overflow-x: hidden;

  .banner {
    position: relative;
    /* background-image: url("../../../assets/background/InternationalCharityBackground.png"); */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    .title-content {
      color: #fff;
      width: 80%;
      padding-top: 160px;
      margin: 0 auto;
      position: relative;
      top: 0;
      z-index: 10;
      text-align: right;

      .title {
        font-size: 100px;
        line-height: 1.3;
        letter-spacing: 2px;
        animation: fadeIn 3s ease-in-out;
      }

      .subtitle {
        font-size: 50px;
        line-height: 1.6;
        margin-top: 10px;
        letter-spacing: 1px;
        animation: fadeIn 6s ease-in-out;
      }
    }
  }
}

.project-content {
  .project-card {
    float: left;
    margin: 20px;
    border-radius: 20px;
    transition: transform 0.3s ease;

    .el-card__header {
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .project-title {
          font-size: 24px;
          margin-right: 10px;
        }
      }
    }

    .el-card__body {
      padding: 0;
      .image-content {
        overflow: hidden;
        border-radius: 20px;
        width: 100%;
        height: 100%;

        img {
          width: 100%;
          height: 100%;
          object-fit: fill;
          transition: transform 0.8s ease;
        }

        img:hover {
          transform: scale(1.1);
        }
      }
    }

    .el-card__footer {

      
      .start-time {
        margin-bottom: 5px;
        display: flex;
        gap: 0.5rem;
      }

      .member-count {
        margin-bottom: 5px;
        display: flex;
        gap: 0.5rem;
      }

      .location {
        margin-bottom: 5px;
        display: flex;
        gap: 0.5rem;
      }

      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 5px;
        display: flex;

        .tag {
          background: #f5f5f5;
          color: #666;
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.85rem;
        }
      }

      .description {
        margin-bottom: 5px;
        display: flex;
        gap: 0.5rem;
      }
    }
  }

  .project-card:hover {
    transform: translate(5px, -5px);
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* .projects {
  padding-top: 0;
  position: relative;
  z-index: 10;
  min-height: 60vh;
  padding-bottom: 90px;
  width: 80%;
  margin: 0 auto;
  margin-top: -110px;
}

.project-list {
  font-size: 0;
  margin-bottom: 50px;
  width: calc(100% + 120px);
}

.project-item {
  overflow: hidden;
  position: relative;
  background: #fff;
  border-radius: 20px;
  margin-bottom: 30px;
  margin-right: 20px;
  float: left;
  width: calc(33.333% - 20px);
  height: 450px;
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
  height: 90px;
  line-height: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: #fff;
  z-index: 10;
  text-align: left;
  padding: 0 35px;
  color: #222;
  transition: background-color 0.3s ease;
  transition: color 0.3s ease;
}

.project-item:hover .description {
  background-color: #fbc934;
  color: #fff;
} */
</style>
