const { openBrowser, goto, click, write, press, closeBrowser } = require('taiko');
const core = require('@actions/core');

async function run () {

    try {

        console.log("Teardown Testspace Org script starting ...")
        const tsOrg      = core.getInput('ts-org');
        const tsUser     = core.getInput('ts-username');
        const tsPassword = core.getInput('ts-password');
        
       // await openBrowser();
        await openBrowser({ headless: true, ignoreCertificateErrors: true, args:['--window-size=1024,900']})
        // To-do: use goto("ts-org"+"stridespace.com") 
        await goto("signin.stridespace.com");
        await write(tsUser);
        await press("Tab");
        await write(tsPassword);
        await click("SUBMIT");
        console.log("Have logged in now ..")

        await click("Account");
        await click("Cancel");
        await click("CONFIRM");

    } catch (error) {
        console.error(error);
        process.exit(42)
    } finally {
        await closeBrowser();
    }
}

run()
