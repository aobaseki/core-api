import BaseController from '../../BaseController';

class AdminCategoryController extends BaseController {
  tableName() {
    return 'categories';
  }

  _identifierValue(swagger) {
    return swagger.params.category_id.value;
  }
}

const controller = new AdminCategoryController();

module.exports = {
  show: controller.show.bind(controller),
  index: controller.index.bind(controller),
  update: controller.update.bind(controller),
  destroy: controller.destroy.bind(controller),
  create: controller.create.bind(controller),
};
