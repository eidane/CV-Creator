// Main module loader for CV Creator application

// Import core modules
const Database = require('../utils/database');
const UserProfileManager = require('./profile-manager');

// Initialize database instance
const database = new Database();

// Export modules for use throughout the application
module.exports = {
    database,
    UserProfileManager,
    // Export a function to create profile manager instances with database
    createProfileManager: () => new UserProfileManager(database)
};