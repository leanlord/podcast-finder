const index = {
  local: {
    apiBaseURI: "http://localhost/api/",
  },
  dev: {
    apiBaseURI: "http://localhost/api/",
  },
  prod: {
    apiBaseURI: "http://localhost/api/",
  },
};

let config;
switch (process.env.VUE_APP_CONFIG) {
  case "local":
    config = index.local;
    break;
  case "dev":
    config = index.dev;
    break;
  case "prod":
    config = index.prod;
    break;
  default:
    config = index.local;
}

export default Object.freeze(config);
