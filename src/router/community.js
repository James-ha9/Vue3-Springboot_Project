export default [
    {
        path: "invitation",
        name: "invitation",
        component: () => import("@/views/community/components/Invitation.vue"),
    },
    {
        path: "forum",
        name: "forum",
        component: () => import("@/views/community/components/Forum.vue"),
        children: [
            {
                path: "forumDeatil",
                name: "forumDeatil",
                component: () => import("@/views/community/components/ForumDeatil.vue")
            }
        ]
    },
    {
        path: "create",
        name: "create",
        component: () => import("@/views/community/components/CreateBlog.vue")
    },
    {
        path: "recycling",
        name: "recycling",
        component: () => import("@/views/community/components/recycling.vue")
    },
    {
        path: "recycling-preview",
        name: "recycling-preview",
        component: () => import("@/views/community/components/RecyclingAllPreview.vue")
    },
    {
        path: "photoWall",
        name: "photoWall",
        component: () => import("@/views/community/components/photoWall.vue")
    },
    {
        path: "map",
        name: "map",
        component: () => import("@/views/community/components/map.vue")
    },
    {
        path: "ai",
        name: "ai",
        component: () => import("@/views/community/components/Ai.vue")
    }
];
