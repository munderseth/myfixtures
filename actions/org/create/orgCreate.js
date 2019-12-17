const { openBrowser, goto, click, write, press, closeBrowser , waitFor} = require('taiko');
const core = require('@actions/core');

async function run() {
    try {

        console.log("Setup Testspace Org script starting ...")
        const tsOrg      = core.getInput('ts-org');
        const tsUser     = core.getInput('ts-username');
        const tsPassword = core.getInput('ts-password');
        
       // await openBrowser();
        await openBrowser({ headless: true, ignoreCertificateErrors: true, args:['--window-size=1024,900']})
        await goto("signin.stridespace.com");
        await write(tsUser);
        await press("Tab");
        await write(tsPassword);
        await click("SUBMIT");
        console.log("Have logged in now ..")
       // await goto("signup.stridespace.com/?plan_id=basic-2");
        await goto("signup.stridespace.com/?plan_id=open_v1");
        await click("Sign up with Email");
        await write(tsOrg);
        await click("SUBMIT");
       // console.log("Waiting for new Complete")
       // waitFor(5000)
       // await click("Complete")
       // await write("4242 4242 4242 4242");
       // await press("Tab");
       // await write("123");
       // await click("COMPLETE ACCOUNT");
              
    } catch (error) {
        console.error(error);
    } finally {
        await closeBrowser();
    }
}

run()
