'use strict';

const { generateCompany, generateBook } = require('./utils/generators');

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    const bookCount = await strapi.entityService.count('api::book.book', {});
    if (!bookCount) {
      strapi.log.info('Generating fake books...');
      const books = Array.from({ length: 1000 }, generateBook);
      for (const book of books) {
        await strapi.entityService.create('api::book.book', { data: book });
      }
    }

    const companyCount = await strapi.entityService.count('api::company.company', {});
    if (!companyCount) {
      strapi.log.info('Generating fake companies...');
      const companies = Array.from({ length: 1000 }, generateCompany);
      for (const company of companies) {
        await strapi.entityService.create('api::company.company', { data: company });
      }
    }
  },

  /**
   * An asynchronous destroy function that runs before
   * your application gets shut down.
   *
   * This gives you an opportunity to gracefully stop services you run.
   */
  destroy({ strapi }) {},
};
