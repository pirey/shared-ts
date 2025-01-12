import React from "react";
import { ZodFormattedError, ZodSchema } from "zod";

export function useRecordState<S>(init: S) {
  return React.useReducer<React.Reducer<S, Partial<S>>>(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    init,
  );
}

export function useValidatedState<T>(
  schema: ZodSchema<T>,
  initialState: T,
  _options?: {
    clearErrorsOnStateChange?: boolean;
    onStateChange?: () => void;
  },
) {
  const [state, _setState] = useRecordState<T>(initialState);
  const [errors, setErrors] = React.useState<ZodFormattedError<T>>();
  const [errorKeys, setErrorKeys] = React.useState<string[]>([]);
  const options = {
    clearErrorsOnStateChange: true,
    ..._options,
  };

  const parseState = () => {
    const result = schema.safeParse(state);
    if (result.success) {
      setErrors(undefined);
      return result.data;
    } else {
      setErrors(result.error.format());
      return null;
    }
  };

  const setFieldErrors = (field: keyof ZodFormattedError<T>, err: string[]) => {
    setErrors((prev) => {
      if (!prev) {
        return {
          _errors: [],
          [field]: { _errors: err },
        } as ZodFormattedError<T>;
      }
      return {
        ...prev,
        [field]: {
          ...prev[field],
          _errors: err,
        },
      };
    });
  };

  const clearErrors = () => {
    setErrorKeys([]);
    setErrors(undefined);
  };

  const setState = (
    newState: Partial<T>,
    _options?: {
      clearError?: boolean;
    },
  ) => {
    const setStateOptions = {
      ..._options,
      clearError: true,
    };
    _setState(newState);
    if (options.clearErrorsOnStateChange && setStateOptions?.clearError) {
      clearErrors();
    }
    options.onStateChange?.();
  };

  const resetState = () => {
    setState(initialState);
  };

  React.useEffect(() => {
    if (!errors) return;
    const keys: string[] = [];
    for (const [key, val] of Object.entries(errors)) {
      if (!val) continue;
      if ("_errors" in val && val._errors.length > 0) {
        keys.push(key);
      }
    }
    setErrorKeys(keys);
  }, [errors]);

  return {
    state,
    setState,
    resetState,
    errors,
    setFieldErrors,
    errorKeys,
    clearErrors,
    parseState,
  };
}

export function useIntersection() {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: [1] },
    );
    if (ref.current) {
      observer.observe(ref.current);
    }

    const node = ref.current;
    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);

  return { isIntersecting, ref };
}
