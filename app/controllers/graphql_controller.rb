class GraphqlController < ApplicationController
  def query
    context = {
      current_person: Person.where(id: request.session[:current_person_id]).first,
      request: request,
      operation_id: params[:extensions] && params[:extensions][:operationId],
    }
    variables = if params[:variables].is_a?(String)
      JSON.parse(params[:variables])
    else
      params[:variables]
    end

    query_string = if Rails.env.production?
      # Only persisted queries in production
      nil
    else
      params[:query]
    end

    result = ChatSchema.execute(query_string, variables: variables, context: context)

    if result.subscription?
      response.headers["X-Subscription-ID"] = result.context[:subscription_id]
    end

    render json: result
  end
end
