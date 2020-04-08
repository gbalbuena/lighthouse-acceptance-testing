const lighthouse = require('../src/lighthouse');

jest.setTimeout(60000);

const targeturl = process.env['TARGET_URL'];

describe('lighthouse', () => {
  let report;
  beforeAll(async () => {
    report = await lighthouse.run(targeturl, { chromeFlags: ['--headless'] });
  });

  test('performance', async () => {
    expect(report.categories.performance.score).toBeGreaterThanOrEqual(0.50);
  });

  test('accessibility', async () => {
    expect(report.categories.accessibility.score).toBeGreaterThanOrEqual(0.50);
  });

  test('best-practices', async () => {
    expect(report.categories['best-practices'].score).toBeGreaterThanOrEqual(0.50);
  });

  test('seo', async () => {
    expect(report.categories.seo.score).toBeGreaterThanOrEqual(0.50);
  });

  test('pwa', async () => {
    expect(report.categories.pwa.score).toBeGreaterThanOrEqual(0.50);
  });
});
