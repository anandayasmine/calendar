// ========================================
// ======== ENVIRONMENT CONFIG ============
// ========================================
const appName = "next-js-calendar"
const appNameVar = "next-js-calendar"
const defaultLanguage = "en"
const currency = "$"
const cookieName = appNameVar
const LogoProject = require('@/images/logo/logo-project.svg')

const isProd = process.env.NEXT_PUBLIC_IS_PROD === "true" ? true : false
const strictLogin = false

// ================================
// ======== API CONFIG ============
// ================================

const apiURL =
  process.env.NEXT_PUBLIC_IS_PROD === "true"
    ? process.env.NEXT_PUBLIC_API_URL_PROD
    : process.env.NEXT_PUBLIC_API_URL_DEV
const apiKey = process.env.NEXT_PUBLIC_API_KEY

// ===========================
// ====== EXPORT VAR =========
// ===========================

const Config = {
  appName,
  appNameVar,
  defaultLanguage,
  currency,
  isProd,
  apiURL,
  apiKey,
  strictLogin,
  cookieName,
  LogoProject,
}

export default Config
