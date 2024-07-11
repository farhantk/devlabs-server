const bcrypt = require('bcrypt');

class Command {
  constructor(db) {
    this.db = db;
  }

  async registerUser(data) {
    const { email, password, profile_name, phonenumber } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: `
        INSERT INTO users (email, password, profile_name, phonenumber)
        VALUES ($1, $2, $3, $4)
        RETURNING id`,
      values: [email, password, profile_name, phonenumber],
    };

    const result = await this.db.query(query);

    return result.rows[0];
  }

  async getUserByEmail(email) {
    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    };

    const result = await this.db.query(query);

    return result.rows[0];
  }
}