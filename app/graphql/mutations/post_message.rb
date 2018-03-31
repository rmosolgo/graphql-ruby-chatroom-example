class Mutations::PostMessage < Mutations::BaseMutation
  field :message, Types::Message, null: true
  field :errors, [String], null: false

  argument :room, String, required: true, description: <<~DESC
    The name of the room to post in.
  DESC
  argument :message, String, required: true, description: <<~DESC
    The message to post.
  DESC

  def resolve(room:, message:)
    if !context.current_person
      return {
        errors: ["Must login to post messages."]
      }
    end

    room = Room.find_or_create_by(name: room)
    message = room.messages.build(person: context.current_person, body: message)
    if message.save
      {
        message: message,
        errors: [],
      }
    else
      {
        message: nil,
        errors: message.errors.full_messages,
      }
    end
  end
end
