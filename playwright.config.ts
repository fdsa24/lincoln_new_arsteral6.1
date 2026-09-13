import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './e2e', timeout: 60000, workers: 1,
  reporter: [['list'],['html',{open:'never'}]],
  use: { baseURL: 'http://127.0.0.1:3000', browserName: 'chromium', trace: 'retain-on-failure' },
  webServer: { command: 'npm run start -- --hostname 127.0.0.1', url: 'http://127.0.0.1:3000', reuseExistingServer: false, timeout: 120000,
    env: { APP_MODE: 'demo', APP_ORIGIN: 'http://127.0.0.1:3000' } },
});
