const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const deps = require("./package.json").dependencies;

const path = require("path");

module.exports = {
  entry: "./src/index",
  mode: "development",
  target: "web",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3002,
  },
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            css: [
              "vue-style-loader",
              {
                loader: "css-loader",
                options: {
                  importLoaders: 1,
                },
              },
            ],
          },
        },
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /[node_modules]/,
      },
      {
        test: /\.css$/,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          // },
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                indentedSyntax: false,
              },
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          // },
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                indentedSyntax: false,
              },
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app2",
      filename: "remoteEntry.js",
      exposes: {
        "./Widget": "./src/Widget.vue",
        "./Slider": "./src/Slider.vue",
      },
      shared: {
        // vue: { singleton: true },
        vue: {
          requiredVersion: deps.vue,
          import: "vue", // the "vue" package will be used a provided and fallback module
          shareKey: "vue", // under this name the shared module will be placed in the share scope
          shareScope: "default", // share scope with this name will be used
          singleton: true, // only a single version of the shared module is allowed
          eager: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new VueLoaderPlugin(),
  ],
};
