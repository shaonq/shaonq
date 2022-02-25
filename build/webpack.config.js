let path = require('path');
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    mode: 'production',  //生产模式，压缩(production|development)
    entry: './src/utils/index.js',
    output: {
        path: resolve('dist'), //打包后的出口
        filename: 'shaonq-esm.js',
        // filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': resolve('src')
        }
    },
    //loader链
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')]
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    { loader: 'css-loader' },
                    {
                        loader: "sass-loader", // 将 Sass 编译成 CSS
                        options: { sourceMap: true }
                    }
                ]
            }
        ]
    }
}