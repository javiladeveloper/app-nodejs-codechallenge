export const EnvConfig = {
    port: process.env.PORT || 3000,
    whiteList: process.env.WHITE_LIST?.split(',') || ['*'],
  }
  