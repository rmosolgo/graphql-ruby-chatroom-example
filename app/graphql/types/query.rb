class Types::Query < Types::BaseObject
  field :viewer, Types::Person, null: true
  def viewer
    context.current_person
  end

  field :room, Types::Room, null: false do
    argument :name, String, required: true
  end

  def room(name:)
    ::Room.find_or_create_by(name: name)
  end
end
