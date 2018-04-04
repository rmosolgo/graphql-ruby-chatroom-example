class GraphqlController < ApplicationController
  def query
    context = {
      current_person: Person.where(id: request.session[:current_person_id]).first,
      request: request,
    }
    variables = if params[:variables].is_a?(String)
      JSON.parse(params[:variables])
    else
      params[:variables]
    end
    query_string = params[:query]
    result = ChatSchema.execute(query_string, variables: variables, context: context)
    render json: result
  end
end
