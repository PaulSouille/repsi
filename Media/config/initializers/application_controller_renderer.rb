# Be sure to restart your server when you modify this file.

# ActiveSupport::Reloader.to_prepare do
#   ApplicationController.renderer.defaults.merge!(
#     http_host: 'example.org',
#     https: false
#   )
# end
require 'aws-sdk-s3'
Aws.config.update(
    endpoint: ENV['s3_endpoint'],
    access_key_id: ENV['s3_access_key_id'],
    secret_access_key: ENV['s3_secret_access_key'],
    force_path_style: ENV['s3_force_path_style'],
    region: ENV['s3_region']
)