import BaseModel from './BaseModel';

export default class Category extends BaseModel {
	static get tableName() {
		return 'categories';
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

