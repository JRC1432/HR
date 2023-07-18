import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DetailModal from "@/components/DetailModal.vue";
import DashboardView from "@/views/DashboardView.vue";
import JobUpdateView from "@/views/JobUpdateView.vue";
import UserProfileView from "@/views/UserProfileView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../layouts/Userlayout.vue"),
      children: [
        {
          path: "/",
          name: "home",
          component: HomeView,
        },
        // {
        //   path: "/about",
        //   name: "about",
        //   // route level code-splitting
        //   // this generates a separate chunk (About.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () => import("../views/AboutView.vue"),
        // },
        {
          path: "/modal",
          name: "modal",
          component: DetailModal,
        },

        {
          path: "/appform",
          name: "appform",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/UserappformView.vue"),
        },
        {
          path: "/agreement",
          name: "agreement",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/AgreeformView.vue"),
        },
        {
          path: "/logout",
          name: "logout",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../layouts/Userlayout.vue"),
        },
      ],
    },
    {
      path: "/",
      component: () => import("../layouts/Dashboardlayout.vue"),
      children: [
        {
          path: "/dash",
          name: "dash",
          component: DashboardView,
        },
        {
          path: "/applicants",
          name: "applicants",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/ApplicantsView.vue"),
        },
        {
          path: "/jobs",
          name: "jobs",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/Newjob.vue"),
        },
        {
          path: "/salary",
          name: "salary",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/SalaryView.vue"),
        },
        {
          path: "/updateJob/:id",
          name: "updateJob",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/UpdateJob.vue"),
        },
        {
          path: "/editdrc/:id",
          name: "editdrc",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/EditDRCView.vue"),
        },
        {
          path: "/editduties/:id",
          name: "editduties",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/EditDutiesView.vue"),
        },
        {
          path: "/survey",
          name: "survey",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/SurveyView.vue"),
        },
        {
          path: "/test2",
          name: "test2",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/TestView2.vue"),
        },
        {
          path: "/test3",
          name: "test3",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/TestView3.vue"),
        },
      ],
    },
    {
      path: "/",
      component: () => import("../layouts/UserDashboardlayout.vue"),
      children: [
        {
          path: "/userdash",
          name: "userdash",
          component: UserProfileView,
        },
        {
          path: "/jobup",
          name: "jobup",
          component: JobUpdateView,
        },
      ],
    },
    {
      path: "/",
      component: () => import("../layouts/RegisterLayout.vue"),
      children: [
        {
          path: "/register",
          name: "register",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/RegisterView.vue"),
        },
        {
          path: "/application/:id/",
          name: "application",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/ApplicationView.vue"),
        },
      ],
    },
    {
      path: "/",
      component: () => import("../layouts/LoginLayout.vue"),
      children: [
        {
          path: "/apply",
          name: "apply",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/CareersView.vue"),
        },
      ],
    },
  ],
});

export default router;
