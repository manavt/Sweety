FactoryGirl.define do
  factory :glucose_unit do
    unit { Faker::Number.number(2).to_i }
    created_at Date.today
  end
end
