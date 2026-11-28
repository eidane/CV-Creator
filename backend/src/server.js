// Backend server entry point
const express = require('express');
const path = require('path');
const Database = require('./utils/database');

// Initialize database
const database = new Database();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/public')));

// API endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend server is running' });
});

// User endpoints
app.post('/api/create-user', (req, res) => {
  const userData = req.body;
  database.createUser(userData, (err, user) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json(user);
    }
  });
});
app.put('/api/update-user', (req, res) => {
  const userData = req.body;
  database.updateUser(userData, (err, user) => {
    if (err) {
      res.status(500).json({ error: err.message});
    } else {
      res.status(201).json(user);
    }
  })
})

app.get('/api/get-users', (req, res) => {
  database.getAllUsers((err, users) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(users);
    }
  });
});

app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  database.getUserById(userId, (err, user) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user);
    }
  });
});

// Profile endpoints
app.post('/api/profiles', (req, res) => {
  const profileData = req.body;
  database.createProfile(profileData, (err, profile) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json(profile);
    }
  });
});

// Update existing profile (since we have only one user)
app.put('/api/profiles', (req, res) => {
  const profileData = req.body;
  database.updateProfile(profileData, (err, profile) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(profile);
    }
  });
});

app.get('/api/profiles/:id', (req, res) => {
  const profileId = req.params.id;
  database.getProfileById(profileId, (err, profile) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!profile) {
      res.status(404).json({ error: 'Profile not found' });
    } else {
      res.json(profile);
    }
  });
});

app.get('/api/users/:userId/profiles', (req, res) => {
  const userId = req.params.userId;
  database.getProfilesByUserId(userId, (err, profiles) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(profiles);
    }
  });
});

// Language endpoints
app.post('/api/languages', (req, res) => {
  const languageData = req.body;
  database.createLanguage(languageData, (err, language) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json(language);
    }
  });
});

app.get('/api/languages', (req, res) => {
  database.getAllLanguages((err, languages) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(languages);
    }
  });
});

// Profile language endpoints
app.post('/api/profiles/:profileId/languages', (req, res) => {
  const profileId = req.params.profileId;
  const languageId = req.body.language_id;
  database.addLanguageToProfile(profileId, languageId, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json(result);
    }
  });
});

app.get('/api/profiles/:profileId/languages', (req, res) => {
  const profileId = req.params.profileId;
  database.getProfileLanguages(profileId, (err, languages) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(languages);
    }
  });
});

// Template endpoints
app.post('/api/templates', (req, res) => {
  const templateData = req.body;
  database.createTemplate(templateData, (err, template) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json(template);
    }
  });
});

app.get('/api/templates', (req, res) => {
  database.getAllTemplates((err, templates) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(templates);
    }
  });
});

// Serve the main page
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server and export for use in main process
const startServer = () => {
  return app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`);
  });
};

module.exports = { app, database, startServer };