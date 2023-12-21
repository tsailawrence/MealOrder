import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  // fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 1,
  workers: process.env.CI ? 2 : 4,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    headless: false,
  },

  projects: [
    // { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
      // dependencies: ['setup'],
    },
  ],
});
