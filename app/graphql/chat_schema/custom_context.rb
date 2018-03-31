class ChatSchema::CustomContext < GraphQL::Query::Context
  def current_person
    self[:current_person]
  end

  def current_person=(new_current_person)
    self[:current_person] = new_current_person
  end

  def request
    self[:request]
  end

  def inspect
    "#<CustomContext viewer=#{current_person&.screenname.inspect}"
  end
end
