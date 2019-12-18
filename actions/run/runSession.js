const { openBrowser, goto, write, press, click, dropDown, near, toRightOf, $, closeBrowser, str } = require('taiko');
const core = require('@actions/core');

async function run() {
    try {

        console.log("Setup Testspace Run Session script starting ...")
        const tsOrg      = core.getInput('ts-org');
        const tsUser     = core.getInput('ts-username');
        const tsPassword = core.getInput('ts-password');
        const ghRepo     = core.getInput('gh-repo')
        const tsProject  = core.getInput('ts-project')

       // const signin = str.concat(tsOrg,".","stridespace.com")
        signin = "testorg1.stridespace.com"
        console.log(signin)
      
        await openBrowser({ headless: true, ignoreCertificateErrors: true, args:['--window-size=1024,900']})
        //await goto("signin.stridespace.com");
        await goto(signin)
        await write(tsUser);
        await press("Tab");
        await write(tsPassword);
        await click("SUBMIT");
        console.log("Have logged in now ..")

        await click("New Project");
        waitFor(2000)
        await click(ghRepo);
        await click("OK");
        console.log("Created Project, waiting for Space to show up ..");
        waitFor(8000);
        await click(tsProject);

        await click("master");
        await click("Run");
        await click("Lists");
        await click("New Test Session");
        await press("Tab");
        await write("session.001");
        await click("SUBMIT");
        await click("Basic One Suite with NO Steps");
        await click("click here");
        await dropDown(near('STATUS')).select('PASSED');
        await press("Escape");
        await click($("a.blue"), toRightOf("session.001"));
        await press("Enter");
        
    } catch (error) {
        console.error(error);
    } finally {
        await closeBrowser();
    }
}

run()
