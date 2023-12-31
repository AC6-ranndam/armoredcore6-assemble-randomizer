import i18n from 'sveltekit-i18n';
const config = ({
  loaders: [
    {
      locale: 'en',
      key: 'common',
      loader: async () => (
        await import('./en/common.json')
      ).default,
    },
    {
      locale: 'ja',
      key: 'common',
      loader: async () => (
        await import('./ja/common.json')
      ).default,
    },
  ],
});
const { t, locale, locales, loading, loadTranslations } = new i18n(config);

export { t, locale, locales, loading, loadTranslations };