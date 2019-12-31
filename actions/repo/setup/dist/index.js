module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(891);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 87:
/***/ (function(module) {

module.exports = require("os");

/***/ }),

/***/ 482:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const os = __webpack_require__(87);
/**
 * Commands
 *
 * Command Format:
 *   ##[name key=value;key=value]message
 *
 * Examples:
 *   ##[warning]This is the user warning message
 *   ##[set-secret name=mypassword]definitelyNotAPassword!
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        // safely append the val - avoid blowing up when attempting to
                        // call .replace() if message is not a string for some reason
                        cmdStr += `${key}=${escape(`${val || ''}`)},`;
                    }
                }
            }
        }
        cmdStr += CMD_STRING;
        // safely append the message - avoid blowing up when attempting to
        // call .replace() if message is not a string for some reason
        const message = `${this.message || ''}`;
        cmdStr += escapeData(message);
        return cmdStr;
    }
}
function escapeData(s) {
    return s.replace(/\r/g, '%0D').replace(/\n/g, '%0A');
}
function escape(s) {
    return s
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/]/g, '%5D')
        .replace(/;/g, '%3B');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 622:
/***/ (function(module) {

module.exports = require("path");

/***/ }),

/***/ 725:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __webpack_require__(482);
const os = __webpack_require__(87);
const path = __webpack_require__(622);
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable
 */
function exportVariable(name, val) {
    process.env[name] = val;
    command_1.issueCommand('set-env', { name }, val);
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    command_1.issueCommand('add-path', {}, inputPath);
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.  The value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store
 */
function setOutput(name, value) {
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message
 */
function error(message) {
    command_1.issue('error', message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message
 */
function warning(message) {
    command_1.issue('warning', message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store
 */
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 810:
/***/ (function() {

eval("require")("@actions/github");


/***/ }),

/***/ 891:
/***/ (function(__unusedmodule, __unusedexports, __webpack_require__) {

const core = __webpack_require__(725);
const github = __webpack_require__(810);

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

/***/ })

/******/ });