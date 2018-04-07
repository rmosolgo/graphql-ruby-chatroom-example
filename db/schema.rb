# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180407113139) do

  create_table "graphql_client_operations", force: :cascade do |t|
    t.integer "graphql_client_id", null: false
    t.integer "graphql_operation_id", null: false
    t.string "alias", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["graphql_client_id", "alias"], name: "graphql_client_operations_pairs", unique: true
    t.index ["graphql_client_id"], name: "index_graphql_client_operations_on_graphql_client_id"
    t.index ["graphql_operation_id"], name: "index_graphql_client_operations_on_graphql_operation_id"
  end

  create_table "graphql_clients", force: :cascade do |t|
    t.string "name", null: false
    t.string "secret", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_graphql_clients_on_name", unique: true
    t.index ["secret"], name: "index_graphql_clients_on_secret", unique: true
  end

  create_table "graphql_index_entries", force: :cascade do |t|
    t.string "name", null: false
    t.index ["name"], name: "index_graphql_index_entries_on_name", unique: true
  end

  create_table "graphql_index_references", force: :cascade do |t|
    t.integer "graphql_index_entry_id", null: false
    t.integer "graphql_operation_id", null: false
    t.index ["graphql_index_entry_id", "graphql_operation_id"], name: "graphql_index_reference_pairs", unique: true
    t.index ["graphql_index_entry_id"], name: "index_graphql_index_references_on_graphql_index_entry_id"
    t.index ["graphql_operation_id"], name: "index_graphql_index_references_on_graphql_operation_id"
  end

  create_table "graphql_operations", force: :cascade do |t|
    t.string "digest", null: false
    t.text "body", null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["digest"], name: "index_graphql_operations_on_digest", unique: true
  end

  create_table "messages", force: :cascade do |t|
    t.integer "room_id"
    t.text "body"
    t.integer "person_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["person_id"], name: "index_messages_on_person_id"
    t.index ["room_id"], name: "index_messages_on_room_id"
  end

  create_table "people", force: :cascade do |t|
    t.string "screenname"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "rooms", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
