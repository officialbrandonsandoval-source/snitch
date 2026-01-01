// Example end-to-end test for Expo mobile app using Detox
const { device, expect, element, by } = require('detox');

describe('Snitch Mobile E2E', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should show HomeScreen', async () => {
    await expect(element(by.id('HomeScreen'))).toBeVisible();
  });
});
