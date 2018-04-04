class Types::Person < Types::BaseObject
  description <<~DESC
  A user in the chatroom, identified by a unique screenname.
  DESC

  global_id_field :id
  field :screenname, String, null: false
  field :messages, [Types::Message], null: false
end
