require 'swagger_helper'

describe 'Media API' do

  path '/api/v1/medias' do

    post 'Creates a media' do
      tags 'Medias'
      consumes 'application/json'
      parameter name: :media, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string },
          photo_url: { type: :string },
          status: { type: :string }
        },
        required: [ 'name', 'status' ]
      }

      response '201', 'media created' do
        let(:media) { { name: 'cat.gif', status: 'available' } }
        run_test!
      end

      response '422', 'invalid request' do
        let(:media) { { name: 'foo' } }
        run_test!
      end
    end
  end

  path '/api/v1/medias/{id}' do

    get 'Retrieves a media' do
      tags 'Medias'
      produces 'application/json'
      parameter name: :id, :in => :path, :type => :string

      response '200', 'name found' do
        schema type: :object,
          properties: {
            id: { type: :integer, },
            name: { type: :string },
            photo_url: { type: :string },
            status: { type: :string }
          },
          required: [ 'id', 'name', 'status' ]

        let(:id) { Media.create(name: 'foo', status: 'bar', photo_url: 'http://example.com/avatar.jpg').id }
        run_test!
      end

      response '404', 'pet not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end
  end
end
