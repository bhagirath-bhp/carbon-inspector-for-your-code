const runButton = document.getElementById('run-button');
const codeTextarea = document.getElementById('code-input');
runButton.addEventListener('click', () => {
    const code = codeTextarea.value;

    console.log(code);
    // Simulate script execution
    testUserCode(code);
});

function calculateCarbonEmissions(executionTime, cpuLoad, memoryUsage) {
    // Example calculation based on simple metrics
    const baseEmissions = executionTime * (cpuLoad / 100) * (memoryUsage / 100);
    return Math.round(baseEmissions * 0.05); // Example formula, adjust based on real calculations
}

function testUserCode(code) {
    // Measure Execution Time
    const startExecution = performance.now();
    try {
        eval(`${code}`); // Execute the provided code
    } catch (error) {
        console.error('Error during code execution:', error);
    }
    const endExecution = performance.now();
    const executionTime = endExecution - startExecution;

    // Simulate CPU Load
    const startCPU = performance.now();
    try {
        eval(`${code}`);
    } catch (error) {
        console.error('Error during CPU load simulation:', error);
    }
    const endCPU = performance.now();
    const cpuLoadTime = endCPU - startCPU;
    const cpuLoadPercentage = (cpuLoadTime / executionTime) * 100;

    // Simulate Memory Usage
    const initialMemory = performance.memory.usedJSHeapSize / (1024 * 1024); // Convert to MB
    try {
        eval(`${code}`); // Execute the provided code again for memory simulation
    } catch (error) {
        console.error('Error during memory simulation:', error);
    }
    const finalMemory = performance.memory.usedJSHeapSize / (1024 * 1024); // Convert to MB
    const memoryUsage = finalMemory - initialMemory;

    // Output Results
    console.log(`Execution Time: ${executionTime.toFixed(2)} milliseconds`);
    console.log(`CPU Load: ${cpuLoadPercentage.toFixed(2)}%`);
    console.log(`Memory Usage: ${memoryUsage.toFixed(2)} MB`);

    // Calculate carbon emissions (example calculation)
    const carbonEmissions = calculateCarbonEmissions(executionTime, cpuLoadPercentage, memoryUsage);

    // Update UI with results
    document.getElementById('execution-time-value').textContent = `${executionTime} ms`;
    document.getElementById('cpu-load-value').textContent = `${cpuLoadPercentage}%`;
    document.getElementById('memory-usage-value').textContent = `${memoryUsage} MB`;
    document.getElementById('carbon-emissions-value').textContent = `${carbonEmissions} gCO2e`;
}

// Example usage with user-provided code
// const userCode = `
//     // Example code for demonstration
//     function fibonacci(n) {
//         if (n <= 1) return n;
//         return fibonacci(n - 1) + fibonacci(n - 2);
//     }
//     console.log(fibonacci(35)); // Example heavy computation
// `;

// testUserCode(userCode);
