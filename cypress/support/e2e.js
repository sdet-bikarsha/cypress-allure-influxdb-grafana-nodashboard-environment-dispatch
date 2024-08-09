import "./commands";
import '@mmisty/cypress-allure-adapter/support'
const registerCypressGrep = require('@cypress/grep');
registerCypressGrep();

registerCypressGrep.on("uncaught:exception", (err,runnable) => {
    return false;
})