const core = require('@actions/core');
const github = require('@actions/github');

// most @actions toolkit packages have async methods
async function run() {
  try { 
    const myName = core.getInput('nameit');
    console.log("help me ..");
    console.log(myName);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()

