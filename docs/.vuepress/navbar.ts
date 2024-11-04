import { defineNavbarConfig } from "vuepress-theme-plume";

export const enNavbar = defineNavbarConfig([
  { text: "Home", link: "/" },
  { text: "Blog", link: "/blog/" },
  { text: "Guide", link: "/notes/guide/intro.md" },
  { text: "Tags", link: "/blog/tags/" },
  { text: "Archives", link: "/blog/archives/" },
  {
    text: "Notes",
    items: [
      { text: "Quick Start", link: "/notes/guide/intro.md" },
      { text: "NAS", link: "/notes/guide/nas/nas.md" },
      {
        text: "Technical Materials",
        link: "/notes/guide/material/material.md",
      },
      { text: "Red Book", link: "/notes/guide/red_book/red_book.md" },
    ],
  },
]);

export const zhNavbar = defineNavbarConfig([
  { text: "首页", link: "/zh/" },
  { text: "指南", link: "/zh/notes/guide/intro.md" },
  { text: "博客", link: "/zh/blog/" },
  { text: "标签", link: "/zh/blog/tags/" },
  { text: "归档", link: "/zh/blog/archives/" },
  {
    text: "笔记",
    items: [
      {
        text: "快速开始",
        link: "/zh/notes/guide/intro.md",
        // activeMatch: "^/guide/",
      },
    ],
  },
]);
