/* eslint-disable prefer-destructuring */
export const INTELX_DOCS_URL = "https://intelx.readthedocs.io/en/latest/";
export const PYINTELX_GH_URL =
  "https://github.com/khulnasoft/pyintelx";
export const INTELX_TWITTER_ACCOUNT = "intel_x";

// env variables
export const VERSION = process.env.REACT_APP_INTELX_VERSION;
export const PUBLIC_URL = process.env.PUBLIC_URL;

// runtime env config
export const RECAPTCHA_SITEKEY = window.$env
  ? window.$env.RECAPTCHA_SITEKEY
  : "";
