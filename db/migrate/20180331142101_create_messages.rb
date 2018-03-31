class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.references :room, foreign_key: true
      t.text :body
      t.references :person, foreign_key: true

      t.timestamps
    end
  end
end
