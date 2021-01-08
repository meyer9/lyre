import { identity, isEqual } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { QueryFunction } from "./useQuery";
import { QueryResultHookReturn } from "./useQueryResult";

type ReducerFunc<TState, TAction> = (state: TState, action: TAction) => TState;

interface CacheOptions<TState, TAction> {
  reducer: ReducerFunc<TState, TAction>;
  initialState: TState;
}

export interface Cache<TState, TAction> {
  getState: () => TState;
  register: (callback: (newState: TState) => void) => () => void;
  update: (action: TAction) => TState;
}

export function createCache<TState, TAction>({
  reducer,
  initialState,
}: CacheOptions<TState, TAction>): Cache<TState, TAction> {
  const state = {
    data: initialState,
    listeners: new Set<(newState: TState) => void>(),
  };

  return {
    getState: () => state.data,
    register: (listener: (newState: TState) => void) => {
      state.listeners.add(listener);

      return () => state.listeners.delete(listener);
    },
    update: (action: TAction) => {
      state.data = reducer(state.data, action);

      for (const listener of state.listeners) {
        listener(state.data);
      }

      return state.data;
    },
  };
}

/**
 * Selects some part of the cache. Whenever the cache is updated, the component is
 * rerendered and the result of this hook is updated.
 */
export const useCacheSelector = <TState, TAction, TResult>(
  cache: Cache<TState, TAction>,
  selector: (s: TState) => TResult
): TResult => {
  const [selectedState, setSelectedState] = useState(
    selector(cache.getState())
  );

  useEffect(
    () => cache.register((state) => setSelectedState(selector(state))),
    []
  );

  return selectedState;
};

interface UseCacheParams<TArgs, TState, TAction, TSelector> {
  cache: Cache<TState, TAction>;
  variables?: TArgs;
  getter: QueryFunction<TArgs, TAction>;
  selector?: TSelector;
}

/**
 * Declaratively define a part of a query we need.
 */
export const useCache = <
  TArgs,
  TState,
  TAction,
  TSelector extends (s: TState) => any = (s: TState) => TState
>({
  cache,
  getter,
  variables,
  selector,
}: UseCacheParams<TArgs, TState, TAction, TSelector>): QueryResultHookReturn<
  TArgs,
  ReturnType<TSelector>
> => {
  let selectorFn: TSelector = selector || ((identity as unknown) as TSelector);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const currentVariables = useRef<TArgs | undefined>(variables);
  const refetch = useCallback(
    async (args: TArgs | undefined) => {
      currentVariables.current = args || currentVariables.current;

      setLoading(true);
      setError(undefined);
      const res = await getter(currentVariables.current);
      cache.update(res);
      setLoading(false);

      return selectorFn(cache.getState());
    },
    [getter, cache]
  );

  useEffect(() => {
    if (isEqual(currentVariables.current, variables)) {
      return;
    }

    refetch(currentVariables.current);
  }, [variables]);

  const data = useCacheSelector(cache, selectorFn) as ReturnType<TSelector>;

  return { data, loading, error, refetch };
};
