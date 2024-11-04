import { defineThemeConfig } from "vuepress-theme-plume";
import { enNavbar, zhNavbar } from "./navbar";
import { enNotes, zhNotes } from "./notes/index";

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: "https://theme-plume.vuejs.press/plume.png",
  // your git repo url
  docsRepo: "",
  docsDir: "docs",

  appearance: true,

  social: [{ icon: "github", link: "https://github.com/Jackpanger" }],

  locales: {
    "/": {
      profile: {
        avatar: "https://avatars.githubusercontent.com/u/45305339?v=4",
        name: "Phoat Press",
        description:
          "A safe space for introverted reflections and personal growth",
        circle: true,
        location: "Jersey City",
        // organization: '',
      },

      navbar: enNavbar,
      notes: enNotes,
    },
    "/zh/": {
      profile: {
        avatar: "https://avatars.githubusercontent.com/u/45305339?v=4",
        name: "Phoat Press",
        description: "个人博客",
        // circle: true,
        // location: '',
        // organization: '',
      },

      navbar: zhNavbar,
      notes: zhNotes,
    },
  },
});
