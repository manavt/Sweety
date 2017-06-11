module DateHelper
  extend ActiveSupport::Concern
  def modify_date(val)
    # used by glucose tracker controller
    # return the to and from date based on user search filter
    if val[:report_type] == "Daily report"
       unless val[:to_date].blank?
         # if no end date provided
         from_date, to_date = val[:to_date], val[:to_date]
       else
         from_date, to_date = Date.today, Date.today
       end
     elsif val[:report_type] == "Month to date report"
       unless val[:to_date].blank?
         # if no end date provided
           from_date, to_date = Date.parse(val[:to_date]).at_beginning_of_month, val[:to_date]
         else
           from_date, to_date = Date.today.at_beginning_of_month, Date.today
       end
     elsif val[:report_type] == "Monthly report"
       unless val[:to_date].blank?
         # if no end date provided
         from_date, to_date = Date.parse(val[:to_date])- 1.months, val[:to_date]
       else
         from_date, to_date = Date.today - 1.months , Date.today
       end
    end
  end
end
