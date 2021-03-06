const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  // 打开调试
  devtool: "eval-source-map",
  entry: {
    bundle: ["./front-server/home.jsx", "./component/icon-font/iconfont.css"],
    vender: ["react", "react-dom"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      component: path.resolve(__dirname, "./component")
    }
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: "babel-loader",
      exclude: /node_modules/
    }, {
      test: /\.s(c|a)ss$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        // camelCase将-截断的命名自动改为驼峰式命名，modules开启css模块化
        use: "css-loader?camelCase&modules&localIdentName=[name]_[local]_[hash:base64:5]!sass-loader"
      })
    }, {
      test: /\.css$/i,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      })
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: `file-loader?publicPath=${__dirname}/dist/&outputPath=font/`
    }, {
      test: /\.(png|jpg|jpeg|gif)$/,
      loader: `url-loader?limit=8192&name=[path][name].[ext]&publicPath=${__dirname}/dist/&outputPath=`
    }]
  },
  plugins: [
    // 提取应用js文件内引入的第三方js文件，要提取的文件在entry处配置，设置的名称与此处名称保持一致
    new webpack.optimize.CommonsChunkPlugin("vender"),
    // 提取js文件内的css，生成名为style.css
    new ExtractTextPlugin("style.css", { allChunks: true, disable: false }),
  ]
};