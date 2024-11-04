import { defineNoteConfig, defineNotesConfig } from "vuepress-theme-plume";
import { themeGuide } from "./theme-guide";

// const enDemoNote = defineNoteConfig({
//   dir: "guide",
//   link: "/guide",
//   sidebar: ["", "nas", "red_book"],
// });

// export const enNotes = defineNotesConfig({
//   dir: "notes",
//   link: "/",
//   notes: [enDemoNote],
// });
export const enNotes = defineNotesConfig({
  dir: "notes",
  link: "/",
  notes: [themeGuide],
});
