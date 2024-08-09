import "./commands";
import '@mmisty/cypress-allure-adapter/support'
const registerCypressGrep = require('@cypress/grep');
registerCypressGrep();

// Cypess.on("uncaught:exception", (err, runnable) => {
//     return false;
// });