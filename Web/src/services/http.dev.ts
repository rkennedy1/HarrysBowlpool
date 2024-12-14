import { mockedPaths } from './mocks/pathMocks';

type FetchOptions = {
  queryParms?: string | object;
};

export function fetch<ResponseType = unknown>(
  path: string,
  option: FetchOptions = {}
) {
  let pathWithQuery = path;
  if (option.queryParms) {
    pathWithQuery = addQueryParms(path, option.queryParms);
  }

  const mockedData = mockedPaths.find(
    (mockedPath) => mockedPath.path === pathWithQuery
  );

  return new Promise<ResponseType>((resolve, reject) => {
    if (mockedData) {
      resolve(mockedData.data as ResponseType);
    } else {
      reject(new Error('Path not found in mocked data: ' + pathWithQuery));
    }
  });
}

function addQueryParms(path: string, queryParms: string | object) {
  let pathWithQuery = path;

  if (typeof queryParms === 'string') {
    pathWithQuery = `${path}?${queryParms}`;
  } else if (typeof queryParms == 'object') {
    const queryString = Object.keys(queryParms)
      .map((key) => {
        return `${key}=${(queryParms as Record<string, any>)[key]}`;
      })
      .join('&');
    pathWithQuery += `?${queryString}`;
  }
  return pathWithQuery;
}
