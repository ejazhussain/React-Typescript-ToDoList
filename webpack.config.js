const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/index.tsx',
    output: {
        //__dirname is taking us to root and and we are calling folder name as build
        path: path.resolve(__dirname, "dist"),
        filename: "./bundle.js"
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "eval-source-map",
    //devtool: "source-map",
    resolve: {
        // Add '.ts' as resolvable extensions.
        extensions: [".js", ".ts", ".tsx"]
    },
    module: {
        rules: [
            {
                //enable debugging in the browser
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
            },
            {
                //find every file which ends with .tsx
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                //find every sass file
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: true
                            }
                        },
                        "sass-loader"
                    ]
                })

            }
        ]

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html"
        }),
        new ExtractTextPlugin("style.css")
    ]
}