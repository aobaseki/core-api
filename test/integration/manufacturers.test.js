/* eslint-disable no-underscore-dangle */
import {expect, fx, request, resources, apiPaths, removeTimestamps, server} from '../../testHelper';
import {initialUserDetails, adminSignedHeaders} from '../authenticationHelper';

import Manufacuturer from '../../src/api/models/Manufacturer';

const {manufacturers} = fx;

let app;
const offset = 0;
const limit = 20;

describe('***** ALL MANUFACTURER TESTS *****', () => {
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

    describe('GET /admin/manufacturers', () => {
      beforeEach(async () => {
        await Manufacuturer._bulkInsert(manufacturers);
      });

      afterEach(async () => {
        await Manufacuturer.deleteAll();
      });

      console.log("WE ARE HERE");
      console.log("WE ARE HERE");
      console.log("WE ARE HERE");

      it.only('Returns a list of manufacturers', async () => {
        console.log("HOW ABOUT HERE");
        const requestPath = `${apiPaths.v1.adminBasePath}/${resources.manufacturers}?offset=${offset}&limit=${limit}`;
        
        console.log(requestPath);


        const response = await request(app)
          .get(requestPath)
          .set(authorization)
          .set('Accept', 'application/json');
          //.expect('Content-Type', /json/)
          //.expect(200);
          console.log("++++++++++++++++++++++++");
          console.log(response.body);
          console.log("++++++++++++++++++++++++");

        expect(response.body.manufacturers.length).to.eq(manufacturers.length);
      });
    });

    describe('GET /v1/admin/manufacturers/{manufacturer_id}', () => {
      const [selectedManufacturer] = manufacturers;

      beforeEach(async () => {
        await Manufacuturer._bulkInsert(manufacturers);
      });

      afterEach(async () => {
        await Manufacuturer.deleteAll();
      });

      it('Returns a single json object of a category', async () => {
        const requestPath = `${apiPaths.v1.adminBasePath}/${resources.manufacturers}/${selectedManufacturer.id}`;

        const response = await request(app)
          .get(requestPath)
          .set(authorization)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);

        removeTimestamps(response.body);
        expect(response.body).to.eql(selectedManufacturer);
      });
    });

    describe('POST /v1/admin/manufacturers', () => {
      const [newmanufacturer] = manufacturers;

      beforeEach(async () => {
        await Manufacuturer.deleteAll();
      });

      afterEach(async () => {
        await Manufacuturer.deleteAll();
      });

      it('Creates a single manufacturer', async () => {
        const requestPath = `${apiPaths.v1.adminBasePath}/${resources.manufacturers}`;

        const response = await request(app)
          .post(requestPath)
          .set(authorization)
          .send(newmanufacturer)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201);

        removeTimestamps(response.body);
        expect(response.body).to.eql(newmanufacturer);
      });
    });

    describe('PUT /v1/admin/manufacturers/{manufacturer_id}', () => {
      const [selectedManufacturer] = manufacturers;

      beforeEach(async () => {
        await Manufacuturer._bulkInsert(manufacturers);
      });

      afterEach(async () => {
        await Manufacuturer.deleteAll();
      });

      it('Updates a single Manufacturer', async () => {
        const requestPath = `${apiPaths.v1.adminBasePath}/${resources.manufacturers}/${selectedManufacturer.id}`;
        const updatedmanufacturer = selectedManufacturer;
        const newmanufacturerName = 'New manufacturer name';
        updatedmanufacturer.name = newmanufacturerName;

        const response = await request(app)
          .put(requestPath)
          .set(authorization)
          .send(updatedmanufacturer)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);

        expect(response.body.name).to.eq(newmanufacturerName);
      });
    });

    describe('DELETE /v1/admin/manufacturers/{manufacturer_id}', () => {
      const [selectedManufacturer] = manufacturers;

      before(async () => {
        await Manufacuturer._bulkInsert(manufacturers);
      });

      after(async () => {
        await Manufacuturer.deleteAll();
      });

      it('Deletes a single manufacuturer', async () => {
        const requestPath = `${apiPaths.v1.adminBasePath}/${resources.manufacturers}/${selectedManufacturer.id}`;

        const response = await request(app)
          .delete(requestPath)
          .set(authorization)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);

        expect(response.body.deleted).to.eq(true);
      });

      it('Fails to delete an unexisting manufacturer', async () => {
        const requestPath = `${apiPaths.v1.adminBasePath}/${resources.manufacturers}/${selectedManufacturer.id}`;

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
