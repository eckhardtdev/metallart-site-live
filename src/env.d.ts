/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
import { Alpine as AlpineType } from 'alpinejs'

declare global {
  var Alpine: AlpineType
}

interface ImportMetaEnv {
  readonly PUBLIC_ENV: string
  readonly STORYBLOK_SPACE: string
  readonly STORYBLOK_TOKEN: string
  readonly STORYBLOK_PERSONAL_TOKEN: string
  readonly PUBLIC_STORYBLOK_VERSION: string
  readonly PUBLIC_LANGUAGES: string
  readonly PUBLIC_DEFAULT_LANGUAGE: string
  readonly SENTRY_AUTH_TOKEN: string
  readonly SITE_SLUG: string
  readonly SITE_URL: string
  readonly PUBLIC_SMTP_VERSION: string
  readonly SMTP_VERSION: string
  readonly SMTP_FROM: string
  readonly SMTP_NOTIFICATION: string
  readonly SMTP_REPLY: string
  readonly SMTP_HOST: string
  readonly SMTP_PORT: string
  readonly SMTP_USER: string
  readonly SMTP_PASS: string
  readonly SMTP_TEST_FROM: string
  readonly SMTP_TEST_NOTIFICATION: string
  readonly SMTP_TEST_REPLY: string
  readonly SMTP_TEST_HOST: string
  readonly SMTP_TEST_PORT: string
  readonly SMTP_TEST_USER: string
  readonly SMTP_TEST_PASS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
