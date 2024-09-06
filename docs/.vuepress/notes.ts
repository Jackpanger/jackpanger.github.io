import { defineNoteConfig, defineNotesConfig } from "vuepress-theme-plume";

/* =================== locale: en-US ======================= */

const enDemoNote = defineNoteConfig({
  dir: "nav",
  link: "/nav",
  sidebar: ["", "nas"],
});

export const enNotes = defineNotesConfig({
  dir: "notes",
  link: "/",
  notes: [enDemoNote],
});

/* =================== locale: zh-CN ======================= */

const zhDemoNote = defineNoteConfig({
  dir: "nav",
  link: "/nav",
  sidebar: ["", "nas", "red_book"],
});

export const zhNotes = defineNotesConfig({
  dir: "zh/notes",
  link: "/zh/",
  notes: [zhDemoNote],
});
