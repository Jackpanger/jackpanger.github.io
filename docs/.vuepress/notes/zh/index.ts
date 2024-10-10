import { defineNotesConfig, defineNoteConfig } from "vuepress-theme-plume";
import { themeGuide } from "./theme-guide";
import { themeConfig } from "./theme-config";
import { plugins } from "./plugins";
import { tools } from "./tools";

const zhDemoNote = defineNoteConfig({
  dir: "guide",
  link: "/guide",
  sidebar: ["", "nas", "red_book"],
});
export const zhNotes = defineNotesConfig({
  dir: "/zh/notes",
  link: "/",
  notes: [themeGuide],
});
// [themeGuide, themeConfig, plugins, tools]

//   export const zhNotes = defineNotesConfig({
//     dir: "zh/notes",
//     link: "/zh/",
//     notes: [zhDemoNote],
//   });
