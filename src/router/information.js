export default [
  {
    path: "activity-news",
    name: "activity-news",
    component: () => import("@/views/Information/components/ActivityNews.vue"),
    children: [
      {
        path: "detail01",
        name: "detail01", 
        component: () => import("@/views/Information/components/components/detail01.vue"), // 指向新组件
      },
      {
        path: "detail02",
        name: "detail02", 
        component: () => import("@/views/Information/components/components/detail02.vue"), // 指向新组件
      },
      {
        path: "detail03",
        name: "detail03", 
        component: () => import("@/views/Information/components/components/detail03.vue"), // 指向新组件
      },
      {
        path: "detail04",
        name: "detail04", 
        component: () => import("@/views/Information/components/components/detail04.vue"), // 指向新组件
      },
      {
        path: "detail05",
        name: "detail05", 
        component: () => import("@/views/Information/components/components/detail05.vue"), // 指向新组件
      },
      {
        path: "detail06",
        name: "detail06", 
        component: () => import("@/views/Information/components/components/detail06.vue"), // 指向新组件
      },
      {
        path: "detail07",
        name: "detail07", 
        component: () => import("@/views/Information/components/components/detail07.vue"), // 指向新组件
      },
      {
        path: "detail08",
        name: "detail08", 
        component: () => import("@/views/Information/components/components/detail08.vue"), // 指向新组件
      },
      {
        path: "detail09",
        name: "detail09", 
        component: () => import("@/views/Information/components/components/detail09.vue"), // 指向新组件
      },
    ],
  },
  {
    path: "research-reports",
    name: "research-reports",
    component: () =>
      import("@/views/Information/components/ResearchReports.vue"),
  },
];
