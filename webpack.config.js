const path = require('path'); // (3)

module.exports = {
  entry: './src/app.js', // (1)
  output: { // (2)
    path: path.join(__dirname, 'public'), // (4)
    filename: 'bundle.js' // (5)
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
  },
};
