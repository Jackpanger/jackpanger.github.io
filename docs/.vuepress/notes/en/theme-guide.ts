import { defineNoteConfig } from "vuepress-theme-plume";

export const themeGuide = defineNoteConfig({
  dir: "guide",
  link: "/guide/",
  sidebar: [
    {
      text: "Quick Start",
      collapsed: false,
      icon: "carbon:idea",
      items: [
        // { text: "本站介绍", link: "intro" },
        // { text: "威联通", link: "nas" },
        // { text: "小红书", link: "red_book" },
        "intro",
        "nas",
        "red_book",
        // '介绍',
        // '安装与使用',
        // '博客',
        // '知识笔记',
        // '编写文章',
        // '国际化',
        // '部署',
      ],
    },
    {
      text: "Visa",
      icon: "fluent-mdl2:edit-create",
      collapsed: false,
      items: [
        {
          text: "US Visa",
          icon: "material-symbols:markdown-outline",
          prefix: "visa/usvisa",
          collapsed: true,
          items: ["mexico"],
        },
        {
          text: "Mexico Visa",
          prefix: "visa/mexicovisa",
          icon: "ph:code-bold",
          collapsed: true,
          items: ["mexico_visa"],
        },
        // {
        //   text: "代码演示",
        //   prefix: "代码演示",
        //   icon: "carbon:demo",
        //   collapsed: true,
        //   items: [
        //     "前端",
        //     "rust",
        //     "golang",
        //     "kotlin",
        //     "codepen",
        //     "jsFiddle",
        //     "codeSandbox",
        //     "replit",
        //   ],
        // },
        // {
        //   text: "图表",
        //   icon: "mdi:chart-line",
        //   prefix: "图表",
        //   collapsed: true,
        //   items: ["chart", "echarts", "mermaid", "flowchart"],
        // },
        // {
        //   text: "资源嵌入",
        //   icon: "dashicons:embed-video",
        //   prefix: "嵌入",
        //   collapsed: true,
        //   items: ["pdf", "bilibili", "youtube"],
        // },
      ],
    },
    {
      text: "NAS",
      icon: "lucide:box",
      collapsed: false,
      prefix: "nas",
      items: ["ddns-go"],
    },
    {
      text: "Coding",
      prefix: "coding",
      icon: "uiw:component",
      collapsed: false,
      items: [
        "intro",
        "design",
        {
          text: "Company",
          icon: "material-symbols:markdown-outline",

          collapsed: true,
          items: ["amazon"],
        },
        {
          text: "Data Structure",
          icon: "material-symbols:markdown-outline",

          collapsed: true,
          items: ["array", "matrix", "string", "heap", "tree", "graph"],
        },
        {
          text: "Algorithm",
          icon: "material-symbols:markdown-outline",

          collapsed: true,
          items: ["greedy"],
        },
      ],
    },
    // {
    //   text: "自定义",
    //   icon: "material-symbols:dashboard-customize-outline-rounded",
    //   collapsed: false,
    //   items: ["自定义首页", "自定义样式", "布局插槽", "组件覆写"],
    // },
    // {
    //   text: "API",
    //   icon: "mdi:api",
    //   collapsed: false,
    //   items: ["api-客户端", "api-node"],
    // },
  ],
});
