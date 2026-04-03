/**
 * Plugin settings tab used by the sample starter to expose its demo configuration.
 */

import {
  PluginSettingTab,
  Setting,
  type ButtonComponent,
  type TextComponent,
} from 'wstudio-api';
import type WStudioSamplePlugin from './main';

const SAMPLE_PLUGIN_TITLE = 'WStudio Plugin Sample';
const SAMPLE_OPEN_MODAL_COMMAND_NAME = 'Open Simple Modal';

export class SampleSettingTab<TPlugin extends WStudioSamplePlugin> extends PluginSettingTab<TPlugin> {
  public display(): void {
    this.containerEl.replaceChildren();

    const titleEl = document.createElement('h2');
    titleEl.textContent = SAMPLE_PLUGIN_TITLE;
    this.containerEl.append(titleEl);

    new Setting(this.containerEl)
      .setName('Ribbon Notice Message')
      .setDesc('Controls the notice content shown when the ribbon icon is clicked.')
      .addText((text: TextComponent) => {
        text
          .setPlaceholder('Enter ribbon notice content')
          .setValue(this.plugin.settings.ribbonNoticeMessage)
          .onChange((value: string) => this.plugin.updateRibbonNoticeMessage(value));
      });

    new Setting(this.containerEl)
      .setName(SAMPLE_OPEN_MODAL_COMMAND_NAME)
      .setDesc('Opens the same simple modal used by the command palette action.')
      .addButton((button: ButtonComponent) => {
        button
          .setButtonText('Open')
          .setCta()
          .onClick(() => this.plugin.openSimpleModal());
      });

    new Setting(this.containerEl)
      .setName('Global Event Demo')
      .setDesc('The plugin registers a global click event and a global setInterval log.');
  }
}
