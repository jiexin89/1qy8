import activeWindow from 'active-win';
import { logger } from './utils/logger.js';

export class WindowManager {
  constructor() {
    this.windows = new Map();
  }

  async initialize() {
    try {
      await this.refreshWindowList();
      this.startWindowMonitoring();
      logger.info('Window manager initialized for Windows 11');
    } catch (error) {
      logger.error('Failed to initialize window manager:', error);
      throw error;
    }
  }

  startWindowMonitoring() {
    setInterval(async () => {
      await this.refreshWindowList();
    }, 1000);
  }

  async refreshWindowList() {
    try {
      const window = await activeWindow();
      if (window) {
        this.windows.set(window.id, {
          ...window,
          platform: 'win32',
          osVersion: 'Windows 11'
        });
      }
    } catch (error) {
      logger.error('Error refreshing window list:', error);
    }
  }

  async getActiveWindow() {
    return await activeWindow();
  }

  async getWindowByTitle(title) {
    await this.refreshWindowList();
    return Array.from(this.windows.values())
      .find(window => window.title.includes(title));
  }

  async getAllWindows() {
    await this.refreshWindowList();
    return Array.from(this.windows.values());
  }
}