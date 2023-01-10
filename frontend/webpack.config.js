module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: {
          loader: "css-loader"
        }
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
};
