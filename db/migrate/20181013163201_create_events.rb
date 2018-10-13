class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.belongs_to :ticket
      t.column :category,    :integer
      t.column :measurement, :integer

      t.timestamps
    end
  end
end
