require 'test_helper'

class GlucoseTrackersControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get glucose_trackers_index_url
    assert_response :success
  end

  test 'should get new' do
    get glucose_trackers_new_url
    assert_response :success
  end
end
