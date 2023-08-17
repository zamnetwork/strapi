import { Write } from '@strapi/icons';

export default {
  register(app) {
    console.log('hello?')

    app.addMenuLink({
      to: `/content-manager/`,
      icon: Write,
      intlLabel: {
        id: `plugins.content-manager`,
        defaultMessage: 'Content manager',
      },
      permissions: [],
      async Component() {
        const component = await import(/* webpackChunkName: "content-manager" */ './pages/App');

        return component;
      },
    });

    app.registerPlugin({
      id: 'content-manager',
      name: 'Content Manager',
    });
  },

  bootstrap() {
    console.log('CM boot')
  },
};
