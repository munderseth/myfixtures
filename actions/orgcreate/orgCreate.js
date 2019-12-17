const { openBrowser, goto, click, write, press, closeBrowser } = require('taiko');
const core = require('@actions/core');

async function run() {
    try {

        const tsOrg      = core.getInput('ts-org');
        const tsUser     = core.getInput('ts-username');
        const tsPassword = core.getInput('ts-password');

       // await openBrowser();
        await openBrowser({ headless: true, ignoreCertificateErrors: true, args:['--window-size=1024,900']})
        await goto("signin.stridespace.com");
        await write(tsUser);
        await write("testuser");
        await press("Tab");
        await write(tsPassword);
        await click("SUBMIT");

        await goto("signup.stridespace.com/?plan_id=basic-2");
        await click("Sign up with Email");
        await write(tsOrg);
        await click("SUBMIT");
        await write("4242 4242 4242 4242");
        await press("Tab");
        await write("123");
        await click("COMPLETE ACCOUNT");
       
        await click("Account");
        await click("Cancel");
        await click("CONFIRM");
    } catch (error) {
        console.error(error);
    } finally {
        await closeBrowser();
    }
}

run()
