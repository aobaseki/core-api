import BaseModel from './BaseModel';

export default class Manufacturer extends BaseModel {
	static get tableName() {
		return 'brand';
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
