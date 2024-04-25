import { Plugin, TFile, Vault } from 'obsidian';

// interface MyPluginSettings {}

// const DEFAULT_SETTINGS: MyPluginSettings = {}

export default class AddToDeletePlugin extends Plugin {
    // settings: MyPluginSettings;

    async onload() {
        // await this.loadSettings();

        this.registerEvent(
            this.app.workspace.on('file-menu', (menu, file: TFile, source) => {
                menu.addItem((item) => {
                    item.setTitle('Add to _delete')
                        .setIcon('trash')
                        .onClick(() => this.addToDelete(file));
                });
            })
        );
    }

    onunload() {}

    // async loadSettings() {
    //     this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    // }

    // async saveSettings() {
    //     await this.saveData(this.settings);
    // }

    async addToDelete(file: TFile) {
        const vault: Vault = this.app.vault;
        let deleteFile: TFile = vault.getAbstractFileByPath('_delete.md') as TFile;
        
        if (!deleteFile) {
            await vault.create('_delete.md', '');
            deleteFile = vault.getAbstractFileByPath('_delete.md') as TFile;
        }

		const filePath: string = file.path;
        const currentContent: string = await vault.read(deleteFile);
        await vault.modify(deleteFile, currentContent + '\n' + filePath);
    }
}