const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      $ENV: {
        auth_client_id: JSON.stringify(process.env.auth_client_id),
        auth_domain: JSON.stringify(process.env.auth_domain),
      }
    })
  ]
};