class GraphqlController < ApplicationController
  def query
    context = {
      current_person: Person.where(id: request.session[:current_person_id]).first,
      request: request,
    }
    variables = JSON.parse(params[:variables] || "{}")
    query_string = params[:query]
    result = ChatSchema.execute(query_string, variables: variables, context: context)
    render json: result
  end
end
