/**
 * Main plugin entry for the WStudio sample starter, including the modal and React helpers.
 */

import {
  Modal,
  Notice,
  Plugin,
  type App,
  type JsonValue,
  type PluginFailureContext,
} from 'wstudio-api';
import { createElement, type JSX, type ReactNode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { SampleSettingTab } from './settings';

const SAMPLE_PLUGIN_TITLE = 'WStudio Plugin Sample';
const SAMPLE_OPEN_MODAL_COMMAND_ID = 'open-simple-modal';
const SAMPLE_OPEN_MODAL_COMMAND_NAME = 'Open Simple Modal';
const DEFAULT_RIBBON_NOTICE_MESSAGE = 'Sample ribbon icon clicked.';
const SAMPLE_INTERVAL_MS = 5000;

export interface SamplePluginSettings {
  readonly [key: string]: JsonValue;
  readonly ribbonNoticeMessage: string;
}

function normalizeRibbonNoticeMessage(candidate: string): string {
  const normalized = candidate.trim();

  return normalized.length > 0 ? normalized : DEFAULT_RIBBON_NOTICE_MESSAGE;
}

function createDefaultSettings(): SamplePluginSettings {
  return {
    ribbonNoticeMessage: DEFAULT_RIBBON_NOTICE_MESSAGE,
  };
}

function mergeSettings(candidate: JsonValue | null): SamplePluginSettings {
  if (candidate === null || typeof candidate !== 'object' || Array.isArray(candidate)) {
    return createDefaultSettings();
  }

  const record = candidate as {
    readonly ribbonNoticeMessage?: JsonValue;
  };

  return {
    ribbonNoticeMessage:
      typeof record.ribbonNoticeMessage === 'string'
        ? normalizeRibbonNoticeMessage(record.ribbonNoticeMessage)
        : DEFAULT_RIBBON_NOTICE_MESSAGE,
  };
}

interface SampleSimpleModalContentProps {
  readonly ribbonNoticeMessage: string;
}

function SampleSimpleModalContent(
  { ribbonNoticeMessage }: SampleSimpleModalContentProps,
): JSX.Element {
  return createElement(
    'div',
    { className: 'wstudio-plugin-sample-react-panel' },
    createElement(
      'p',
      { className: 'wstudio-plugin-sample-modal-copy' },
      'This modal is rendered by React.',
    ),
    createElement(
      'p',
      { className: 'wstudio-plugin-sample-modal-copy' },
      `Current ribbon notice message: ${ribbonNoticeMessage}`,
    ),
  );
}

class PluginReactRoot {
  private root: Root | null = null;

  public mount(container: HTMLElement, node: ReactNode): void {
    if (this.root === null) {
      this.root = createRoot(container);
    }

    this.root.render(node);
  }

  public unmount(): void {
    this.root?.unmount();
    this.root = null;
  }
}

class SampleSimpleModal extends Modal {
  private readonly reactRoot = new PluginReactRoot();

  public constructor(
    app: App,
    private readonly ribbonNoticeMessage: string,
  ) {
    super(app);
    this.setTitle('Simple Modal');
  }

  public override onOpen(): void {
    this.reactRoot.mount(
      this.contentEl,
      createElement(SampleSimpleModalContent, {
        ribbonNoticeMessage: this.ribbonNoticeMessage,
      }),
    );
  }

  public override onClose(): void {
    this.reactRoot.unmount();
  }
}

export default class WStudioSamplePlugin extends Plugin {
  public settings: SamplePluginSettings = createDefaultSettings();

  public async onload(): Promise<void> {
    this.settings = mergeSettings(await this.loadData<SamplePluginSettings>());

    this.addRibbonIcon('beaker', 'Show Demo Notice', () => {
      new Notice(this.settings.ribbonNoticeMessage, 1500);
    });

    this.addCommand({
      id: SAMPLE_OPEN_MODAL_COMMAND_ID,
      name: SAMPLE_OPEN_MODAL_COMMAND_NAME,
      callback: () => {
        this.openSimpleModal();
      },
    });

    this.addSettingTab(new SampleSettingTab<this>(this.app, this));

    this.registerDomEvent(document, 'click', () => {
      console.log('click');
    });

    this.registerInterval(
      setInterval(() => {
        console.log('setInterval');
      }, SAMPLE_INTERVAL_MS),
    );
  }

  public onunload(): void {
    return undefined;
  }

  public onEnable(): void {
    return undefined;
  }

  public onDisable(): void {
    return undefined;
  }

  public onFailed(failure: PluginFailureContext): void {
    new Notice(`${SAMPLE_PLUGIN_TITLE} failed during ${failure.operation}.`, 2500);
  }

  public openSimpleModal(): void {
    new SampleSimpleModal(this.app, this.settings.ribbonNoticeMessage).open();
  }

  public async updateRibbonNoticeMessage(message: string): Promise<void> {
    this.settings = {
      ...this.settings,
      ribbonNoticeMessage: normalizeRibbonNoticeMessage(message),
    };
    await this.saveData(this.settings);
  }
}
