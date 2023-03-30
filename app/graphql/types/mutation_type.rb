module Types
  class MutationType < Types::BaseObject
    field :pick_screenname, mutation: Mutations::PickScreenname
    field :post_message, mutation: Mutations::PostMessage
  end
end
