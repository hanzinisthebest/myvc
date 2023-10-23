var dbConfig = {
  synchronize: false,
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: ['dist/migrations'],
  },
};
// "typeorm":"cross-env NODE_ENV=development npm run build && npx typeorm --d dist/db/data-source.js",
// "migration:generate": "npm run typeorm -- migration:generate",
// "migration:run":"npm run typeorm -- migration:run",
// "migration:revert":"npm run typeorm -- migration:revert"
switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'sqlite', // Set the correct type
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite', // Set the correct type
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
    });
    break;
  case 'production':
    // Add production database configuration here
    break;
  default:
    throw new Error('unknown environment');
}

module.exports = dbConfig;
//  export default dbConfig;
