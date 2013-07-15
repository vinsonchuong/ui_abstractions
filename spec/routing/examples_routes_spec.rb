require 'spec_helper'

describe 'Examples Routes' do
  it 'routes GET /examples/:name/:implementation' do
    expect(get: '/examples/todo/backbone').to route_to('examples#show', name: 'todo', implementation: 'backbone')
  end
end
