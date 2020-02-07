/* eslint-disable no-underscore-dangle */
import {expect, fx, request, resources, apiPaths, removeTimestamps, server} from '../../testHelper';
import {initialUserDetails, adminSignedHeaders} from '../authenticationHelper';

import Brand from '../../src/api/models/Brand';

const {brands} = fx;

let app;
const offset = 0;
const limit = 20;

describe('***** ALL BRANDS TESTS *****', () => {
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

    describe('GET /admin/brands', () => {
      beforeEach(async () => {
        await Brand._bulkInsert(brands);
      });

      afterEach(async () => {
        await Brand.deleteAll();
      });

      it('Returns a list of brands', async () => {
        const requestPath = `${apiPaths.v1.adminBasePath}/${resources.brands}?offset=${offset}&limit=${limit}`;
        const response = await request(app)
          .get(requestPath)
          .set(authorization)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);

        expect(response.body.brands.length).to.eq(brands.length);
      });
    });

    describe('GET /v1/admin/brands/{brand_id}', () => {
      const [selectedBrand] = brands;

      beforeEach(async () => {
        await Brand._bulkInsert(brands);
      });

      afterEach(async () => {
        await Brand.deleteAll();
      });

      it('Returns a single json object of a brand', async () => {
        const requestPath = `${apiPaths.v1.adminBasePath}/${resources.brands}/${selectedBrand.id}`;

        const response = await request(app)
          .get(requestPath)
          .set(authorization)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);

        removeTimestamps(response.body);
        expect(response.body).to.eql(selectedBrand);
      });
    });

    describe('POST /v1/admin/brands', () => {
      const [newbrand] = brands;

      beforeEach(async () => {
        await Brand.deleteAll();
      });

      afterEach(async () => {
        await Brand.deleteAll();
      });

      it('Creates a single brand', async () => {
        const requestPath = `${apiPaths.v1.adminBasePath}/${resources.brands}`;

        const response = await request(app)
          .post(requestPath)
          .set(authorization)
          .send(newbrand)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201);

        removeTimestamps(response.body);
        expect(response.body).to.eql(newbrand);
      });
    });

    describe('PUT /v1/admin/brand/{brand_id}', () => {
      const [selectedBrand] = brands;

      beforeEach(async () => {
        await Brand._bulkInsert(brands);
      });

      afterEach(async () => {
        await Brand.deleteAll();
      });

      it('Updates a single Brand', async () => {
        const requestPath = `${apiPaths.v1.adminBasePath}/${resources.brands}/${selectedBrand.id}`;
        const updatedbrand = selectedBrand;
        const newbrandName = 'New brand name';
        updatedbrand.name = newbrandName;

        const response = await request(app)
          .put(requestPath)
          .set(authorization)
          .send(updatedbrand)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);

        expect(response.body.name).to.eq(newbrandName);
      });
    });

    describe('DELETE /v1/admin/brands/{brand_id}', () => {
      const [selectedBrand] = brands;

      before(async () => {
        await Brand._bulkInsert(brands);
      });

      after(async () => {
        await Brand.deleteAll();
      });

      it('Deletes a single brand', async () => {
        const requestPath = `${apiPaths.v1.adminBasePath}/${resources.brands}/${selectedBrand.id}`;

        const response = await request(app)
          .delete(requestPath)
          .set(authorization)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);

        expect(response.body.deleted).to.eq(true);
      });

      it('Fails to delete an unexisting brand', async () => {
        const requestPath = `${apiPaths.v1.adminBasePath}/${resources.brands}/${selectedBrand.id}`;
        
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
