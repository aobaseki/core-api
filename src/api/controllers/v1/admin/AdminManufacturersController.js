import BaseController from '../../BaseController';

class AdminManufacturersController extends BaseController {
  tableName() {
    return 'manufacturers';
  }

  _identifierValue(swagger) {
    return swagger.params.manufacturer_id.value;
  }
}

const controller = new AdminManufacturersController();

module.exports = {
  show: controller.show.bind(controller),
  index: controller.index.bind(controller),
  update: controller.update.bind(controller),
  destroy: controller.destroy.bind(controller),
  create: controller.create.bind(controller),
};
