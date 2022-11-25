const index = {
  local: {
    apiBaseURI: "http://localhost:3000/api/",
  },
  dev: {
    apiBaseURI: "http://localhost:3000/api/",
  },
  prod: {
    apiBaseURI: "http://localhost:3000/api/",
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
