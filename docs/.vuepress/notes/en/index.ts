import { defineNoteConfig, defineNotesConfig } from "vuepress-theme-plume";

const enDemoNote = defineNoteConfig({
  dir: "guide",
  link: "/guide",
  sidebar: ["", "nas"],
});

// export const enNotes = defineNotesConfig({
//   dir: "notes",
//   link: "/",
//   notes: [enDemoNote],
// });
export const enNotes = defineNotesConfig({
  dir: "notes",
  link: "/",
  notes: [enDemoNote],
});
