import '@strapi/types';

import { register } from './register';
import contentTypes from './content-types';

interface ReleaseDocumentRecord {
  id: number;
  contentTypeUid: string;
}

interface AttachDocumentsToReleaseArgs {
  releaseId: number;
  documentsToPublsih: ReleaseDocumentRecord[];
  documentsToUnpublish: ReleaseDocumentRecord[];
}

// async function attachDocumentsToRelease({
//   releaseId,
//   documentsToPublsih = [],
//   documentsToUnpublish = [],
// }: AttachDocumentsToReleaseArgs) {
//   const publishDocs = documentsToPublsih.map((document: ReleaseDocumentRecord) => ({
//     id: document.id,
//     __type: document.contentTypeUid,
//     __pivot: { field: 'documentsToPublish' },
//   }));

//   const unpublishDocs = documentsToUnpublish.map((document: ReleaseDocumentRecord) => ({
//     id: document.id,
//     __type: document.contentTypeUid,
//     __pivot: { field: 'documentsToUnpublish' },
//   }));

//   // TODO: My test is replacing the relations on each update instead of appending to them
//   // No connect for polymorphic relation
//   const result = await strapi.entityService.update('plugin::releases.release', releaseId, {
//     data: {
//       // @ts-expect-error plop
//       documentsToPublish: publishDocs,
//       documentsToUnpublish: unpublishDocs,
//     },
//     // populate: '*',
//     // @ts-expect-error plop 2
//     populate: { documentsToPublish: { count: true }, documentsToUnpublish: { fields: ['id'] } },
//   });

//   console.log(JSON.stringify(result, null, 2));

//   return result;
// }

/**
 * CM EditView Page
 */
async function findManyForDocumentRecord(documentRecord: ReleaseDocumentRecord) {
  /**
   * Find all releases containing a document's record..id
   */
  const releases = await strapi.entityService.findMany('plugin::releases.release', {
    // Would also need to filter by contentTypeUid since records could have the same id but different content types
    populate: {
      documents: {
        filters: { contentType: documentRecord.contentTypeUid },
        populate: { record: { filters: { id: documentRecord.id } } },
      },
    },
  });

  console.log(JSON.stringify(releases, null, 2));

  return releases;
}

async function findMany() {
  /**
   * Find all releases containing a document's record..id
   */
  const releases = await strapi.entityService.findMany('plugin::releases.release', {
    populate: { documents: { populate: { record: true } } },
  });

  console.log(JSON.stringify(releases, null, 2));

  return releases;
}

/**
 * ReleaseList Page
 */
async function findManyWithDocumentRecordCount() {
  /**
   * Find all releases containing a document's record..id
   */
  const releases = await strapi.db.query('plugin::releases.release').findMany({
    populate: { documents: { count: true } },
  });

  console.log(JSON.stringify(releases, null, 2));

  return releases;
}

/**
 * ReleaseShow Page, CM ListView Page
 */
async function findOneWithDocumentRecordCount(releaseId: number) {
  /**
   * Find all releases containing a document's record..id
   */
  const release = await strapi.db.query('plugin::releases.release').findOne({
    where: { id: releaseId },
    populate: { documents: { count: true } },
  });

  console.log(JSON.stringify(release, null, 2));

  return release;
}

async function findOneForLocale(releaseId: number, locale: string) {
  const releases = await strapi.entityService.findOne('plugin::releases.release', releaseId, {
    // Would also need to filter by contentTypeUid since records could have the same id but different content types
    populate: {
      documents: {
        populate: { record: { filters: { locale } } },
      },
    },
  });

  console.log(JSON.stringify(releases, null, 2));

  return releases;
}

async function attachDocumentsToRelease({
  releaseId,
  documentRecord,
  action,
}: {
  releaseId: number;
  documentRecord: ReleaseDocumentRecord;
  action: 'publish' | 'unpublish';
}) {
  /**
   * First we would have to fetch the release, check the document doesn't already exist,
   * if it doesn't we create it and connect it to the release
   */
  const releaseDoc = await strapi.entityService.create('plugin::releases.release-document', {
    data: {
      action,
      contentType: documentRecord.contentTypeUid,
      record: {
        id: documentRecord.id,
        __type: documentRecord.contentTypeUid,
        __pivot: { field: 'record' },
      },
      releases: { connect: [releaseId] },
    },
    populate: '*',
  });

  console.log(JSON.stringify(releaseDoc, null, 2));
  const result = await strapi.entityService.update('plugin::releases.release', releaseId, {
    data: {
      // @ts-expect-error plop
      documents: { connect: [releaseDoc.id] },
    },
    populate: '*',
  });
  console.log(JSON.stringify(result, null, 2));
  return result;
}

const mockToPublish = [
  { id: 2, contentTypeUid: 'api::category.category' },
  { id: 3, contentTypeUid: 'api::category.category' },
  { id: 1, contentTypeUid: 'api::country.country' },
];

const mockToUnpublish = [
  { id: 2, contentTypeUid: 'api::country.country' },
  { id: 1, contentTypeUid: 'api::country.country' },
];

export default {
  register,
  contentTypes,
  async bootstrap() {
    /**
     * Attach documents for test 1
     */
    // await attachDocumentsToRelease({
    //   releaseId: 1,
    //   documentsToPublsih: mockToPublish,
    //   documentsToUnpublish: mockToUnpublish,
    // });

    /**
     * Attach documents for test 2
     */
    for (const documentRecord of mockToPublish) {
      await attachDocumentsToRelease({
        releaseId: 2,
        documentRecord,
        action: 'publish',
      });
    }

    for (const documentRecord of mockToUnpublish) {
      await attachDocumentsToRelease({
        releaseId: 1,
        documentRecord,
        action: 'unpublish',
      });
    }

    // await findManyForDocumentRecord({ id: 1, contentTypeUid: 'api::country.country' });
    // await findManyWithDocumentRecordCount();
    // await findOneWithDocumentRecordCount(1);
    await findMany();
    await findOneForLocale(1, 'en');
  },
};
