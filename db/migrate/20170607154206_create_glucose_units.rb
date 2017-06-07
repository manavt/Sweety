class CreateGlucoseUnits < ActiveRecord::Migration[5.1]
  def change
    create_table :glucose_units do |t|
      t.integer :unit

      t.timestamps
    end
  end
end
