Rails.application.routes.draw do
  resources :previous_rankings
  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'
  resources :users

  get '/rankings', to: 'rankings#index'
  post '/rankings', to: 'rankings#create'
  patch '/rankings', to: 'rankings#update'

  get '/previous-rankings', to: 'previous_rankings#index'
  post '/previous-rankings', to: 'previous_rankings#create'

  resources :rankings
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
end
