const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs-extra');
const { app } = require('electron');

class Database {
  constructor() {
    this.dbPath = path.join(app.getPath('userData'), 'cv-creator.db');
    this.db = null;
    this.init();
  }

  init() {
    // Ensure userData directory exists
    const userDataDir = app.getPath('userData');
    if (!fs.existsSync(userDataDir)) {
      fs.mkdirSync(userDataDir, { recursive: true });
    }

    // Initialize database
    this.db = new sqlite3.Database(this.dbPath, (err) => {
      console.log('Database path:', this.dbPath);
      if (err) {
        console.error('Error opening database:', err);
      } else {
        console.log('Connected to SQLite database');
        this.createTables();
      }
    });
  }

  createTables() {
    // Create users table
    console.log('Creating tables if they do not exist...');
    const createUserTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT,
        mobile TEXT,
        address TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create profiles table
    const createProfilesTable = `
      CREATE TABLE IF NOT EXISTS profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        profile_summary TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id),
      )
    `;

    // Create skills table
    const createSkillsTable = `
      CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        proficiency_level TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create skills_profiles table
    const skillsProfilesTable = `
      CREATE TABLE IF NOT EXISTS skills_profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        profile_id INTEGER,
        skill_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (profile_id) REFERENCES profiles (id),
        FOREIGN KEY (skill_id) REFERENCES skills (id),
        unique (profile_id, skill_id)
      )
    `;

    
    // Create education table
    const createEducationTable = `
      CREATE TABLE IF NOT EXISTS education (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        institution TEXT NOT NULL,
        degree TEXT NOT NULL,
        start_date TEXT,
        end_date TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (institution, degree, start_date, end_date)
      )
    `;

    // Create profiles_education table
    const createProfilesEducationTable = `
      CREATE TABLE IF NOT EXISTS profiles_education (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        education_id INTEGER,
        profile_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (education_id) REFERENCES education (id),
        FOREIGN KEY (profile_id) REFERENCES profiles (id),
        UNIQUE (education_id, profile_id)
      )
    `;

    

     // Create experience table
    const createExperienceTable = `
      CREATE TABLE IF NOT EXISTS experience (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        company TEXT NOT NULL,
        position TEXT NOT NULL,
        start_date TEXT,
        end_date TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (company, position, start_date, end_date)
      )
    `;
    // create profiles_experience table
    const createProfilesExperienceTable = `
      CREATE TABLE IF NOT EXISTS profiles_experience (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        experience_id INTEGER,
        profile_id INTEGER, 
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (experience_id) REFERENCES experience (id),
        FOREIGN KEY (profile_id) REFERENCES profiles (id),
        UNIQUE (experience_id, profile_id)
      )
    `;
   


    // Create templates table
    const createTemplatesTable = `
      CREATE TABLE IF NOT EXISTS templates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        template_html TEXT NOT NULL,
        template_css TEXT,
        variables TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    this.db.run(createUserTable, (err) => {
      if (err) {
        console.error('Error creating users table:', err);
      }
    });

    this.db.run(createProfilesTable, (err) => {
      if (err) {
        console.error('Error creating profiles table:', err);
      }
    });

    this.db.run(createTemplatesTable, (err) => {
      if (err) {
        console.error('Error creating templates table:', err);
      }
    });
    this.db.run(createSkillsTable, (err) => {
      if (err) {
        console.error('Error creating skills table:', err);
      }
    });
    this.db.run(skillsProfilesTable, (err) => {
      if (err) {
        console.error('Error creating skills_profiles table:', err);
      }
    });
    this.db.run(createEducationTable, (err) => {
      if (err) {
        console.error('Error creating education table:', err);
      }
    });
    this.db.run(createProfilesEducationTable, (err) => {
      if (err) {
        console.error('Error creating profiles_education table:', err);
      } 
    });
    this.db.run(createExperienceTable, (err) => {
      if (err) {
        console.error('Error creating experience table:', err);
      }
    });
    this.db.run(createProfilesExperienceTable, (err) => {
      if (err) {
        console.error('Error creating profiles_experience table:', err);
      }
    });


  }

  createUser(userData, callback) {
    const sql = 'INSERT INTO users (name, email, mobile, address) VALUES (?, ?, ?, ?)';
    this.db.run(sql, [userData.name, userData.email, userData.mobile, userData.address], function(err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id: this.lastID, ...userData });
      }
    });
  }

  getUserById(id, callback) {
    const sql = 'SELECT * FROM users WHERE id = ?';
    this.db.get(sql, [id], (err, row) => {
      callback(err, row);
    });
  }

  getAllUsers(callback) {
    const sql = 'SELECT * FROM users ORDER BY created_at DESC';
    this.db.all(sql, [], (err, rows) => {
      callback(err, rows);
    });
  }

  // Profile operations
  createProfile(profileData, callback) {
    const sql = 'INSERT INTO profiles (user_id, profile_data, template_used) VALUES (?, ?, ?)';
    this.db.run(sql, [profileData.user_id, JSON.stringify(profileData.profile_data), profileData.template_used], function(err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id: this.lastID, ...profileData });
      }
    });
  }

  getProfileById(id, callback) {
    const sql = 'SELECT * FROM profiles WHERE id = ?';
    this.db.get(sql, [id], (err, row) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, {
          ...row,
          profile_data: JSON.parse(row.profile_data)
        });
      }
    });
  }

  getProfilesByUserId(userId, callback) {
    const sql = 'SELECT * FROM profiles WHERE user_id = ? ORDER BY created_at DESC';
    this.db.all(sql, [userId], (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        const parsedRows = rows.map(row => ({
          ...row,
          profile_data: JSON.parse(row.profile_data)
        }));
        callback(null, parsedRows);
      }
    });
  }

  // Template operations
  createTemplate(templateData, callback) {
    const sql = 'INSERT INTO templates (name, description, template_html, template_css, variables) VALUES (?, ?, ?, ?, ?)';
    this.db.run(sql, [templateData.name, templateData.description, templateData.template_html, templateData.template_css, JSON.stringify(templateData.variables)], function(err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id: this.lastID, ...templateData });
      }
    });
  }

  getAllTemplates(callback) {
    const sql = 'SELECT * FROM templates ORDER BY created_at DESC';
    this.db.all(sql, [], (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        const parsedRows = rows.map(row => ({
          ...row,
          variables: JSON.parse(row.variables)
        }));
        callback(null, parsedRows);
      }
    });
  }

  // Migration from existing JSON files
  migrateFromJSON(jsonData, callback) {
    // This would be called during first run to migrate existing data
    // Implementation depends on the exact structure of your JSON data
    console.log('Migration from JSON data initiated:', jsonData);
    callback(null, 'Migration completed');
  }

  // Close database connection
  close() {
    if (this.db) {
      this.db.close();
    }
  }
}

module.exports = Database;