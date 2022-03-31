const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 抽离css的插件
function resolve(dir) {
    return path.join(__dirname, ".", dir);
}
module.exports = {
    mode: "production",
    entry: {
        index: "./src/index.js"
    },
    output: {
        path: resolve("dist"), //打包后的出口
        filename: "[name].js",
        library: 'shaonq', // 指定库的名称，及库的全局变量
        libraryTarget: 'umd', // 支持库引入的方式
        libraryExport: 'default',
    },
    resolve: {
        extensions: [".js"],
        alias: {
            "@": resolve("src"),
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: [resolve("src")],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                targets: {
                                    "ie": "10",
                                },
                                useBuiltIns: 'usage',
                                corejs: 3
                            }]
                        ]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: "css-loader" },
                    {
                        loader: "sass-loader",
                        options: { sourceMap: true },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    ["autoprefixer"],
                                ],
                            },
                        },
                    }
                ],
            }
        ],
    },
};
