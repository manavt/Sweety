Rails.application.routes.draw do
  devise_for :users
  resources :glucose_trackers, only: [:index, :new]
  root to: "glucose_trackers#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
