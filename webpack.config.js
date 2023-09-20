const path = require('path');

module.exports = {
    entry: './src/index.ts', // Replace with the entry point of your TypeScript file
    output: {
        library: {
            name: 'browserjs',
            type: 'var',
            export: 'default'
        }
    },
    // optimization: {
    //     minimizer: []
    // },
    module: {
        rules: [
            {
                test: /\.ts$/, // Process TypeScript files
                use: 'ts-loader', // Use ts-loader to transpile TypeScript to JavaScript
                exclude: /node_modules/, // Exclude node_modules directory
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'], // Resolve .ts and .js extensions
    },
};
