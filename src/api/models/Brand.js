import BaseModel from './BaseModel';

export default class Company extends BaseModel {
	static get tableName() {
		return 'brands';
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

