require 'rails_helper'
RSpec.describe GlucoseTrackersController, type: :controller do
  describe 'GET #index' do
    login_user
    it '#responds successfully with an HTTP 200 status code' do
      get :index
      expect(response).to be_success
      expect(response).to have_http_status(200)
    end
    it 'renders the index template' do
      get :index
      expect(response).to render_template('index')
    end
  end
  describe 'POST #create' do
    login_user
    context 'add glucose_units' do
      it '#check unit assign to current user' do
        post :create, params: { glucose_unit: { unit: Faker::Number.number(2).to_i, created_at: Faker::Date.between(2.days.ago, Date.today) } }
        expect(response).to redirect_to 'http://test.host/glucose_trackers'
        expect(response).to have_http_status(302)
        assigns(:current_user).glucose_units.count == 1
      end
    end
  end
  describe 'GET #reports' do
    login_user
    it '#returns per day record' do
      get :reports
      glucose_unit = FactoryGirl.create(:glucose_unit, user: assigns(:current_user))
      glucose_unit.class.search(Date.today.strftime('%Y-%d-%m'), Date.today.strftime('%Y-%d-%m')).count == 2
    end
  end
end
