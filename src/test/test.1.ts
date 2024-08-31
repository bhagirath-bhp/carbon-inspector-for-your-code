// import * as path from 'path';
// import * as vscode from 'vscode';
// import * as mocha from 'mocha';
// import * as chai from 'chai';

// const testDir = path.resolve(__dirname, '../../test');

// mocha.describe('Extension Test Suite', function () {
//     this.timeout(60000);

//     before(async function () {
//         // Initialize VS Code extension testing
//         await vscode.extensions.getExtension('your-publisher-id.performance-metrics')!.activate();
//     });

//     afterEach(async function () {
//         await vscode.commands.executeCommand('workbench.action.closeAllEditors');
//     });

//     it('should measure execution time correctly', async function () {
//         const result = await vscode.commands.executeCommand('extension.measureAll');
//         chai.expect(result).to.be.a('string');
//     });
// });
