require "base64"
class ChatSchema < GraphQL::Schema
  query(Types::Query)
  mutation(Types::Mutation)
  context_class(ChatSchema::CustomContext)

  def self.id_from_object(object, type, ctx)
    Base64.urlsafe_encode64("#{type.name}/#{object.id}")
  end
end
