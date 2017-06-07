class AddColumnToGlucoseUnit < ActiveRecord::Migration[5.1]
  def change
    add_reference :glucose_units, :user, foreign_key: true
  end
end
