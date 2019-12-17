const { openBrowser, goto, click, write, press, closeBrowser } = require('taiko');
const core = require('@actions/core');

async function run () {

    try {

        const ghUser     = core.gitInput('gh-username');
        const ghPassword = core.gitInput('gh-password');

        await openBrowser();
        await goto("signin.stridespace.com");
        await click("Login with GitHub");
        await write(ghUser);
        await press("Tab");
        await write(ghPassword);
        await click("Sign in");
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
