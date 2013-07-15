require 'spec_helper'

describe ExamplesController do
  describe 'GET show' do
    before { get :show, name: 'Todo', implementation: 'Backbone' }

    it 'renders the show template' do
      expect(response).to render_template('show')
    end
  end
end
