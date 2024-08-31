document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed.');

    const runButton = document.getElementById('run-button');
    const codeTextarea = document.getElementById('code-input');

    runButton.addEventListener('click', () => {
        console.log('Run button clicked.');
        const code = codeTextarea.value;
        console.log('User code:', code);
        runCodeInWorker(code);
    });

    function runCodeInWorker(code) {
        console.log('Creating Web Worker.');

        const workerBlob = new Blob([`
            self.onmessage = function(e) {
                console.log('Worker received message:', e.data);
                const { code } = e.data;

                // Measure execution time
                console.log('Starting code execution in worker.');
                const startExecution = performance.now();
                let result;
                try {
                    result = eval(code);
                    console.log('Code executed successfully. Result:', result);
                } catch (error) {
                    self.postMessage({ error: 'Error during code execution: ' + error.message });
                    return;
                }
                const endExecution = performance.now();
                const executionTime = endExecution - startExecution;
                console.log('Execution time measured:', executionTime);

                // Measure memory usage
                console.log('Measuring memory usage in worker.');
                const memoryUsage = calculateMemoryUsage();
                console.log('Memory usage measured:', memoryUsage);

                self.postMessage({ executionTime, memoryUsage });
            };

            function calculateMemoryUsage() {
                // Memory measurement placeholder
                return performance.memory ? performance.memory.usedJSHeapSize / (1024 * 1024) : 0; // MB
            }
        `], { type: 'application/javascript' });

        const worker = new Worker(URL.createObjectURL(workerBlob));

        worker.onmessage = function(e) {
            console.log('Worker posted message:', e.data);
            const { executionTime, memoryUsage, error } = e.data;
            if (error) {
                console.error(error);
                return;
            }

            console.log('Updating UI with results.');
            document.getElementById('execution-time-value').textContent = `${executionTime.toFixed(2)} ms`;
            document.getElementById('memory-usage-value').textContent = `${memoryUsage.toFixed(2)} MB`;

            const cpuLoadPercentage = calculateCPULoad(); // Implement or estimate accurately
            const carbonEmissions = calculateCarbonEmissions(executionTime, cpuLoadPercentage, memoryUsage);
            console.log('Calculated CPU load:', cpuLoadPercentage);
            console.log('Calculated carbon emissions:', carbonEmissions);

            document.getElementById('cpu-load-value').textContent = `${cpuLoadPercentage.toFixed(2)}%`;
            document.getElementById('carbon-emissions-value').textContent = `${carbonEmissions.toFixed(2)} gCO2e`;
        };

        worker.onerror = function(error) {
            console.error('Worker error:', error);
        };

        console.log('Sending code to worker.');
        worker.postMessage({ code });
    }

    function calculateCarbonEmissions(executionTime, cpuLoad, memoryUsage) {
        console.log('Calculating carbon emissions.');
        const baseEmissions = executionTime * (cpuLoad / 100) * (memoryUsage / 100);
        const carbonEmissions = Math.round(baseEmissions * 0.05); // Example formula, adjust based on real calculations
        console.log('Carbon emissions calculated:', carbonEmissions);
        return carbonEmissions;
    }

    function calculateCPULoad() {
        console.log('Calculating CPU load.');
        // Placeholder function: Implement a more accurate way if possible
        return 50; // Dummy value for CPU load percentage
    }
});
