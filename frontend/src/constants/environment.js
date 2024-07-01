/* eslint-disable prefer-destructuring */
export const THREATMATRIX_DOCS_URL = "https://threatmatrix.readthedocs.io/en/latest/";
export const PYTHREATMATRIX_GH_URL =
  "https://github.com/khulnasoft/pythreatmatrix";
export const THREATMATRIX_TWITTER_ACCOUNT = "threat_matrix";

// env variables
export const VERSION = process.env.REACT_APP_THREATMATRIX_VERSION;
export const PUBLIC_URL = process.env.PUBLIC_URL;

// runtime env config
export const RECAPTCHA_SITEKEY = window.$env
  ? window.$env.RECAPTCHA_SITEKEY
  : "";
