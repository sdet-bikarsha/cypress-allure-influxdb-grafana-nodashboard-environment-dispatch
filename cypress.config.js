const path = require('path');
const { defineConfig } = require("cypress");
const { configureAllureAdapterPlugins } = require('@mmisty/cypress-allure-adapter/plugins');

module.exports = defineConfig({
    experimentalWebKitSupport: true,
    retries: {
        runMode: 3,
        openMode: 0
    },
    env: {
        allure: true,
        allureSkipCommands: 'wrap',
        allureResults: 'allure-results',
        URL: 'https://naveenautomationlabs.com/opencart/index.php?route=account/register'
    },

    e2e: {
        baseUrl: 'https://naveenautomationlabs.com/opencart/index.php?route=account/login',
        specPattern: 'cypress/e2e/**/*.spec.js',
        video:true,
        setupNodeEvents(on, config) {
            const reporter = configureAllureAdapterPlugins(on, config);

            on('after:spec', async (spec, results) => {
                await reporter.afterSpec({ results });     
            })
                
            on('before:run', details => {            
                reporter?.writeEnvironmentInfo({            
                    info: {            
                        os: details.system.osName,
                        osVersion: details.system.osVersion,
                        browser: details.browser?.displayName + + details.browser?.version, 
                        ...config.env            
                    },            
                });                
                reporter?.writeCategoriesDefinitions({ categories: './allure-error-categories.json' })
            });

            const environment = process.env.ENVIRONMENT;
            const cypressDir = path.resolve(process.cwd(), 'cypress');
            let finalConfig = config

            try {
                const envConfig = require(`${cypressDir}/config/${environment}.json`); 
                finalconfig = merge(config, envConfig);
                console.log(`Loading environment specific config for $(environment) and merging on top of root cypress.json config.`);
            } catch (error) {
                console.log( 'No environment specific config defined, using root cypress.json config.' );
            }
            return finalConfig;
        },
    },
})