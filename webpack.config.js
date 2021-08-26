const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = (_, argv) => {
    const { mode = "development" } = argv;

    const isDevelopment = mode === "development";

    const getStyleLoaders = () => {
        return [isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader',];
    }

    console.log(__dirname);

    const settings = {
        mode,
        resolve: {
            extensions: ['.js', '.jsx', '.ts'],
            alias: {
                Utils: path.resolve(__dirname, 'src/utils/'),
                Components: path.resolve(__dirname, 'src/components/'),
                Actions: path.resolve(__dirname, 'src/actions/'),
                ActionTypes: path.resolve(__dirname, 'src/action-types/'),
                Containers: path.resolve(__dirname, 'src/containers/'),
                Reducers: path.resolve(__dirname, 'src/reducers/'),
                Services: path.resolve(__dirname, 'src/services/'),
            },
        },
        module: {
            rules: [
                //
                //  Babel
                //
                {
                    test: /\.js/,
                    exclude: '/node_modules/',
                    loader: 'babel-loader',
                },
                //
                //  Loading images
                //
                {
                    test: /\.(png|jpg|webp|gif|ico|jpeg|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'images',
                                name: '[name]-[sha1:hash:7].[ext]',
                            },
                        },
                    ],
                },
                //
                //  Loading fonts
                //
                {
                    test: /\.(ttf|otf|eot|woff|woff2)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'fonts',
                                name: '[name].[ext]',
                            },
                        },
                    ],
                },
                //
                //  Loading CSS 
                //
                {
                    test: /\.css$/,
                    exclude: '/node_modules/',
                    use: getStyleLoaders(),
                },
                //
                //  Loading SASS/SCSS 
                //
                {
                    test: /\.(s[cs]ss)$/,
                    exclude: '/node_modules/',
                    use: [...getStyleLoaders(), 'sass-loader',],
                },
            ],
        },

        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: 'Hello  World',
                buildTime: new Date().toString(),
                template: 'public/index.html'
            }),
            new MiniCssExtractPlugin({
                filename: 'main-[hash:8].css',
            }),
            new MinifyPlugin(),
        ],

        devServer: {
            open: true,
            port: 8080,
            watchFiles: ['src/**/*', 'public/**/*'],
        },
    };

    if (isDevelopment) {
        settings.devtool = 'source-map';
        settings.performance = {
            hints: false
        };
    }

    return settings;
};