import { defineNoteConfig } from "vuepress-theme-plume";

export const themeGuide = defineNoteConfig({
  dir: "guide",
  link: "/guide/",
  sidebar: [
    {
      text: "从这里开始",
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
      text: "签证",
      icon: "fluent-mdl2:edit-create",
      collapsed: false,
      items: [
        {
          text: "美签",
          icon: "material-symbols:markdown-outline",
          prefix: "visa/usvisa",
          collapsed: true,
          items: ["mexico"],
        },
        // {
        //   text: "代码块",
        //   prefix: "代码",
        //   icon: "ph:code-bold",
        //   collapsed: true,
        //   items: ["介绍", "特性支持", "代码组", "导入代码", "twoslash"],
        // },
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
    // {
    //   text: "功能",
    //   icon: "lucide:box",
    //   collapsed: false,
    //   prefix: "功能",
    //   items: [
    //     "图标",
    //     "代码复制",
    //     "内容搜索",
    //     "评论",
    //     "加密",
    //     "文章水印",
    //     "友情链接页",
    //     "seo",
    //     "sitemap",
    //   ],
    // },
    // {
    //   text: "组件",
    //   prefix: "组件",
    //   icon: "uiw:component",
    //   collapsed: false,
    //   items: [
    //     "徽章",
    //     "图标",
    //     "隐秘文本",
    //     "卡片",
    //     "链接卡片",
    //     "图片卡片",
    //     "卡片容器",
    //     "首页布局容器",
    //     "repoCard",
    //     "npmBadge",
    //   ],
    // },
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
