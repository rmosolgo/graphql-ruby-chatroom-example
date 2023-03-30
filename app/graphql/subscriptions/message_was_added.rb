module Subscriptions
  class MessageWasAdded < BaseSubscription
    field :message, Types::Message
    field :room, Types::Room
    argument :room, String
  end
end
