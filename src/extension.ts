import * as vscode from 'vscode';
import { performance } from 'perf_hooks';
import * as os from 'os';

// Function to measure execution time
function measureExecutionTime(task: () => void): number {
    const start = performance.now();
    task();
    const end = performance.now();
    return end - start;
}

// Function to get CPU load
function getCpuLoad(): number {
    const cpus = os.cpus();
    const total = cpus.reduce((acc, cpu) => acc + cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.idle, 0);
    const idle = cpus.reduce((acc, cpu) => acc + cpu.times.idle, 0);
    return ((total - idle) / total) * 100;
}

// Function to get memory usage
function getMemoryUsage(): number {
    return process.memoryUsage().heapUsed / (1024 * 1024); // MB
}

// Function to estimate carbon emissions
function estimateCarbonEmissions(executionTime: number, cpuLoad: number, memoryUsage: number): number {
    const baseEmissions = executionTime * (cpuLoad / 100) * (memoryUsage / 100);
    return Math.round(baseEmissions * 0.05); // Example formula
}

// Activate function
export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.measureAll', () => {
        vscode.window.showInformationMessage('Measuring performance metrics...');

        const executionTime = measureExecutionTime(() => {
            // Sample task: Compute factorial of 20
            function factorial(n: number): number {
                if (n <= 1) return 1;
                return n * factorial(n - 1);
            }
            factorial(20);
        });

        const cpuLoad = getCpuLoad();
        const memoryUsage = getMemoryUsage();
        const carbonEmissions = estimateCarbonEmissions(executionTime, cpuLoad, memoryUsage);

        vscode.window.showInformationMessage(`Execution Time: ${executionTime.toFixed(2)} ms`);
        vscode.window.showInformationMessage(`CPU Load: ${cpuLoad.toFixed(2)}%`);
        vscode.window.showInformationMessage(`Memory Usage: ${memoryUsage.toFixed(2)} MB`);
        vscode.window.showInformationMessage(`Estimated Carbon Emissions: ${carbonEmissions} gCO2e`);
    });

    context.subscriptions.push(disposable);
}

// Deactivate function (if needed)
export function deactivate() {}
