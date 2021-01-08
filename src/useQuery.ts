import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { print } from "graphql";
import { useContext } from "react";
import LyreContext, { LyreOptions } from "./Context";

export type QueryFunction<TArgs, TResult> = (args?: TArgs) => Promise<TResult>;

interface GraphQLResponse<T> {
  data: T;
}

interface QueryOptions extends LyreOptions {}

function useQuery<TResult, TArgs>(
  query: TypedDocumentNode<TResult, TArgs>,
  options: QueryOptions = {}
): QueryFunction<TArgs, TResult> {
  const context = useContext(LyreContext);

  const { endpoint = context.endpoint } = options;

  if (!endpoint) {
    throw new Error(
      "useQuery without endpoint. Ensure this is being called within a <LyreContext /> or provide through options."
    );
  }

  const queryString = print(query);
  return async (args) => {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query: queryString,
        variables: args,
      }),
    });

    const resultJSON = (await res.json()) as GraphQLResponse<TResult>;

    return resultJSON.data;
  };
}

export default useQuery;
