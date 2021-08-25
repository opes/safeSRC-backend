import pool from '../utils/pool.js';

export default class Category {
  id;
  category;

  constructor(row) {
    this.id = row.id;
    this.category = row.category;
  }

  static async insert({ category }) {
    const { rows } = await pool.query(
      `INSERT INTO categories (category)
            VALUES ($1)
            RETURNING *`,
      [category]
    );

    return new Category(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM categories WHERE id=$1', [id]);

    return new Category(rows[0]);
  }
}
