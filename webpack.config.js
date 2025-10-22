const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: { extensions: ['.js', '.jsx'] },
  module: {
    rules: [
      { 
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      { 
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },

      {
        test: /\.(png|jpe?g|gif|svg)$/i, 
        type: 'asset/resource', // Le dice a Webpack que los trate como archivos
        generator: {
          // Los coloca en una carpeta 'img' dentro de 'dist'
          filename: 'img/[name][ext]' 
        }
      }

      
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })]
}