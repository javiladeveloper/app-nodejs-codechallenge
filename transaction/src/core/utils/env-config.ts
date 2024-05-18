export const EnvConfig = {
  port: process.env.PORT || 3001,
  environment: process.env.NODE_ENV || 'development',
  whiteList: process.env.WHITE_LIST?.split(',') || ['*'],
};
