const fs = require('fs');
const chromeLauncher = require('chrome-launcher');
const lighthouse = require('lighthouse/lighthouse-core');
const ReportGenerator = require('lighthouse/lighthouse-core/report/report-generator');

function writeFile(filename, data) {
  fs.writeFile(filename, data, (err) => {
    if (err) {
      console.error(err);
      return;
    };
    console.log(`Successfully Written to File: ${filename}`);
  });
}

function generateReports(results) {
  const jsonReport = ReportGenerator.generateReport(results.lhr, 'json');
  const csvReport = ReportGenerator.generateReport(results.lhr, 'csv');
  const htmlReport = ReportGenerator.generateReport(results.lhr, 'html');

  writeFile(`report-${new Date().getTime()}.json`, jsonReport);
  writeFile(`report-${new Date().getTime()}.csv`, csvReport);
  writeFile(`report-${new Date().getTime()}.html`, htmlReport);
}

async function run(url, options) {
  const chrome = await chromeLauncher.launch({ chromeFlags: options.chromeFlags });
  options.port = chrome.port;

  try {
    const results = await lighthouse(url, options);
    generateReports(results);
    return results.lhr;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  } finally {
    await chrome.kill();
  }
}

module.exports = { run };
