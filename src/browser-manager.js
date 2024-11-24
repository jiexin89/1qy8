import puppeteer from 'puppeteer-core';
import { logger } from './utils/logger.js';

export class BrowserManager {
  constructor() {
    this.browser = null;
    this.pages = new Map();
  }

  async initialize() {
    try {
      this.browser = await puppeteer.launch({
        headless: false,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        defaultViewport: null,
        args: [
          '--start-maximized',
          '--disable-notifications',
          '--no-sandbox'
        ]
      });
      logger.info('Browser manager initialized for Windows 11');
    } catch (error) {
      logger.error('Failed to initialize browser manager:', error);
      throw error;
    }
  }

  async newPage() {
    const page = await this.browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    this.pages.set(page.target()._targetId, page);
    return page;
  }

  async closePage(page) {
    await page.close();
    this.pages.delete(page.target()._targetId);
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      this.pages.clear();
    }
  }
}