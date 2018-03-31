class Mutations::PickScreenname < Mutations::BaseMutation
  description <<~DESC
  A very weak login function. You can only login as someone
  who you are already logged in as, or someone who never existed before.
  You can never reclaim a screenname. Not production-ready XD
  DESC

  field :person, Types::Person, null: true
  field :errors, [String], null: false

  argument :screenname, String, required: true

  def resolve(screenname:)
    if context.current_person
      if context.current_person.screenname == screenname
        {
          person: context.current_person,
          errors: [],
        }
      else
        {
          person: nil,
          errors: ["Already logged in as #{context.current_person.screenname}"],
        }
      end
    else
      new_person = Person.new(screenname: screenname)
      if new_person.save
        context.request.session[:current_person_id] = new_person.id
        context.current_person = new_person
        {
          person: new_person,
          errors: [],
        }
      else
        {
          person: nil,
          errors: new_person.errors.full_messages,
        }
      end
    end
  end
end
