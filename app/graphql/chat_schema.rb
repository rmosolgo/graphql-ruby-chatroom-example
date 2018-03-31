class ChatSchema < GraphQL::Schema
  query(Types::Query)
  mutation(Types::Mutation)
  context_class(ChatSchema::CustomContext)
end
