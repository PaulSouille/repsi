require 'aws-sdk-s3'
require 'securerandom'
require 'json'
Aws.config.update(
    endpoint: 'https://repsi.s3.fr-par.scw.cloud',
    access_key_id: 'SCW17TGYHDAX4VR63WFJ',
    secret_access_key: '3fd25d1f-4048-40b5-9a19-afd260bdc574',
    force_path_style: true,
    region: 'fr-par'
)
s3 = Aws::S3::Resource.new(region: 'fr-par')

class ImagesController < ApplicationController
  before_action  only: [:show, :update, :destroy]

  # GET /images
  def index
    s3 = Aws::S3::Resource.new
    bucket_name = 'hello'
    objects = []
    last_key = nil
    begin
      new_objects = Aws::S3::Bucket.object_id(bucket_name, :marker => last_key)
      objects    += new_objects
      last_key    = objects.last.key
    end while new_objects.size > 0
    render json: {test:'test'}
  end

  # GET /images/1
  def show
    puts params
    render json:{test:params['id']}
  end

  # POST /images
  def create
    bucket_name = 'hello'
    media_base64 = params['base64']
    body = Base64.decode64(media_base64.split(',')[1])
    key = SecureRandom.uuid
    extension = '.jpg'
    s3 = Aws::S3::Resource.new
    s3.bucket(bucket_name).object("#{key}#{extension}").put(body: body, acl: 'public-read', content_type: 'image/jpeg', content_encoding: 'base64')
    render json: {object_key: "#{key}#{extension}"}
  end

  # PATCH/PUT /images/1
  def update
    if @image.update(image_params)
      render json: @image
    else
      render json: @image.errors, status: :unprocessable_entity
    end
  end

  # DELETE /images/1
  def destroy
    @image.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_image
      @image = Image.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def image_params
      params.require(:image).permit(:title, :content, :url, :id)
    end
end
