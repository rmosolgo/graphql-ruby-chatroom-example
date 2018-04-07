class Types::Subscription < Types::BaseObject
  field :message_was_added, Types::Message, null: false do
    argument :room, String, required: true
  end
end
