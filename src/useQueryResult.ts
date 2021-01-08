import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { QueryFunction } from "./useQuery";
import { isEqual } from "lodash";

interface QueryResultOptions<TArgs> {
  skip: boolean;
  variables: TArgs | undefined;
}

export type QueryResultHookReturn<TArgs, TResult> = {
  data: TResult | undefined;
  error: string | undefined;
  loading: boolean;
  refetch: QueryFunction<TArgs, TResult>;
};

/**
 * Use the result of query un-cached. If you want to use the result
 * of a cached query, use {@link useCache}.
 * @param getterFunc Function to get the query result (usually done using {@link useQuery})
 * @param options Options specifying when to update the query.
 */
const useQueryResult = <TArgs, TResult>(
  getterFunc: QueryFunction<TArgs, TResult>,
  options?: QueryResultOptions<TArgs>
): QueryResultHookReturn<TArgs, TResult> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<TResult | undefined>(undefined);
  const variables = useRef<TArgs | undefined>(options?.variables);
  const refetch = useCallback(
    async (args: TArgs | undefined) => {
      variables.current = args || variables.current;

      setLoading(true);
      setError(undefined);

      const res = await getterFunc(variables.current);

      setLoading(false);
      setData(res);

      return res;
    },
    [getterFunc]
  );

  useEffect(() => {
    if (isEqual(variables, options?.variables)) {
      return;
    }

    refetch(variables.current);
  }, [options?.variables]);

  return { data, loading, error, refetch };
};

export default useQueryResult;
