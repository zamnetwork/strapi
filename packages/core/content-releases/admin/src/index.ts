import { prefixPluginTranslations } from '@strapi/helper-plugin';

// eslint-disable-next-line import/no-default-export
export default {
  register() {
    // TODO: Remove when we actually do stuff...
    // eslint-disable-next-line
    console.log('Releases admin loaded...');
  },
  async registerTrads({ locales }: { locales: string[] }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, 'releases'),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
