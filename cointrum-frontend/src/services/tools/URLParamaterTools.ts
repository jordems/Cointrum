export function addQueryParametersToURL(
  url: string,
  params: { [id: string]: string | number | boolean | undefined }
) {
  let newURL = url;

  if (!newURL.includes("?")) {
    newURL += "?";
  }

  for (const paramid of Object.keys(params)) {
    const paramElement = params[paramid];

    if (paramElement !== undefined) {
      newURL += `${paramid}=${encodeURIComponent(paramElement)}&`;
    }
  }

  return newURL;
}
