ActionController::Routing::Routes.draw do |map|
  map.resources :posts

  map.root :controller => "posts"

  # Install the default routes as the lowest priority.
  map.connect ':controller/:action/:id', :controller => 'posts'
  #map.connect ':controller/:action/:id.:format'
end
