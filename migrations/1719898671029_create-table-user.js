/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createExtension('uuid-ossp');
  pgm.createTable('users', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuid_generate_v4()'),
    },
    email: {
      type: 'varchar(255)',
      notNull: true,
    },
    password: {
      type: 'varchar(255)',
      notNull: true,
    },
    phonenumber: {
      type: 'varchar(255)',
      notNull: true,
    },
    profile_name: {
      type: 'varchar(255)',
      notNull: true,
    },
    profile_picture: {
      type: 'text',
    },
    profile_description: {
      type: 'text',
    },
    role: {
      type: 'varchar(20)',
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.addConstraint('users', 'unique_email', 'UNIQUE(email)');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('users');
  pgm.dropExtension('uuid-ossp');
};
