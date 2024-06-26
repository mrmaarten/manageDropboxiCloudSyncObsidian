/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => AddToDeletePlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var AddToDeletePlugin = class extends import_obsidian.Plugin {
  // settings: MyPluginSettings;
  async onload() {
    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, file, source) => {
        menu.addItem((item) => {
          item.setTitle("Add to _delete").setIcon("trash").onClick(() => this.addToDelete(file));
        });
      })
    );
  }
  onunload() {
  }
  // async loadSettings() {
  //     this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  // }
  // async saveSettings() {
  //     await this.saveData(this.settings);
  // }
  async addToDelete(file) {
    const vault = this.app.vault;
    let deleteFile = vault.getAbstractFileByPath("_delete.md");
    if (!deleteFile) {
      await vault.create("_delete.md", "");
      deleteFile = vault.getAbstractFileByPath("_delete.md");
    }
    const filePath = file.path;
    const currentContent = await vault.read(deleteFile);
    await vault.modify(deleteFile, currentContent + "\n" + filePath);
  }
};
