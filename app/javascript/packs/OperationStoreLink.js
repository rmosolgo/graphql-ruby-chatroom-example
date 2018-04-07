import OperationStoreClient from "./OperationStoreClient"

const OperationStoreLink = function(operation, forward) {
  if (operation.operationName) {
    const operationId = OperationStoreClient.getOperationId(operation.operationName)
    operation.setContext({
      http: {
        includeQuery: false,
        includeExtensions: true,
      }
    })
    operation.extensions.operationId = operationId
  }
  return forward(operation)
}

export default OperationStoreLink
