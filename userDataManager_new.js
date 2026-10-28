// User Data Manager for CV Project (Browser version)
class UserDataManager {
    constructor() {
        this.userDataPath = 'userData';
        this.templatesPath = 'templates';
    }

    // Create a new user profile - in browser, we'll use localStorage
    createUserProfile(userId, userData) {
        try {
            const users = this.getAllUsers();
            if (!users.includes(userId)) {
                // In a real browser implementation, we would need to use IndexedDB or localStorage
                const userProfiles = JSON.parse(localStorage.getItem('userProfiles') || '{}');
                userProfiles[userId] = userData;
                localStorage.setItem('userProfiles', JSON.stringify(userProfiles));
                
                return { success: true, message: 'User profile created successfully' };
            } else {
                return { success: false, message: 'User already exists' };
            }
        } catch (error) {
            return { success: false, message: `Error creating user profile: ${error.message}` };
        }
    }

    // Get user profile data
    getUserProfile(userId) {
        try {
            const userProfiles = JSON.parse(localStorage.getItem('userProfiles') || '{}');
            return userProfiles[userId] || null;
        } catch (error) {
            console.error('Error reading user profile:', error);
            return null;
        }
    }

    // Get all users
    getAllUsers() {
        try {
            const userProfiles = JSON.parse(localStorage.getItem('userProfiles') || '{}');
            return Object.keys(userProfiles);
        } catch (error) {
            console.error('Error getting users:', error);
            return [];
        }
    }

    // Process template with user data - simple replacement
    processTemplate(templateName, userData) {
        try {
            // In a browser environment, we'd need to load the template content differently
            // For this demo, let's assume we have access to templates through other means
            
            // Simulate getting template from a file or embedded content
            const templateContent = this.getTemplateContent(templateName);
            
            if (!templateContent) {
                throw new Error(`Template ${templateName} not found`);
            }
            
            let processedContent = templateContent;
            
            // Replace placeholders with user data
            for (const [key, value] of Object.entries(userData)) {
                const placeholder = `{{${key}}}`;
                const regex = new RegExp(placeholder, 'g');
                processedContent = processedContent.replace(regex, value);
            }
            
            return processedContent;
        } catch (error) {
            console.error('Error processing template:', error);
            throw new Error(`Template processing failed: ${error.message}`);
        }
    }

    // Get template content - this would need to be implemented based on how templates are stored
    getTemplateContent(templateName) {
        // This is a placeholder implementation
        switch(templateName) {
            case 'TemplateFile':
                return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>{{title}}</title><link rel="stylesheet" href="style.css"></head><body><h1>{{name}}</h1><p>{{email}}</p></body></html>';
            default:
                return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Hello World</title><link rel="stylesheet" href="style.css"></head><body><h1>Hello World</h1></body></html>';
        }
    }

    // Get available templates - for now, we'll hardcode them
    getAvailableTemplates() {
        return ['TemplateFile'];
    }

    // Save data to localStorage
    saveUserData(userId, fileName, data) {
        try {
            const userKey = `user_${userId}_${fileName}`;
            localStorage.setItem(userKey, JSON.stringify(data));
            return { success: true, message: 'Data saved successfully' };
        } catch (error) {
            return { success: false, message: `Error saving data: ${error.message}` };
        }
    }

    // Load data from localStorage
    loadUserData(userId, fileName) {
        try {
            const userKey = `user_${userId}_${fileName}`;
            const data = localStorage.getItem(userKey);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading user data:', error);
            return null;
        }
    }

    // Simulate PDF generation - in a real app, this would use jsPDF or similar
    generatePDF(templateName, userData, outputFileName) {
        try {
            const processedHTML = this.processTemplate(templateName, userData);
            
            return {
                success: true,
                htmlContent: processedHTML,
                message: `Template processed for PDF generation. Ready to convert to PDF with filename: ${outputFileName}`
            };
        } catch (error) {
            return { 
                success: false, 
                message: `PDF generation failed: ${error.message}` 
            };
        }
    }
}

// Export the class for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserDataManager;
}