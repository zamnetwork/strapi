export default {
  schema: {
    kind: 'collectionType',
    collectionName: 'strapi_release_documents',
    info: {
      name: 'Release document',
      description: '',
      singularName: 'release-document',
      pluralName: 'release-documents',
      displayName: 'Release documents',
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
      action: {
        type: 'enumeration',
        enum: ['publish', 'unpublish'],
      },
      contentType: {
        type: 'string',
      },
      record: {
        type: 'relation',
        relation: 'morphToOne',
        configurable: false,
      },
      releases: {
        type: 'relation',
        relation: 'manyToOne',
        target: 'plugin::releases.release',
        inversedBy: 'documents',
      },
    },
  },
};
