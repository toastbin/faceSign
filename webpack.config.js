const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  entry: path.join(__dirname,'./src/main.js'),
  output: {
    path: path.join(__dirname,'./dist/'),
    filename: 'bundle.js'
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html'
    }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      { test: /\.vue$/ , use: 'vue-loader' },
      { test: /\.css$/ , use: ['vue-style-loader', 'css-loader'] },
      { test: /\.less$/ , use: ['vue-style-loader', 'css-loader','less-loader'] },
      { test:/\.(ttf|eot|svg|woff|woff2|otf)$/, use: 'url-loader'},
      { test:/\.(jpg|png|gif)$/, use: 'url-loader?limit=100&name=[hash:8]-[name].[ext]'},
      // { test: /\.js$/, use: 'babel-loader', exclude: 'node_modules' }
      {test: /\.js$/,loader: 'babel-loader',exclude: /node_modules/}
    ]
  },
  resolve: {
    alias: { 
      "vue$": "vue/dist/vue.js"
    }
  }
}