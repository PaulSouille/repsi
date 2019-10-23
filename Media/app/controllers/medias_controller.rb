require 'aws-sdk-s3'
require 'securerandom'
require 'json'

s3 = Aws::S3::Resource.new(region: ENV['s3_region'])

class MediasController < ApplicationController
  before_action  only: [:show, :update, :destroy]
  # GET /medias
  def index
    render json: {'error'=>'route doesn\'t exist'}, status: :bad_request
  end

  # GET /medias/1
  def show
    missing_extension = missing_param('extension')
    if missing_extension
      render missing_extension
      return
    end

    bucket_name = ENV['s3_bucket_name']
    object_key = params['id']
    extension = params['extension']
    # have to directly send the picture 
    s3 = Aws::S3::Resource.new
    s3_object = s3.bucket(bucket_name).object("#{object_key}#{extension}")
    redirect_to s3_object.presigned_url("get", expires_in: 3600)
    #send json:{test:params['id']}
  end

  # POST /medias
  def create
    bucket_name = ENV['s3_bucket_name']
    missing_b64 = missing_param('base64')
    if missing_b64
      render missing_b64
      return
    end
    media_base64 = params['base64']
    body = Base64.decode64(media_base64.split(',')[1])
    key = SecureRandom.uuid
    extension = ".#{media_base64.split('/')[1].split(';')[0]}"
    s3 = Aws::S3::Resource.new
    s3.bucket(bucket_name).object("#{key}#{extension}").put(body: body, acl: ENV['s3_default_acl'], content_type: "image/#{extension}", content_encoding: 'base64', metadata: {'extension'=>extension})
    render json: {object_key: key, extension:extension}
  end

  # PATCH/PUT /medias/1
  def update
    if @image.update(image_params)
      render json: @image
    else
      render json: @image.errors, status: :unprocessable_entity
    end
  end

  # DELETE /medias/1
  def destroy
    @image.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_image
      @image = Image.find(params[:id])
    end

    def missing_param(param)
      if params[param].blank?
        response = { "error" => "missing #{param} element" }
        return {json: response, status: :bad_request}
      end

    end
    # Only allow a trusted parameter "white list" through.
    def image_params_post
      params.require(:base64)
    end
end
