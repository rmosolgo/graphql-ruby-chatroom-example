module Types
  class Subscription < Types::BaseObject
    field :message_was_added, subscription: Subscriptions::MessageWasAdded
  end
end
