# Lyre

Lyre is a replacement for Apollo client with similar functionality and a modular structure. Instead of a monolithic design handling caching, pagination, and network requests all within a single client, Lyre breaks down functionality into simple, composable functions.

## Basic Structure

Lyre breaks down Apollo into two components:

1. **Fetch** - handles fetching GraphQL data from the backend (making network requests to the correct endpoint, eventually could include ways of batching requests similar to Relay)
2. **Cache** - generalized caching middleware. Takes in a request and the current cache, makes requests if needed, and returns the result of the request.
   1. This is pluggable to any number of local state providers: Redux, or even just a `useState` call.

The benefit to splitting it up like this is that we can easily write hooks to handle any number of use cases from Apollo:

- **Pagination** is a cache of the current results + a page identifier.
- **Polling** is a function that runs a `refetch` function.
- **Automatic State Updates** from Apollo are just a special type of cache. The cache, in this case, is a map of object ID to object that updates whenever new results are fetched from the backend.

## Example

```typescript
import { GetUsersDocument } from 'get-users.graphql';

const SomeComponent = () => {
  const fetchUsers = useQuery(GetUsersDocument); // TypedDocumentNode specifies return value of this doc
  
  // fetches every time the variables change. almost exact same format as Apollo
  const {
    data: users,
    error,
    loading,
    refetch
  } = useResult(fetchUsers, {
    variables: { superuser: true }
  });
  
  // refetch every second
  const { polling, start, stop } = usePolledQuery(refetch, 1000);
}
```

Also see [examples/lyre-basic](./examples/lyre-basic)