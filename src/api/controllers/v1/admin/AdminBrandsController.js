import BaseController from '../../BaseController';

class AdminCategoriesController extends BaseController {
  tableName() {
    return 'brands';
  }

  _identifierValue(swagger) {
    return swagger.params.category_id.value;
  }
}

const controller = new AdminCategoriesController();

module.exports = {
  show: controller.show.bind(controller),
  index: controller.index.bind(controller),
  update: controller.update.bind(controller),
  destroy: controller.destroy.bind(controller),
  create: controller.create.bind(controller),
}