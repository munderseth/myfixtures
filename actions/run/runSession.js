const { openBrowser, goto, write, press, click, dropDown, near, toRightOf, $, closeBrowser, waitFor, focus, hover, link } = require('taiko');
const core = require('@actions/core');

async function run() {
    try {

        console.log("Setup Testspace Run Session script starting ...")
        const tsOrg      = core.getInput('ts-org');
        const tsUser     = core.getInput('ts-username');
        const tsPassword = core.getInput('ts-password');
        const ghRepo     = core.getInput('gh-repo')
        const tsProject  = core.getInput('ts-project')

        var signin = tsOrg.concat(".stridespace.com")
        console.log(signin)
      
        await openBrowser({headless: true, args: ['--no-sandbox']});
        await goto(signin)
        await write(tsUser);
        await press("Tab");
        await write(tsPassword);
        await click("SUBMIT");
        console.log("Have logged in now ..")

        await click("New Project");
        await waitFor(2000)
        await click(ghRepo);
        await click("OK");
        
        await waitFor(2000)
        await click(tsProject);
        console.log("Created Project, waiting a few seconds for Space to show up ..");
        await waitFor(2000)
        await click("Spaces")
        await waitFor(2000)
        await click("Spaces")
        await waitFor(3000)
        await click("Spaces")
        await click("Spaces")
        
        await click("master");
        await click("Run");
        await click("Lists");
        console.log("Ready to create a Run Session ..")
        await click("New Test Session");
        await focus($('#test_session_name'))

        await write("session.001")
        await click("SUBMIT");

        await waitFor(2000)
        await focus(link('Basic One Suite with NO Steps'))
        await click(link('Basic One Suite with NO Steps'))
      
        await hover('click here')
        await click('click here')
      
        await dropDown(near('STATUS')).select('PASSED');
        await press("Escape");
        await waitFor(2000)
        await click("session.001")
        await click($("a.blue"), toRightOf("session.001"));
        await press("Enter");
 
        
    } catch (error) {
        console.error(error);
    } finally {
        await closeBrowser();
    }
}

run()
