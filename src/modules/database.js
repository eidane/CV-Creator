// Database Manager Module
const Database = require('../utils/database');

class DatabaseManager {
  constructor() {
    this.db = new Database();
  }

  getDatabase() {
    return this.db;
  }

  // Proxy methods to the database instance
  getUserById(id, callback) {
    return this.db.getUserById(id, callback);
  }

  getAllUsers(callback) {
    return this.db.getAllUsers(callback);
  }

  createUser(userData, callback) {
    return this.db.createUser(userData, callback);
  }

  getProfilesByUserId(userId, callback) {
    return this.db.getProfilesByUserId(userId, callback);
  }

  createProfile(profileData, callback) {
    return this.db.createProfile(profileData, callback);
  }
}

module.exports = DatabaseManager;