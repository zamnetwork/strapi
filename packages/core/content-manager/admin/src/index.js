import { Write } from '@strapi/icons';

import {
  INJECT_COLUMN_IN_TABLE,
  MUTATE_COLLECTION_TYPES_LINKS,
  MUTATE_EDIT_VIEW_LAYOUT,
  MUTATE_SINGLE_TYPES_LINKS,
} from './exposedHooks';

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

    this.createHook(INJECT_COLUMN_IN_TABLE);
    this.createHook(MUTATE_COLLECTION_TYPES_LINKS);
    this.createHook(MUTATE_SINGLE_TYPES_LINKS);
    this.createHook(MUTATE_EDIT_VIEW_LAYOUT);
  },
};
