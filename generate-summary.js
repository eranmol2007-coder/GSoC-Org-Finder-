const { ensureDir, readJsonFile, writeJsonFile, buildSummary } = require('./agent/scripts/utils');

const DATA_DIR = './data';
const ISSUES_FILE = `${DATA_DIR}/issues.json`;
const UI_SUMMARY_FILE = `${DATA_DIR}/ui-summary.json`;

ensureDir(DATA_DIR);

let issuesData;
try {
  issuesData = readJsonFile(ISSUES_FILE);
} catch (error) {
  console.error(`Fatal Error: Failed to read or parse issues data from '${ISSUES_FILE}'.`);
  console.error(`Details: ${error.message}`);
  process.exit(1);
}

const summary = buildSummary(issuesData.issues || []);

try {
  writeJsonFile(UI_SUMMARY_FILE, summary);
  console.log('Generated UI cache successfully.');
  console.log(summary);
} catch (error) {
  console.error(`Fatal Error: Failed to write UI cache to '${UI_SUMMARY_FILE}'.`);
  console.error(`Details: ${error.message}`);
  process.exit(1);
}