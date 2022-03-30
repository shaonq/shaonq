const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 抽离css的插件
function resolve(dir) {
    return path.join(__dirname, ".", dir);
}
module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        path: resolve("dist"), //打包后的出口
        filename: "[name].js",
    },
    resolve: {
        extensions: [".js", ".json", ".scss"],
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
                loader: "babel-loader",
                include: [resolve("src")],
            },
            {
                test: /\.scss$/,// /\.(sa|sc|c)ss$/
                use: [
                    { loader: MiniCssExtractPlugin.loader }, // style-loader
                    { loader: "css-loader" },
                    {
                        loader: "sass-loader",
                        options: { sourceMap: true },
                    }, {
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
