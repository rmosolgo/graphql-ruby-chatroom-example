require "base64"
class ChatSchema < GraphQL::Schema
  query(Types::Query)
  mutation(Types::Mutation)
  subscription(Types::Subscription)
  context_class(ChatSchema::CustomContext)
  use GraphQL::Pro::Subscriptions, redis: Redis.new

  class << self
    def_delegators :graphql_definition, :subscriptions
  end

  def self.id_from_object(object, type, ctx)
    Base64.urlsafe_encode64("#{type.name}/#{object.id}")
  end
end
