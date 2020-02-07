import BaseModel from './BaseModel';

export default class Manufacturer extends BaseModel {
	static get tableName() {
		return 'manufacturers';
	}

	static get primaryKeyName() {
		return 'id';
	}

	static get fieldNames() {
		return ['id', 'name'];
	}

  static get softDelete() {
    return true;
  }
}
