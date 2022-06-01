import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    specPattern: 'projects/ngx-scroll-to-demo/e2e/src/integration/**/*.spec.ts',
    supportFile: 'projects/ngx-scroll-to-demo/e2e/src/support/index.ts',
    videosFolder: 'dist/cypress/ngx-scroll-to-demo/videos',
    screenshotsFolder: 'dist/cypress/ngx-scroll-to-demo/screenshots',
    fixturesFolder: 'projects/ngx-scroll-to-demo/e2e/src/fixtures'
  }
})
