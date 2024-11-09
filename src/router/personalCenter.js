export default [
    {
        path: "personal-data",
        name: "personal-data",
        component: () => import("@/views/personalCenter/page/PersonalData.vue"),
        meta: {
            requiresAuth: true,
            title: '个人资料'
        }
    },
    {
        path: "account-setting",
        name: "account-setting",
        component: () => import("@/views/personalCenter/page/AccountSetting.vue"),
        meta: {
            requiresAuth: true,
            title: '账户设置'
        }
    }
];
