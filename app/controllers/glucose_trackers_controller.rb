class GlucoseTrackersController < ApplicationController
  include DateHelper
  def index
    # return all the records wiht rspt to signed in usser
    @glucose_units = current_user.glucose_units
  end

  def create
    @glucose_unit = current_user.glucose_units.new(glucose_unit_params)
    if @glucose_unit.save
      redirect_to glucose_trackers_path
      flash[:notice] = 'Added successfully!'
    else
      # if validation fails or in case of invalid data.
      redirect_to glucose_trackers_path
      flash[:notice] = @glucose_unit.errors.messages[:base].first
    end
  end

  def reports
    #return per day records
    @glucose_units = current_user.glucose_units.search(Date.today, Date.today)
  end
  def search_record
    #return months to date and monthly report
    from_date, to_date = modify_date(search_params) # modify_date return date based on search
    @glucose_units = current_user.glucose_units.search(from_date,to_date)
    respond_to do | format |
      # to save page from reload calling js file
      format.js {render :reports}
    end
  end
  private
  def glucose_unit_params
    params.require(:glucose_unit).permit(:unit, :created_at)
  end
  def search_params
    params.require(:glucose_unit).permit(:to_date, :report_type)
  end
end
