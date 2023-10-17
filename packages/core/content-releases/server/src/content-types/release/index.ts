export default {
  schema: {
    kind: 'collectionType',
    collectionName: 'strapi_releases',
    info: {
      name: 'Release',
      description: '',
      singularName: 'release',
      pluralName: 'releases',
      displayName: 'Release',
    },
    pluginOptions: {
      // 'content-manager': {
      //   visible: false,
      // },
      // 'content-type-builder': {
      //   visible: false,
      // },
    },
    attributes: {
      name: {
        type: 'string',
      },
      releasedAt: {
        type: 'datetime',
      },
      // Test 1
      // documentsToPublish: {
      //   type: 'relation',
      //   relation: 'morphToMany',
      //   configurable: false,
      // },
      // documentsToUnpublish: {
      //   type: 'relation',
      //   relation: 'morphToMany',
      //   configurable: false,
      // },
      // Test 2
      documents: {
        type: 'relation',
        relation: 'oneToMany',
        target: 'plugin::releases.release-document',
        mappedBy: 'releases'
      },
    },
  },
};
