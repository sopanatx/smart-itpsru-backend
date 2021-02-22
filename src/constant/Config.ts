export const ApiConfig = () => {
  return {
    IS_DEBUG: process.env.IS_DEBUG,
    API_KEY: process.env.API_KEY,
    APP_VERSION: process.env.APP_VERSION,
    APP_VERSIONCODE: process.env.APP_VERSIONCODE,
  };
};
