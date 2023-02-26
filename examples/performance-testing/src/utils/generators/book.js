const { faker } = require('@faker-js/faker');

function generateBook() {
  return {
    title: faker.lorem.words(),
    subtitle: faker.lorem.words(),
    author: faker.name.fullName(),
    publisher: faker.company.name(),
    publicationDate: faker.date.soon(10).toISOString().split('T')[0],
    isbn: faker.random.alphaNumeric(13),
    language: faker.lorem.word(),
    format: faker.lorem.word(),
    pages: faker.datatype.number(),
    dimensions: `${faker.datatype.number()} x ${faker.datatype.number()} x ${faker.datatype.number()}`,
    weight: faker.datatype.number(),
    category: faker.commerce.department(), // TODO: Use a list of categories ?
    genre: faker.music.genre(),
    subgenre: faker.music.genre(),
    edition: `${faker.datatype.number()}th Edition`,
    printing: faker.random.word(),
    series: faker.random.word(),
    seriesNumber: faker.datatype.number(),
    description: faker.lorem.paragraphs(),
    tableOfContents: faker.lorem.paragraphs(),
    price: faker.datatype.number({ min: 5, max: 50, precision: 0.01 }),
    discountPrice: faker.datatype.number({ min: 1, max: 5, precision: 0.01 }),
    currency: faker.finance.currencyCode(),
    availability: faker.datatype.boolean(),
    stock: faker.datatype.number({ min: 0, max: 100 }),
    shipping: {
      weight: faker.datatype.number(),
      dimensions: `${faker.datatype.number()} x ${faker.datatype.number()} x ${faker.datatype.number()}`,
      class: faker.lorem.word(),
      cost: faker.datatype.number({ min: 0, max: 10, precision: 0.01 }),
      time: faker.lorem.words(),
    },
    returnPolicy: faker.lorem.paragraphs(),
    warranty: faker.lorem.paragraphs(),
    customerSupport: faker.lorem.paragraphs(),
    relatedBooks: [],
    recommendedBooks: [],
    bestseller: faker.datatype.boolean(),
    newArrival: faker.datatype.boolean(),
    topRated: faker.datatype.boolean(),
    mostViewed: faker.datatype.boolean(),
    mostSold: faker.datatype.boolean(),
    featured: faker.datatype.boolean(),
    tags: faker.lorem.words(),
    metaTitle: faker.lorem.sentence(),
    metaDescription: faker.lorem.sentence(),
    metaKeywords: [faker.lorem.word(), faker.lorem.word()].join(', '),
  };
}

module.exports = {
  generateBook,
};
