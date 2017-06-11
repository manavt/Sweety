module GlucoseTrackersHelper
  def calculate_risk(value)
    # returns valid data level for given glucose unit
    case value
    when (30..49)
      "<p><span style=\"background-color: #FFEF33;\">Dangerously low"
    when (50..69)
      "<p><span style=\"background-color: #F6FF33;\">Low</p>"
    when (70..119)
      "<p><span style=\"background-color: #99cc00;\">Normal</p>"
    when (120..179)
      "<p><span style=\"background-color: yellow;\">Borderline</p>"
    when (180..300)
      "<p><span style=\"background-color: #F333FF;\">High</p>"
    when (301..1000)
      "<p><span style=\"background-color: #FF5733;\">Dangerously high</p>"
    else
      "<p><span style=\"background-color: #FF5733;\">Seek immediate medical attention</p>"
    end
  end
  def calc_reading(glucose_units)
    # max, min, avg_result
    val = glucose_units.pluck(:unit, :created_at).sort
    is_empty = val.empty? # place 0 if current date have no records for report result
    avg = val.map {|i|i.first}
    return is_empty ? 0 : val.last, is_empty ? 0 : val.first, val.empty? ? 0 : avg.inject(:+)/avg.count
  end
end
