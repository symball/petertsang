
const protocol = (process.env.VUE_APP_SECURE_PROTOCOL === '1') ? 'https' : 'http';
const port = process.env.VUE_APP_FRONTEND_PORT ? `:${process.env.VUE_APP_FRONTEND_PORT}` : '';

export const version = process.env.VUE_APP_VERSION || 'dev';
export const siteUrl = `${protocol}://${process.env.VUE_APP_FRONTEND_DOMAIN}${port}`;
export const apiBaseUrl = (`${process.env.VUE_APP_API_HOST}` || 'https://localhost:3000/api/');
export const imageBaseUrl = (process.env.VUE_APP_IMAGE_HOST || '/photo/');
export const isProduction = process.env.VUE_APP_ENV === 'production';
export const loggingEnabled = !!process.env.VUE_APP_LOGGING;
export const actionPollInterval = process.env.VUE_APP_ACTION_POLL_INTERVAL || 5000;
