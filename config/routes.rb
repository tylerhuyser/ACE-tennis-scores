Rails.application.routes.draw do
  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'
  resources :users

  get '/rankings', to: 'rankings#index'
  post '/rankings', to: 'rankings#create'
  patch '/rankings', to: 'rankings#update'

  resources :rankings
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
end
