# Tag Manager API

This API allows clients to access and modify container and tag configuration.

- [REST Resource: v2.accounts](https://developers.google.com/tag-platform/tag-manager/api/reference/rest#v2.accounts)
- [REST Resource: v2.accounts.containers](https://developers.google.com/tag-platform/tag-manager/api/reference/rest#v2.accounts.containers)
- [REST Resource: v2.accounts.containers.destinations](https://developers.google.com/tag-platform/tag-manager/api/reference/rest#v2.accounts.containers.destinations)
- [REST Resource: v2.accounts.containers.environments](https://developers.google.com/tag-platform/tag-manager/api/reference/rest#v2.accounts.containers.environments)
- [REST Resource: v2.accounts.containers.version_headers](https://developers.google.com/tag-platform/tag-manager/api/reference/rest#v2.accounts.containers.version_headers)
- [REST Resource: v2.accounts.containers.versions](https://developers.google.com/tag-platform/tag-manager/api/reference/rest#v2.accounts.containers.versions)
- [REST Resource: v2.accounts.containers.workspaces](https://developers.google.com/tag-platform/tag-manager/api/reference/rest#v2.accounts.containers.workspaces)
- [REST Resource: v2.accounts.containers.workspaces.built_in_variables](https://developers.google.com/tag-platform/tag-manager/api/reference/rest#v2.accounts.containers.workspaces.built_in_variables)
- [REST Resource: v2.accounts.containers.workspaces.clients](https://developers.google.com/tag-platform/tag-manager/api/reference/rest#v2.accounts.containers.workspaces.clients)
- [REST Resource: v2.accounts.containers.workspaces.folders](https://developers.google.com/tag-platform/tag-manager/api/reference/rest#v2.accounts.containers.workspaces.folders)
- [REST Resource: v2.accounts.containers.workspaces.gtag_config](https://developers.google.com/tag-platform/tag-manager/api/reference/rest#v2.accounts.containers.workspaces.gtag_config)
- [REST Resource: v2.accounts.containers.workspaces.tags](https://developers.google.com/tag-platform/tag-manager/api/reference/rest#v2.accounts.containers.workspaces.tags)
- [REST Resource: v2.accounts.containers.workspaces.templates](https://developers.google.com/tag-platform/tag-manager/api/reference/rest#v2.accounts.containers.workspaces.templates)
- [REST Resource: v2.accounts.containers.workspaces.transformations](https://developers.google.com/tag-platform/tag-manager/api/reference/rest#v2.accounts.containers.workspaces.transformations)
- [REST Resource: v2.accounts.containers.workspaces.triggers](https://developers.google.com/tag-platform/tag-manager/api/reference/rest#v2.accounts.containers.workspaces.triggers)
- [REST Resource: v2.accounts.containers.workspaces.variables](https://developers.google.com/tag-platform/tag-manager/api/reference/rest#v2.accounts.containers.workspaces.variables)
- [REST Resource: v2.accounts.containers.workspaces.zones](https://developers.google.com/tag-platform/tag-manager/api/reference/rest#v2.accounts.containers.workspaces.zones)
- [REST Resource: v2.accounts.user_permissions](https://developers.google.com/tag-platform/tag-manager/api/reference/rest#v2.accounts.user_permissions)
- [REST Resource: v1.accounts](https://developers.google.com/tag-platform/tag-manager/api/reference/rest#v1.accounts)
- [REST Resource: v1.accounts.containers](https://developers.google.com/tag-platform/tag-manager/api/reference/rest#v1.accounts.containers)
- [REST Resource: v1.accounts.containers.environments](https://developers.google.com/tag-platform/tag-manager/api/reference/rest#v1.accounts.containers.environments)
- [REST Resource: v1.accounts.containers.folders](https://developers.google.com/tag-platform/tag-manager/api/reference/rest#v1.accounts.containers.folders)
- [REST Resource: v1.accounts.containers.folders.entities](https://developers.google.com/tag-platform/tag-manager/api/reference/rest#v1.accounts.containers.folders.entities)
- [REST Resource: v1.accounts.containers.move_folders](https://developers.google.com/tag-platform/tag-manager/api/reference/rest#v1.accounts.containers.move_folders)
- [REST Resource: v1.accounts.containers.reauthorize_environments](https://developers.google.com/tag-platform/tag-manager/api/reference/rest#v1.accounts.containers.reauthorize_environments)
- [REST Resource: v1.accounts.containers.tags](https://developers.google.com/tag-platform/tag-manager/api/reference/rest#v1.accounts.containers.tags)
- [REST Resource: v1.accounts.containers.triggers](https://developers.google.com/tag-platform/tag-manager/api/reference/rest#v1.accounts.containers.triggers)
- [REST Resource: v1.accounts.containers.variables](https://developers.google.com/tag-platform/tag-manager/api/reference/rest#v1.accounts.containers.variables)
- [REST Resource: v1.accounts.containers.versions](https://developers.google.com/tag-platform/tag-manager/api/reference/rest#v1.accounts.containers.versions)
- [REST Resource: v1.accounts.permissions](https://developers.google.com/tag-platform/tag-manager/api/reference/rest#v1.accounts.permissions)

## Service: tagmanager.googleapis.com

To call this service, we recommend that you use the Google-provided [client libraries](https://cloud.google.com/apis/docs/client-libraries-explained). If your application needs to use your own libraries to call this service, use the following information when you make the API requests.

### Discovery document

A [Discovery Document](https://developers.google.com/discovery/v1/reference/apis) is a machine-readable specification for describing and consuming REST APIs. It is used to build client libraries, IDE plugins, and other tools that interact with Google APIs. One service may provide multiple discovery documents. This service provides the following discovery documents:

- <https://tagmanager.googleapis.com/$discovery/rest?version=v2>
- <https://tagmanager.googleapis.com/$discovery/rest?version=v1>

### Service endpoint

A [service endpoint](https://cloud.google.com/apis/design/glossary#api_service_endpoint) is a base URL that specifies the network address of an API service. One service might have multiple service endpoints. This service has the following service endpoint and all URIs below are relative to this service endpoint:

- `https://tagmanager.googleapis.com`

## REST Resource: [v2.accounts](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts)

| Methods ||
|---|---|
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts/get` | `GET /tagmanager/v2/{path}` Gets a GTM Account. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts/list` | `GET /tagmanager/v2/accounts` Lists all GTM Accounts that a user has access to. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts/update` | `PUT /tagmanager/v2/{path}` Updates a GTM Account. |

## REST Resource: [v2.accounts.containers](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers)

| Methods ||
|---|---|
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers/combine` | `POST /tagmanager/v2/{path}:combine` Combines Containers. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers/create` | `POST /tagmanager/v2/{parent}/containers` Creates a Container. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers/delete` | `DELETE /tagmanager/v2/{path}` Deletes a Container. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers/get` | `GET /tagmanager/v2/{path}` Gets a Container. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers/list` | `GET /tagmanager/v2/{parent}/containers` Lists all Containers that belongs to a GTM Account. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers/lookup` | `GET /tagmanager/v2/accounts/containers:lookup` Looks up a Container by destination ID or tag ID. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers/move_tag_id` | `POST /tagmanager/v2/{path}:move_tag_id` Move Tag ID out of a Container. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers/snippet` | `GET /tagmanager/v2/{path}:snippet` Gets the tagging snippet for a Container. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers/update` | `PUT /tagmanager/v2/{path}` Updates a Container. |

## REST Resource: [v2.accounts.containers.destinations](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.destinations)

| Methods ||
|---|---|
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.destinations/get` | `GET /tagmanager/v2/{path}` Gets a Destination. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.destinations/link` | `POST /tagmanager/v2/{parent}/destinations:link` Adds a Destination to this Container and removes it from the Container to which it is currently linked. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.destinations/list` | `GET /tagmanager/v2/{parent}/destinations` Lists all Destinations linked to a GTM Container. |

## REST Resource: [v2.accounts.containers.environments](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.environments)

| Methods ||
|---|---|
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.environments/create` | `POST /tagmanager/v2/{parent}/environments` Creates a GTM Environment. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.environments/delete` | `DELETE /tagmanager/v2/{path}` Deletes a GTM Environment. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.environments/get` | `GET /tagmanager/v2/{path}` Gets a GTM Environment. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.environments/list` | `GET /tagmanager/v2/{parent}/environments` Lists all GTM Environments of a GTM Container. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.environments/reauthorize` | `POST /tagmanager/v2/{path}:reauthorize` Re-generates the authorization code for a GTM Environment. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.environments/update` | `PUT /tagmanager/v2/{path}` Updates a GTM Environment. |

## REST Resource: [v2.accounts.containers.version_headers](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.version_headers)

| Methods ||
|---|---|
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.version_headers/latest` | `GET /tagmanager/v2/{parent}/version_headers:latest` Gets the latest container version header |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.version_headers/list` | `GET /tagmanager/v2/{parent}/version_headers` Lists all Container Versions of a GTM Container. |

## REST Resource: [v2.accounts.containers.versions](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.versions)

| Methods ||
|---|---|
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.versions/delete` | `DELETE /tagmanager/v2/{path}` Deletes a Container Version. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.versions/get` | `GET /tagmanager/v2/{path}` Gets a Container Version. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.versions/live` | `GET /tagmanager/v2/{parent}/versions:live` Gets the live (i.e. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.versions/publish` | `POST /tagmanager/v2/{path}:publish` Publishes a Container Version. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.versions/set_latest` | `POST /tagmanager/v2/{path}:set_latest` Sets the latest version used for synchronization of workspaces when detecting conflicts and errors. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.versions/undelete` | `POST /tagmanager/v2/{path}:undelete` Undeletes a Container Version. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.versions/update` | `PUT /tagmanager/v2/{path}` Updates a Container Version. |

## REST Resource: [v2.accounts.containers.workspaces](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces)

| Methods ||
|---|---|
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces/create` | `POST /tagmanager/v2/{parent}/workspaces` Creates a Workspace. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces/create_version` | `POST /tagmanager/v2/{path}:create_version` Creates a Container Version from the entities present in the workspace, deletes the workspace, and sets the base container version to the newly created version. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces/delete` | `DELETE /tagmanager/v2/{path}` Deletes a Workspace. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces/get` | `GET /tagmanager/v2/{path}` Gets a Workspace. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces/getStatus` | `GET /tagmanager/v2/{path}/status` Finds conflicting and modified entities in the workspace. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces/list` | `GET /tagmanager/v2/{parent}/workspaces` Lists all Workspaces that belong to a GTM Container. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces/quick_preview` | `POST /tagmanager/v2/{path}:quick_preview` Quick previews a workspace by creating a fake container version from all entities in the provided workspace. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces/resolve_conflict` | `POST /tagmanager/v2/{path}:resolve_conflict` Resolves a merge conflict for a workspace entity by updating it to the resolved entity passed in the request. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces/sync` | `POST /tagmanager/v2/{path}:sync` Syncs a workspace to the latest container version by updating all unmodified workspace entities and displaying conflicts for modified entities. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces/update` | `PUT /tagmanager/v2/{path}` Updates a Workspace. |

## REST Resource: [v2.accounts.containers.workspaces.built_in_variables](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.built_in_variables)

| Methods ||
|---|---|
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.built_in_variables/create` | `POST /tagmanager/v2/{parent}/built_in_variables` Creates one or more GTM Built-In Variables. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.built_in_variables/delete` | `DELETE /tagmanager/v2/{path}` Deletes one or more GTM Built-In Variables. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.built_in_variables/list` | `GET /tagmanager/v2/{parent}/built_in_variables` Lists all the enabled Built-In Variables of a GTM Container. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.built_in_variables/revert` | `POST /tagmanager/v2/{path}/built_in_variables:revert` Reverts changes to a GTM Built-In Variables in a GTM Workspace. |

## REST Resource: [v2.accounts.containers.workspaces.clients](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.clients)

| Methods ||
|---|---|
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.clients/create` | `POST /tagmanager/v2/{parent}/clients` Creates a GTM Client. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.clients/delete` | `DELETE /tagmanager/v2/{path}` Deletes a GTM Client. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.clients/get` | `GET /tagmanager/v2/{path}` Gets a GTM Client. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.clients/list` | `GET /tagmanager/v2/{parent}/clients` Lists all GTM Clients of a GTM container workspace. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.clients/revert` | `POST /tagmanager/v2/{path}:revert` Reverts changes to a GTM Client in a GTM Workspace. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.clients/update` | `PUT /tagmanager/v2/{path}` Updates a GTM Client. |

## REST Resource: [v2.accounts.containers.workspaces.folders](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.folders)

| Methods ||
|---|---|
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.folders/create` | `POST /tagmanager/v2/{parent}/folders` Creates a GTM Folder. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.folders/delete` | `DELETE /tagmanager/v2/{path}` Deletes a GTM Folder. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.folders/entities` | `POST /tagmanager/v2/{path}:entities` List all entities in a GTM Folder. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.folders/get` | `GET /tagmanager/v2/{path}` Gets a GTM Folder. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.folders/list` | `GET /tagmanager/v2/{parent}/folders` Lists all GTM Folders of a Container. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.folders/move_entities_to_folder` | `POST /tagmanager/v2/{path}:move_entities_to_folder` Moves entities to a GTM Folder. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.folders/revert` | `POST /tagmanager/v2/{path}:revert` Reverts changes to a GTM Folder in a GTM Workspace. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.folders/update` | `PUT /tagmanager/v2/{path}` Updates a GTM Folder. |

## REST Resource: [v2.accounts.containers.workspaces.gtag_config](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.gtag_config)

| Methods ||
|---|---|
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.gtag_config/create` | `POST /tagmanager/v2/{parent}/gtag_config` Creates a Google tag config. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.gtag_config/delete` | `DELETE /tagmanager/v2/{path}` Deletes a Google tag config. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.gtag_config/get` | `GET /tagmanager/v2/{path}` Gets a Google tag config. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.gtag_config/list` | `GET /tagmanager/v2/{parent}/gtag_config` Lists all Google tag configs in a Container. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.gtag_config/update` | `PUT /tagmanager/v2/{path}` Updates a Google tag config. |

## REST Resource: [v2.accounts.containers.workspaces.tags](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.tags)

| Methods ||
|---|---|
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.tags/create` | `POST /tagmanager/v2/{parent}/tags` Creates a GTM Tag. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.tags/delete` | `DELETE /tagmanager/v2/{path}` Deletes a GTM Tag. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.tags/get` | `GET /tagmanager/v2/{path}` Gets a GTM Tag. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.tags/list` | `GET /tagmanager/v2/{parent}/tags` Lists all GTM Tags of a Container. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.tags/revert` | `POST /tagmanager/v2/{path}:revert` Reverts changes to a GTM Tag in a GTM Workspace. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.tags/update` | `PUT /tagmanager/v2/{path}` Updates a GTM Tag. |

## REST Resource: [v2.accounts.containers.workspaces.templates](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.templates)

| Methods ||
|---|---|
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.templates/create` | `POST /tagmanager/v2/{parent}/templates` Creates a GTM Custom Template. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.templates/delete` | `DELETE /tagmanager/v2/{path}` Deletes a GTM Template. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.templates/get` | `GET /tagmanager/v2/{path}` Gets a GTM Template. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.templates/import_from_gallery` | `POST /tagmanager/v2/{parent}/templates:import_from_gallery` Imports a GTM Custom Template from Gallery. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.templates/list` | `GET /tagmanager/v2/{parent}/templates` Lists all GTM Templates of a GTM container workspace. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.templates/revert` | `POST /tagmanager/v2/{path}:revert` Reverts changes to a GTM Template in a GTM Workspace. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.templates/update` | `PUT /tagmanager/v2/{path}` Updates a GTM Template. |

## REST Resource: [v2.accounts.containers.workspaces.transformations](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.transformations)

| Methods ||
|---|---|
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.transformations/create` | `POST /tagmanager/v2/{parent}/transformations` Creates a GTM Transformation. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.transformations/delete` | `DELETE /tagmanager/v2/{path}` Deletes a GTM Transformation. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.transformations/get` | `GET /tagmanager/v2/{path}` Gets a GTM Transformation. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.transformations/list` | `GET /tagmanager/v2/{parent}/transformations` Lists all GTM Transformations of a GTM container workspace. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.transformations/revert` | `POST /tagmanager/v2/{path}:revert` Reverts changes to a GTM Transformation in a GTM Workspace. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.transformations/update` | `PUT /tagmanager/v2/{path}` Updates a GTM Transformation. |

## REST Resource: [v2.accounts.containers.workspaces.triggers](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.triggers)

| Methods ||
|---|---|
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.triggers/create` | `POST /tagmanager/v2/{parent}/triggers` Creates a GTM Trigger. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.triggers/delete` | `DELETE /tagmanager/v2/{path}` Deletes a GTM Trigger. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.triggers/get` | `GET /tagmanager/v2/{path}` Gets a GTM Trigger. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.triggers/list` | `GET /tagmanager/v2/{parent}/triggers` Lists all GTM Triggers of a Container. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.triggers/revert` | `POST /tagmanager/v2/{path}:revert` Reverts changes to a GTM Trigger in a GTM Workspace. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.triggers/update` | `PUT /tagmanager/v2/{path}` Updates a GTM Trigger. |

## REST Resource: [v2.accounts.containers.workspaces.variables](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.variables)

| Methods ||
|---|---|
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.variables/create` | `POST /tagmanager/v2/{parent}/variables` Creates a GTM Variable. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.variables/delete` | `DELETE /tagmanager/v2/{path}` Deletes a GTM Variable. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.variables/get` | `GET /tagmanager/v2/{path}` Gets a GTM Variable. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.variables/list` | `GET /tagmanager/v2/{parent}/variables` Lists all GTM Variables of a Container. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.variables/revert` | `POST /tagmanager/v2/{path}:revert` Reverts changes to a GTM Variable in a GTM Workspace. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.variables/update` | `PUT /tagmanager/v2/{path}` Updates a GTM Variable. |

## REST Resource: [v2.accounts.containers.workspaces.zones](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.zones)

| Methods ||
|---|---|
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.zones/create` | `POST /tagmanager/v2/{parent}/zones` Creates a GTM Zone. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.zones/delete` | `DELETE /tagmanager/v2/{path}` Deletes a GTM Zone. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.zones/get` | `GET /tagmanager/v2/{path}` Gets a GTM Zone. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.zones/list` | `GET /tagmanager/v2/{parent}/zones` Lists all GTM Zones of a GTM container workspace. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.zones/revert` | `POST /tagmanager/v2/{path}:revert` Reverts changes to a GTM Zone in a GTM Workspace. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.containers.workspaces.zones/update` | `PUT /tagmanager/v2/{path}` Updates a GTM Zone. |

## REST Resource: [v2.accounts.user_permissions](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.user_permissions)

| Methods ||
|---|---|
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.user_permissions/create` | `POST /tagmanager/v2/{parent}/user_permissions` Creates a user's Account \& Container access. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.user_permissions/delete` | `DELETE /tagmanager/v2/{path}` Removes a user from the account, revoking access to it and all of its containers. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.user_permissions/get` | `GET /tagmanager/v2/{path}` Gets a user's Account \& Container access. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.user_permissions/list` | `GET /tagmanager/v2/{parent}/user_permissions` List all users that have access to the account along with Account and Container user access granted to each of them. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v2/accounts.user_permissions/update` | `PUT /tagmanager/v2/{path}` Updates a user's Account \& Container access. |

## REST Resource: [v1.accounts](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts)

| Methods ||
|---|---|
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts/get` | `GET /tagmanager/v1/accounts/{accountId}` Gets a GTM Account. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts/list` | `GET /tagmanager/v1/accounts` Lists all GTM Accounts that a user has access to. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts/update` | `PUT /tagmanager/v1/accounts/{accountId}` Updates a GTM Account. |

## REST Resource: [v1.accounts.containers](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers)

| Methods ||
|---|---|
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers/create` | `POST /tagmanager/v1/accounts/{accountId}/containers` Creates a Container. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers/delete` | `DELETE /tagmanager/v1/accounts/{accountId}/containers/{containerId}` Deletes a Container. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers/get` | `GET /tagmanager/v1/accounts/{accountId}/containers/{containerId}` Gets a Container. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers/list` | `GET /tagmanager/v1/accounts/{accountId}/containers` Lists all Containers that belongs to a GTM Account. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers/update` | `PUT /tagmanager/v1/accounts/{accountId}/containers/{containerId}` Updates a Container. |

## REST Resource: [v1.accounts.containers.environments](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.environments)

| Methods ||
|---|---|
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.environments/create` | `POST /tagmanager/v1/accounts/{accountId}/containers/{containerId}/environments` Creates a GTM Environment. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.environments/delete` | `DELETE /tagmanager/v1/accounts/{accountId}/containers/{containerId}/environments/{environmentId}` Deletes a GTM Environment. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.environments/get` | `GET /tagmanager/v1/accounts/{accountId}/containers/{containerId}/environments/{environmentId}` Gets a GTM Environment. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.environments/list` | `GET /tagmanager/v1/accounts/{accountId}/containers/{containerId}/environments` Lists all GTM Environments of a GTM Container. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.environments/update` | `PUT /tagmanager/v1/accounts/{accountId}/containers/{containerId}/environments/{environmentId}` Updates a GTM Environment. |

## REST Resource: [v1.accounts.containers.folders](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.folders)

| Methods ||
|---|---|
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.folders/create` | `POST /tagmanager/v1/accounts/{accountId}/containers/{containerId}/folders` Creates a GTM Folder. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.folders/delete` | `DELETE /tagmanager/v1/accounts/{accountId}/containers/{containerId}/folders/{folderId}` Deletes a GTM Folder. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.folders/get` | `GET /tagmanager/v1/accounts/{accountId}/containers/{containerId}/folders/{folderId}` Gets a GTM Folder. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.folders/list` | `GET /tagmanager/v1/accounts/{accountId}/containers/{containerId}/folders` Lists all GTM Folders of a Container. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.folders/update` | `PUT /tagmanager/v1/accounts/{accountId}/containers/{containerId}/folders/{folderId}` Updates a GTM Folder. |

## REST Resource: [v1.accounts.containers.folders.entities](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.folders.entities)

| Methods ||
|---|---|
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.folders.entities/list` | `GET /tagmanager/v1/accounts/{accountId}/containers/{containerId}/folders/{folderId}/entities` List all entities in a GTM Folder. |

## REST Resource: [v1.accounts.containers.move_folders](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.move_folders)

| Methods ||
|---|---|
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.move_folders/update` | `PUT /tagmanager/v1/accounts/{accountId}/containers/{containerId}/move_folders/{folderId}` Moves entities to a GTM Folder. |

## REST Resource: [v1.accounts.containers.reauthorize_environments](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.reauthorize_environments)

| Methods ||
|---|---|
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.reauthorize_environments/update` | `PUT /tagmanager/v1/accounts/{accountId}/containers/{containerId}/reauthorize_environments/{environmentId}` Re-generates the authorization code for a GTM Environment. |

## REST Resource: [v1.accounts.containers.tags](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.tags)

| Methods ||
|---|---|
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.tags/create` | `POST /tagmanager/v1/accounts/{accountId}/containers/{containerId}/tags` Creates a GTM Tag. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.tags/delete` | `DELETE /tagmanager/v1/accounts/{accountId}/containers/{containerId}/tags/{tagId}` Deletes a GTM Tag. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.tags/get` | `GET /tagmanager/v1/accounts/{accountId}/containers/{containerId}/tags/{tagId}` Gets a GTM Tag. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.tags/list` | `GET /tagmanager/v1/accounts/{accountId}/containers/{containerId}/tags` Lists all GTM Tags of a Container. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.tags/update` | `PUT /tagmanager/v1/accounts/{accountId}/containers/{containerId}/tags/{tagId}` Updates a GTM Tag. |

## REST Resource: [v1.accounts.containers.triggers](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.triggers)

| Methods ||
|---|---|
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.triggers/create` | `POST /tagmanager/v1/accounts/{accountId}/containers/{containerId}/triggers` Creates a GTM Trigger. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.triggers/delete` | `DELETE /tagmanager/v1/accounts/{accountId}/containers/{containerId}/triggers/{triggerId}` Deletes a GTM Trigger. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.triggers/get` | `GET /tagmanager/v1/accounts/{accountId}/containers/{containerId}/triggers/{triggerId}` Gets a GTM Trigger. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.triggers/list` | `GET /tagmanager/v1/accounts/{accountId}/containers/{containerId}/triggers` Lists all GTM Triggers of a Container. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.triggers/update` | `PUT /tagmanager/v1/accounts/{accountId}/containers/{containerId}/triggers/{triggerId}` Updates a GTM Trigger. |

## REST Resource: [v1.accounts.containers.variables](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.variables)

| Methods ||
|---|---|
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.variables/create` | `POST /tagmanager/v1/accounts/{accountId}/containers/{containerId}/variables` Creates a GTM Variable. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.variables/delete` | `DELETE /tagmanager/v1/accounts/{accountId}/containers/{containerId}/variables/{variableId}` Deletes a GTM Variable. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.variables/get` | `GET /tagmanager/v1/accounts/{accountId}/containers/{containerId}/variables/{variableId}` Gets a GTM Variable. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.variables/list` | `GET /tagmanager/v1/accounts/{accountId}/containers/{containerId}/variables` Lists all GTM Variables of a Container. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.variables/update` | `PUT /tagmanager/v1/accounts/{accountId}/containers/{containerId}/variables/{variableId}` Updates a GTM Variable. |

## REST Resource: [v1.accounts.containers.versions](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.versions)

| Methods ||
|---|---|
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.versions/create` | `POST /tagmanager/v1/accounts/{accountId}/containers/{containerId}/versions` Creates a Container Version. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.versions/delete` | `DELETE /tagmanager/v1/accounts/{accountId}/containers/{containerId}/versions/{containerVersionId}` Deletes a Container Version. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.versions/get` | `GET /tagmanager/v1/accounts/{accountId}/containers/{containerId}/versions/{containerVersionId}` Gets a Container Version. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.versions/list` | `GET /tagmanager/v1/accounts/{accountId}/containers/{containerId}/versions` Lists all Container Versions of a GTM Container. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.versions/publish` | `POST /tagmanager/v1/accounts/{accountId}/containers/{containerId}/versions/{containerVersionId}/publish` Publishes a Container Version. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.versions/restore` | `POST /tagmanager/v1/accounts/{accountId}/containers/{containerId}/versions/{containerVersionId}/restore` Restores a Container Version. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.versions/undelete` | `POST /tagmanager/v1/accounts/{accountId}/containers/{containerId}/versions/{containerVersionId}/undelete` Undeletes a Container Version. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.containers.versions/update` | `PUT /tagmanager/v1/accounts/{accountId}/containers/{containerId}/versions/{containerVersionId}` Updates a Container Version. |

## REST Resource: [v1.accounts.permissions](https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.permissions)

| Methods ||
|---|---|
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.permissions/create` | `POST /tagmanager/v1/accounts/{accountId}/permissions` Creates a user's Account \& Container Permissions. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.permissions/delete` | `DELETE /tagmanager/v1/accounts/{accountId}/permissions/{permissionId}` Removes a user from the account, revoking access to it and all of its containers. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.permissions/get` | `GET /tagmanager/v1/accounts/{accountId}/permissions/{permissionId}` Gets a user's Account \& Container Permissions. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.permissions/list` | `GET /tagmanager/v1/accounts/{accountId}/permissions` List all users that have access to the account along with Account and Container Permissions granted to each of them. |
| `https://developers.google.com/tag-platform/tag-manager/api/reference/rest/v1/accounts.permissions/update` | `PUT /tagmanager/v1/accounts/{accountId}/permissions/{permissionId}` Updates a user's Account \& Container Permissions. |