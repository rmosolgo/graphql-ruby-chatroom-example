require "base64"
class ChatSchema < GraphQL::Schema
  query(Types::Query)
  mutation(Types::Mutation)
  subscription(Types::Subscription)
  context_class(ChatSchema::CustomContext)
  use GraphQL::Pro::Subscriptions, redis: Redis.new
  use GraphQL::Pro::OperationStore

  def self.id_from_object(object, type, ctx)
    Base64.urlsafe_encode64("#{type.name}/#{object.id}")
  end
end
