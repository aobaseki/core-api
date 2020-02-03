/* eslint-disable no-underscore-dangle */
import {expect, fx, request, resources, apiPaths, removeTimestamps, server} from '../../testHelper';
import {initialUserDetails, adminSignedHeaders} from '../authenticationHelper';

import Category from '../../src/api/models/Category';

const {categories} = fx;

let app;
const offset = 0;
const limit = 20;

describe('***** ALL CATEGORY TESTS *****', () => {
  before(async () => {
    app = await server;
  });

  after(async () => {});

  describe('*** Admin Tests ***', () => {
    let authorization;

    before(async () => {
      const userDetails = Object.assign({}, initialUserDetails);
      authorization = adminSignedHeaders(userDetails);
    });

    describe('GET /admin/categories', () => {
      beforeEach(async () => {
        await Category._bulkInsert(categories);
      });

      afterEach(async () => {
        await Category.deleteAll();
      });

      it('Returns a list of categories', async () => {
        const requestPath = `${apiPaths.v1.adminBasePath}/${resources.categories}?offset=${offset}&limit=${limit}`;
        const response = await request(app)
          .get(requestPath)
          .set(authorization)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);

        expect(response.body.categories.length).to.eq(categories.length);
      });
    });

    describe('GET /v1/admin/categories/{category_id}', () => {
      const [selectedCategory] = categories;

      beforeEach(async () => {
        await Category._bulkInsert(categories);
      });

      afterEach(async () => {
        await Category.deleteAll();
      });

      it('Returns a single json object of a category', async () => {
        const requestPath = `${apiPaths.v1.adminBasePath}/${resources.categories}/${selectedCategory.id}`;

        const response = await request(app)
          .get(requestPath)
          .set(authorization)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);

        removeTimestamps(response.body);
        expect(response.body).to.eql(selectedCategory);
      });
    });

    describe('POST /v1/admin/categories', () => {
      const [newcategory] = categories;

      beforeEach(async () => {
        await Category.deleteAll();
      });

      afterEach(async () => {
        await Category.deleteAll();
      });

      it('Creates a single category', async () => {
        const requestPath = `${apiPaths.v1.adminBasePath}/${resources.categories}`;

        const response = await request(app)
          .post(requestPath)
          .set(authorization)
          .send(newcategory)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201);

        removeTimestamps(response.body);
        expect(response.body).to.eql(newcategory);
      });
    });

    describe('PUT /v1/admin/categories/{category_id}', () => {
      const [selectedCategory] = categories;

      beforeEach(async () => {
        await Category._bulkInsert(categories);
      });

      afterEach(async () => {
        await Category.deleteAll();
      });

      it('Updates a single Category', async () => {
        const requestPath = `${apiPaths.v1.adminBasePath}/${resources.categories}/${selectedCategory.id}`;
        const updatedcategory = selectedCategory;
        const newcategoryName = 'New category name';
        updatedcategory.name = newcategoryName;

        const response = await request(app)
          .put(requestPath)
          .set(authorization)
          .send(updatedcategory)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);

        expect(response.body.name).to.eq(newcategoryName);
      });
    });

    describe('DELETE /v1/admin/categories/{category_id}', () => {
      const [selectedCategory] = categories;

      before(async () => {
        await Category._bulkInsert(categories);
      });

      after(async () => {
        await Category.deleteAll();
      });

      it('Deletes a single category', async () => {
        const requestPath = `${apiPaths.v1.adminBasePath}/${resources.categories}/${selectedCategory.id}`;

        const response = await request(app)
          .delete(requestPath)
          .set(authorization)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);

        expect(response.body.deleted).to.eq(true);
      });

      it('Fails to delete an unexisting category', async () => {
        const requestPath = `${apiPaths.v1.adminBasePath}/${resources.categories}/${selectedCategory.id}`;

        const response = await request(app)
          .delete(requestPath)
          .set(authorization)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404);

        expect(response.body.code).to.eq(404);
        expect(response.body.error).to.eq('Object not found');
      });
    });
  });
});
