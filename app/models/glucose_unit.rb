class GlucoseUnit < ApplicationRecord

  validates :unit, numericality: true, inclusion: { in: 0..1500 }

  belongs_to :user
  after_validation :check_add_limit

  def check_add_limit
    # add below message if user try to add more than 4 records for single day
    if user.glucose_units.search(created_at.strftime("%Y-%m-%d"), created_at.strftime("%Y-%m-%d")).count >= 4
       errors.add(:base, "You have hit the maximum limit, Only 4 records can be added per day")
     elsif created_at >= Date.today + 1.days
       errors.add(:base, "Record can't be added for future dates")
    end
  end
  def self.search(from_date, to_date)
    # search query
    where("DATE(created_at) >= ? and DATE(created_at) <= ?", from_date, to_date)
  end
end
