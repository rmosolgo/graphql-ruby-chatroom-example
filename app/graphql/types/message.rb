class Types::Message < Types::BaseObject
  description <<~DESC
  A message posted by someone in a Room.
  DESC

  field :room, Types::Room, null: false
  field :author, Types::Person, null: false, method: :person
  field :body, String, null: false
end
