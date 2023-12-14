'use strict';

/**
 * Lifecycle callbacks for the `Permission` model.
 */

module.exports = {
  collectionName: 'admin_permissions',
  info: {
    name: 'Permission',
    description: '',
    singularName: 'permission',
    pluralName: 'permissions',
    displayName: 'Permission',
  },
  options: {},
  pluginOptions: {
    'content-manager': {
      visible: true,
    },
    'content-type-builder': {
      visible: true,
    },
  },
  attributes: {
    action: {
      type: 'string',
      minLength: 1,
      configurable: false,
      required: true,
    },
    actionParameters: {
      type: 'json',
      configurable: false,
      required: false,
      default: {},
    },
    subject: {
      type: 'string',
      minLength: 1,
      configurable: false,
      required: false,
    },
    properties: {
      type: 'json',
      configurable: false,
      required: false,
      default: {},
    },
    conditions: {
      type: 'json',
      configurable: false,
      required: false,
      default: [],
    },
    role: {
      configurable: false,
      type: 'relation',
      relation: 'manyToOne',
      inversedBy: 'permissions',
      target: 'admin::role',
    },
  },
};
