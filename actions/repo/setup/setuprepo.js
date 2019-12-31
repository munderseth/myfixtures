const core = require('@actions/core');
const github = require('@actions/github');

// most @actions toolkit packages have async methods
async function run() {
  try { 

    console.log("Setup script running ..")

    const myToken = core.getInput('accesstoken');
    const octokit = new github.GitHub(myToken);
    const temporgName  = core.getInput('temp-org-name');
    const temprepoName = core.getInput('temp-repo-name');
    const orgName      = core.getInput('org-name');
    const repoName     = core.getInput('repo-name');
  
    console.log(temporgName)
    console.log(temprepoName)
    console.log(orgName)
    console.log(repoName)
       
    //////////////////////////////////////////
    // Create testRepo
    /////////////////////////////////////////
    const { data: createRepo } = await octokit.repos.createUsingTemplate({
      template_owner: temporgName,
      template_repo:  temprepoName,
      owner: orgName,
      name: repoName,
      description: 'Auto-generated Repo'
    });
    console.log(createRepo)

    /////////////////////////////////////////
    // Create Cycle Issues
    /////////////////////////////////////////

    const { data: allIssue } = await octokit.issues.create({
      owner: orgName,
      repo: repoName,
      title: 'ALL',
      body: 'Used for testing All Specs \n<pre>testspace:\n</pre>'
    });
    console.log(allIssue)

    const { data: conceptIssue } = await octokit.issues.create({
      owner: orgName,
      repo: repoName,
      title: 'Concepts',
      body: 'Used for testing Concepts Specs \n<pre>testspace:\n  branch: master \n  specs: \n    path: concepts\n </pre>'
    });
    console.log(conceptIssue)

    const { data: listsIssue } = await octokit.issues.create({
      owner: orgName,
      repo: repoName,
      title: 'Lists',
      body: 'Used for testing Lists Specs \n<pre>testspace:\n  branch: master \n  specs: \n    path: lists\n </pre>'
    });
    console.log(listsIssue)

    const { data: gaugeIssue } = await octokit.issues.create({
      owner: orgName,
      repo: repoName,
      title: 'Gauge',
      body: 'Used for testing Gauage Specs \n<pre>testspace:\n  branch: master \n  specs: \n    path: gauge\n </pre>'
    });
    console.log(gaugeIssue)

    const { data: imagesIssue } = await octokit.issues.create({
      owner: orgName,
      repo: repoName,
      title: 'Images',
      body: 'Used for testing Images Specs \n<pre>testspace:\n  branch: master \n  specs: \n    path: images\n </pre>'
    });
    console.log(imagesIssue)

    const { data: simpleIssue } = await octokit.issues.create({
      owner: orgName,
      repo: repoName,
      title: 'Simple',
      body: 'Used for testing Simple Specs \n<pre>testspace:\n  branch: master \n  specs: \n    path: simple\n </pre>'
    });
    console.log(simpleIssue)
    console.log("Creating NEW ISSUE")
    const { data: testSpecChange } = await octokit.issues.create({
      owner: orgName,
      repo: repoName,
      title: 'Test Spec Change',
      body: 'Used for Spec Change testing \n<pre>testspace:\n  branch: master \n  specs: \n    path: test.spec.change\n </pre>'
    });
    console.log(testSpecChange)
 
    const { data: simpleBranchIssue } = await octokit.issues.create({
      owner: orgName,
      repo: repoName,
      title: 'SimpleBranch',
      body: 'Used for testing Simple Specs \n<pre>testspace:\n  branch: branch1 \n  specs: \n    path: simple\n </pre>'
    });
    console.log(simpleBranchIssue)

    const { data: simpleClosedIssue } = await octokit.issues.create({
      owner: orgName,
      repo: repoName,
      title: 'SimpleClosedIssue',
      body: 'Used for testing Simple Specs \n<pre>testspace:\n  branch: master \n  specs: \n    path: simple\n </pre>'
    });
    console.log(simpleClosedIssue)
    
    const { data: simpleClosedIssueUpdate } = await octokit.issues.update({
      owner: orgName,
      repo: repoName,
      issue_number: simpleClosedIssue.number,
      state: 'closed'
    });
    console.log(simpleClosedIssueUpdate)


    ////////////////////////////////////////////////
    // Create Test Board
    ////////////////////////////////////////////////
    const { data: createBoard } = await octokit.projects.createForRepo({
      owner: orgName,
      repo: repoName,
      name: 'Testspace',
      body: 'Test Repo Board'
    });
    console.log(createBoard)
    
    const { data: createCol1 } = await octokit.projects.createColumn({
      project_id: createBoard.id,
      name: 'To do'
    })
    console.log(createCol1)

    const { data: createCol2 } = await octokit.projects.createColumn({
      project_id: createBoard.id,
      name: 'In progress'
    })
    console.log(createCol2)

    const { data: createCol3 } = await octokit.projects.createColumn({
      project_id: createBoard.id,
      name: 'Done'
    })
    console.log(createCol3)

  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()