Rails.application.routes.draw do
  resource :tickets, only: [:create]
  resource :events, only: [:create]

  root to: "home#index"
end
