module Types
  class Message < Types::BaseObject
    description <<~DESC
    A message posted by someone in a Room.
    DESC

    global_id_field :id
    field :room, Types::Room
    field :author, Types::Person, method: :person
    field :body, String

    # messed up, in a subscription this is a types::Subscription instance
    def room
      if @object.respond_to?(:object)
        @object.object.room
      else
        @object.room
      end
    end
  end
end
