require 'swagger_helper'

describe 'Media API' do

  path 'medias' do

    post 'Creates a media' do
      tags 'Medias'
      consumes 'application/json'
      parameter name: :base64, :in => :body, schema: {
        type: :object,
        properties: {
          base64: { type: :string },
        },
        required: [ 'name', 'status' ]
      }

      response '200', '{
        "object_key": "aaa3a4f1-c7a7-442d-864d-b7a3dd96fac3",
        "extension": ".jpeg"
        }' do
        let(:media) { { name: 'image.gif', status: 'available' } }
        run_test!
      end

      response '400', '"error": "missing base64 element"' do
        let(:media) { { name: 'foo' } }
        run_test!
      end
    end
  end

  path 'medias/{id}?extension={extension}' do

    get 'Retrieves a media' do
      tags 'Medias'
      produces 'file'
      parameter name: :id, :in => :path, :type => :string
      parameter name: :extension, :in => :path, :type => :string

      response '200', 'file' do
       

        let(:id) { Media.create(name: 'foo', status: 'bar', photo_url: 'http://example.com/avatar.jpg').id }
        run_test!
      end

      response '400', '"error": "missing extension element"' do
        let(:id) { 'invalid' }
        run_test!
      end
    end
  end
end
