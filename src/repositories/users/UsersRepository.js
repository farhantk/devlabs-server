const db = require('../../configs/databases/postgres/db');
const { hashPassword } = require('../../utils/hashPassword');

class UsersRepository {
  async registerUser(data) {
    const { email, password, profile_name, phonenumber, role } = data;

    const hashedPassword = await hashPassword(password, 10);

    const query = {
      text: `
        INSERT INTO users (email, password, profile_name, phonenumber, role)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id`,
      values: [email, hashedPassword, profile_name, phonenumber, role],
    };

    const result = await db.query(query);

    return result.rows[0];
  }

  async getUserByEmailAndRole(data) {
    const { email, role } = data;

    const query = {
      text: 'SELECT * FROM users WHERE email = $1 AND role = $2 LIMIT 1',
      values: [email, role],
    };

    const result = await db.query(query);
    return result.rows[0];
  }

  async getUserByEmail(data) {
    const { email } = data;

    const query = {
      text: 'SELECT * FROM users WHERE email = $1 LIMIT 1',
      values: [email],
    };

    const result = await db.query(query);
    return result.rows[0];
  }

  async getAllUsers() {
    const query = 'SELECT * FROM users';
    const result = await db.query(query);
    return result.rows;
  }
}

module.exports = UsersRepository;
