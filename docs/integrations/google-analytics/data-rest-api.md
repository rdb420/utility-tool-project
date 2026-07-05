Accesses report data in Google Analytics. Warning: Creating multiple Customer Applications, Accounts, or Projects to simulate or act as a single Customer Application, Account, or Project (respectively) or to circumvent Service-specific usage limits or quotas is a direct violation of Google Cloud Platform Terms of Service as well as Google APIs Terms of Service. These actions can result in immediate termination of your GCP project(s) without any warning.

- [REST Resource: v1beta.properties](https://developers.google.com/analytics/devguides/reporting/data/v1/rest#v1beta.properties)
- [REST Resource: v1beta.properties.audienceExports](https://developers.google.com/analytics/devguides/reporting/data/v1/rest#v1beta.properties.audienceExports)
- [REST Resource: v1alpha.properties](https://developers.google.com/analytics/devguides/reporting/data/v1/rest#v1alpha.properties)
- [REST Resource: v1alpha.properties.audienceLists](https://developers.google.com/analytics/devguides/reporting/data/v1/rest#v1alpha.properties.audienceLists)
- [REST Resource: v1alpha.properties.recurringAudienceLists](https://developers.google.com/analytics/devguides/reporting/data/v1/rest#v1alpha.properties.recurringAudienceLists)
- [REST Resource: v1alpha.properties.reportTasks](https://developers.google.com/analytics/devguides/reporting/data/v1/rest#v1alpha.properties.reportTasks)

## Service: analyticsdata.googleapis.com

To call this service, we recommend that you use the Google-provided [client libraries](https://cloud.google.com/apis/docs/client-libraries-explained). If your application needs to use your own libraries to call this service, use the following information when you make the API requests.

### Discovery document

A [Discovery Document](https://developers.google.com/discovery/v1/reference/apis) is a machine-readable specification for describing and consuming REST APIs. It is used to build client libraries, IDE plugins, and other tools that interact with Google APIs. One service may provide multiple discovery documents. This service provides the following discovery documents:

- <https://analyticsdata.googleapis.com/$discovery/rest?version=v1beta>
- <https://analyticsdata.googleapis.com/$discovery/rest?version=v1alpha>

### Service endpoint

A [service endpoint](https://cloud.google.com/apis/design/glossary#api_service_endpoint) is a base URL that specifies the network address of an API service. One service might have multiple service endpoints. This service has the following service endpoint and all URIs below are relative to this service endpoint:

- `https://analyticsdata.googleapis.com`

## REST Resource: [v1beta.properties](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties)

| Methods ||
|---|---|
| `https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/batchRunPivotReports` | `POST /v1beta/{property=properties/*}:batchRunPivotReports` Returns multiple pivot reports in a batch. |
| `https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/batchRunReports` | `POST /v1beta/{property=properties/*}:batchRunReports` Returns multiple reports in a batch. |
| `https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/checkCompatibility` | `POST /v1beta/{property=properties/*}:checkCompatibility` This compatibility method lists dimensions and metrics that can be added to a report request and maintain compatibility. |
| `https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/getMetadata` | `GET /v1beta/{name=properties/*/metadata}` Returns metadata for dimensions and metrics available in reporting methods. |
| `https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runPivotReport` | `POST /v1beta/{property=properties/*}:runPivotReport` Returns a customized pivot report of your Google Analytics event data. |
| `https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runRealtimeReport` | `POST /v1beta/{property=properties/*}:runRealtimeReport` Returns a customized report of realtime event data for your property. |
| `https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runReport` | `POST /v1beta/{property=properties/*}:runReport` Returns a customized report of your Google Analytics event data. |

## REST Resource: [v1beta.properties.audienceExports](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties.audienceExports)

| Methods ||
|---|---|
| `https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties.audienceExports/create` | `POST /v1beta/{parent=properties/*}/audienceExports` Creates an audience export for later retrieval. |
| `https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties.audienceExports/get` | `GET /v1beta/{name=properties/*/audienceExports/*}` Gets configuration metadata about a specific audience export. |
| `https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties.audienceExports/list` | `GET /v1beta/{parent=properties/*}/audienceExports` Lists all audience exports for a property. |
| `https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties.audienceExports/query` | `POST /v1beta/{name=properties/*/audienceExports/*}:query` Retrieves an audience export of users. |

## REST Resource: [v1alpha.properties](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties)

| Methods ||
|---|---|
| `https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties/getMetadata` | `GET /v1alpha/{name=properties/*/metadata}` Returns metadata for dimensions and metrics available in reporting methods. |
| `https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties/getPropertyQuotasSnapshot` | `GET /v1alpha/{name=properties/*/propertyQuotasSnapshot}` Get all property quotas organized by quota category for a given property. |
| `https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties/runFunnelReport` | `POST /v1alpha/{property=properties/*}:runFunnelReport` Returns a customized funnel report of your Google Analytics event data. |
| `https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties/runReport` | `POST /v1alpha/{property=properties/*}:runReport` Returns a customized report of your Google Analytics event data. |

## REST Resource: [v1alpha.properties.audienceLists](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties.audienceLists)

| Methods ||
|---|---|
| `https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties.audienceLists/create` | `POST /v1alpha/{parent=properties/*}/audienceLists` Creates an audience list for later retrieval. |
| `https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties.audienceLists/get` | `GET /v1alpha/{name=properties/*/audienceLists/*}` Gets configuration metadata about a specific audience list. |
| `https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties.audienceLists/list` | `GET /v1alpha/{parent=properties/*}/audienceLists` Lists all audience lists for a property. |
| `https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties.audienceLists/query` | `POST /v1alpha/{name=properties/*/audienceLists/*}:query` Retrieves an audience list of users. |

## REST Resource: [v1alpha.properties.recurringAudienceLists](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties.recurringAudienceLists)

| Methods ||
|---|---|
| `https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties.recurringAudienceLists/create` | `POST /v1alpha/{parent=properties/*}/recurringAudienceLists` Creates a recurring audience list. |
| `https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties.recurringAudienceLists/get` | `GET /v1alpha/{name=properties/*/recurringAudienceLists/*}` Gets configuration metadata about a specific recurring audience list. |
| `https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties.recurringAudienceLists/list` | `GET /v1alpha/{parent=properties/*}/recurringAudienceLists` Lists all recurring audience lists for a property. |

## REST Resource: [v1alpha.properties.reportTasks](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties.reportTasks)

| Methods ||
|---|---|
| `https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties.reportTasks/create` | `POST /v1alpha/{parent=properties/*}/reportTasks` Initiates the creation of a report task. |
| `https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties.reportTasks/get` | `GET /v1alpha/{name=properties/*/reportTasks/*}` Gets report metadata about a specific report task. |
| `https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties.reportTasks/list` | `GET /v1alpha/{parent=properties/*}/reportTasks` Lists all report tasks for a property. |
| `https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties.reportTasks/query` | `POST /v1alpha/{name=properties/*/reportTasks/*}:query` Retrieves a report task's content. |