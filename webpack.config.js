module.exports = {
    entry: './src/index.ts',
    output: {
        library: {
            name: 'browserjs',
            type: 'var',
            export: 'default'
        }
    },
    optimization: {
        minimizer: []
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
};
