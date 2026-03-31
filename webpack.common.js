import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'node:path'

export default {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(import.meta.dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
  ],
}
