import wretch from 'wretch';
import QueryAddon from 'wretch/addons/queryString';

type FetchOptions = {
  queryParms?: string | object;
};

function handleError(error: Error): never {
  throw error;
}

function createApi(url: string) {
  return wretch(url).addon(QueryAddon);
}

export function fetch<ResponseType = unknown>(
  path: string,
  options: FetchOptions = {}
) {
  const { queryParms } = options;
  const baseUrl = import.meta.env.VITE_API_URL;
  let api = createApi(baseUrl);

  if (queryParms) {
    api = api.query(queryParms);
  }

  return api.url(path).get().json<ResponseType>().catch(handleError);
}
