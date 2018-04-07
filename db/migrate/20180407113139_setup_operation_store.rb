class SetupOperationStore < ActiveRecord::Migration[5.1]
  def change
    create_table :graphql_clients do |t|
      t.column :name, :string, null: false
      t.column :secret, :string, null: false
      t.timestamps
    end
    add_index :graphql_clients, :name, unique: true
    add_index :graphql_clients, :secret, unique: true

    create_table :graphql_client_operations do |t|
      t.references :graphql_client, null: false
      t.references :graphql_operation, null: false
      t.column :alias, :string, null: false
      t.timestamps
    end
    add_index :graphql_client_operations, [:graphql_client_id, :alias], unique: true, name: "graphql_client_operations_pairs"

    create_table :graphql_operations do |t|
      t.column :digest, :string, null: false
      t.column :body, :text, null: false
      t.column :name, :string, null: false
      t.timestamps
    end
    add_index :graphql_operations, :digest, unique: true

    create_table :graphql_index_entries do |t|
      t.column :name, :string, null: false
    end
    add_index :graphql_index_entries, :name, unique: true

    create_table :graphql_index_references do |t|
      t.references :graphql_index_entry, null: false
      t.references :graphql_operation, null: false
    end
    add_index :graphql_index_references, [:graphql_index_entry_id, :graphql_operation_id], unique: true, name: "graphql_index_reference_pairs"
  end
end
