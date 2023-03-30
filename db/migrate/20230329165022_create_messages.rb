class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.text :body
      t.integer :room_id
      t.integer :person_id

      t.timestamps
    end
    add_index :messages, :room_id
    add_index :messages, :person_id
  end
end
