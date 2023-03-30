module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :viewer, Types::Person

    def viewer
      context[:current_person]
    end

    field :room, Types::Room do
      argument :name, String
    end

    def room(name:)
      ::Room.find_or_create_by(name: name)
    end
  end
end
