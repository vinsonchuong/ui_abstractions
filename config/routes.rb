UiAbstractions::Application.routes.draw do
  get 'examples/:name/:implementation', to: 'examples#show'

  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
end
