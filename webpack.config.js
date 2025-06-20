import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
//const CopyPlugin = require('copy-webpack-plugin');
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('./dist'),
    clean: true
  },
  module: {
    rules: [
      
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
        
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/public/media', to: 'media' } // blockly/media лежит тут
      ],
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: {
    static: './dist',
    port: 9000,
    open: true
  },
  resolve: {
    alias: {
      '@blocks': path.resolve(__dirname, 'src/blocks/'),
      '@generators': path.resolve(__dirname, 'src/generators/'),
      '@styles': path.resolve(__dirname, 'src/styles/')
    },
    extensions: ['.js', '.json'],
  },
};
