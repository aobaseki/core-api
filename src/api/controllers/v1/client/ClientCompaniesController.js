import BaseController from '../../BaseController';

class ClientCompaniesController extends BaseController {
  tableName() {
    return 'companies';
  }

  _identifierValue(swagger) {
    return swagger.params.company_id.value;
  }
}

const controller = new ClientCompaniesController();

module.exports = {
  show: controller.show.bind(controller),
  index: controller.index.bind(controller),
  update: controller.update.bind(controller),
  destroy: controller.destroy.bind(controller),
  create: controller.create.bind(controller),
};
