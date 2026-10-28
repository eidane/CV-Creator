// User Data Manager for CV Project
class UserDataManager {
    constructor() {
        this.userDataPath = 'userData';
        this.templatesPath = 'templates';
    }

    // Create a new user profile
    createUserProfile(userId, userData) {
        const fs = require('fs');
        const path = require('path');
        
        try {
            const userDir = path.join(this.userDataPath, userId);
            if (!fs.existsSync(userDir)) {
                fs.mkdirSync(userDir, { recursive: true });
            }
            
            const userDataFile = path.join(userDir, 'profile.json');
            fs.writeFileSync(userDataFile, JSON.stringify(userData, null, 2));
            return { success: true, message: 'User profile created successfully' };
        } catch (error) {
            return { success: false, message: `Error creating user profile: ${error.message}` };
        }
    }

    // Get user profile data
    getUserProfile(userId) {
        const fs = require('fs');
        const path = require('path');
        
        try {
            const userDataFile = path.join(this.userDataPath, userId, 'profile.json');
            if (fs.existsSync(userDataFile)) {
                const data = fs.readFileSync(userDataFile, 'utf8');
                return JSON.parse(data);
            }
            return null;
        } catch (error) {
            console.error('Error reading user profile:', error);
            return null;
        }
    }

    // Get all users
    getAllUsers() {
        const fs = require('fs');
        const path = require('path');
        
        try {
            if (!fs.existsSync(this.userDataPath)) {
                return [];
            }
            
            const users = fs.readdirSync(this.userDataPath);
            return users.filter(user => 
                fs.statSync(path.join(this.userDataPath, user)).isDirectory()
            );
        } catch (error) {
            console.error('Error getting users:', error);
            return [];
        }
    }

    // Process template with user data
    processTemplate(templateName, userData) {
        const fs = require('fs');
        const path = require('path');
        
        try {
            const templatePath = path.join(this.templatesPath, templateName);
            if (!fs.existsSync(templatePath)) {
                throw new Error(`Template ${templateName} not found`);
            }
            
            let templateContent = fs.readFileSync(templatePath, 'utf8');
            
            // Replace placeholders with user data
            for (const [key, value] of Object.entries(userData)) {
                const placeholder = `{{${key}}}`;
                const regex = new RegExp(placeholder, 'g');
                templateContent = templateContent.replace(regex, value);
            }
            
            return templateContent;
        } catch (error) {
            console.error('Error processing template:', error);
            throw new Error(`Template processing failed: ${error.message}`);
        }
    }

    // Get available templates
    getAvailableTemplates() {
        const fs = require('fs');
        const path = require('path');
        
        try {
            if (!fs.existsSync(this.templatesPath)) {
                return [];
            }
            
            const files = fs.readdirSync(this.templatesPath);
            return files.filter(file => 
                fs.statSync(path.join(this.templatesPath, file)).isFile()
            );
        } catch (error) {
            console.error('Error getting templates:', error);
            return [];
        }
    }
}

// Export the class for use in other modules
module.exports = UserDataManager;