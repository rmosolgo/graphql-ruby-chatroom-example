module Types
  class Room < Types::BaseObject
    description <<~DESC
    A named channel where people can post messages.
    DESC

    global_id_field :id

    field :name, String, null: false

    field :messages, [Types::Message], null: false do
      argument :last, Integer, required: false, default_value: 10
    end

    def messages(last:)
      if last > 50 || last < 0
        raise GraphQL::ExecutionError, "`last` must be greater than 0 and less than 50"
      end
      object.messages.last(last)
    end
  end
end
