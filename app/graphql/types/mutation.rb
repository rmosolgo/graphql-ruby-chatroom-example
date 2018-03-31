class Types::Mutation < Types::BaseObject
  field :pick_screenname, field: Mutations::PickScreenname.field
  field :post_message, field: Mutations::PostMessage.field
end
