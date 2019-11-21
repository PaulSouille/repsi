Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/media/documentation'
  mount Rswag::Api::Engine => '/media/documentation'
  resources :medias
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
