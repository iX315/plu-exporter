export const SheetDBApiCall = (params: any = {}) => {
  const envUser = process.env.SHEETDB_API_USERNAME ?? "";
  const envPass = process.env.SHEETDB_API_PASSWORD ?? "";
  let envUrl = process.env.SHEETDB_API_URL ?? "";

  const options: RequestInit = {
    headers: {
      Authorization:
        "Basic " + Buffer.from(envUser + ":" + envPass).toString("base64"),
    },
  };

  if (params) {
    const urlParams = new URLSearchParams(params).toString();
    envUrl = envUrl + "?" + urlParams;
  }
  return fetch(envUrl, options);
};
