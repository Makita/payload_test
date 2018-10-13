class CreateTickets < ActiveRecord::Migration[5.2]
  def change
    create_table :tickets do |t|
      t.column :status, :integer, default: 0

      t.timestamps
    end
  end
end
