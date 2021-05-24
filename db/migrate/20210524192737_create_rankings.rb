class CreateRankings < ActiveRecord::Migration[6.0]
  def change
    create_table :rankings do |t|
      t.string :data
      t.string :date

      t.timestamps
    end
  end
end
