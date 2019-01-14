require "base64"
class ChatSchema < GraphQL::Schema
  query(Types::Query)
  mutation(Types::Mutation)
  subscription(Types::Subscription)
  context_class(ChatSchema::CustomContext)
  use GraphQL::Pro::AblySubscriptions,
    redis: Redis.new,
    ably: Ably::Rest.new(key: 'u0LX_A.Cdshgw:DHQ5clPJTuPFB0A8')

  use GraphQL::Pro::OperationStore

  def self.id_from_object(object, type, ctx)
    Base64.urlsafe_encode64("#{type.name}/#{object.id}")
  end
end
