// User Profile Manager for CV Project
// TODO we do only have one user with a base data sett that is not editable, but used for explaining what to fill in to the data for the user. Alter this file to reflect that
// TODO We also have not implemented this properly to main file. so that will have to be done
class UserProfileManager {
    constructor() {
        this.userDataPath = 'userData';
        this.profileFileName = 'profile.json';
    }

    // Load user profile from JSON file
    async loadUserProfile(userId) {
        try {
            const fs = require('fs');
            const path = require('path');
            
            const profilePath = path.join(this.userDataPath, userId, this.profileFileName);
            
            if (!fs.existsSync(profilePath)) {
                // Return default profile if it doesn't exist
                return this.getDefaultProfile();
            }
            
            const profileData = fs.readFileSync(profilePath, 'utf8');
            return JSON.parse(profileData);
        } catch (error) {
            console.error('Error loading user profile:', error);
            // Return default profile on error
            return this.getDefaultProfile();
        }
    }

    // Save user profile to JSON file
    async saveUserProfile(userId, userData) {
        try {
            const fs = require('fs');
            const path = require('path');
            
            const userDir = path.join(this.userDataPath, userId);
            const profilePath = path.join(userDir, this.profileFileName);
            
            // Create user directory if it doesn't exist
            if (!fs.existsSync(userDir)) {
                fs.mkdirSync(userDir, { recursive: true });
            }
            
            // Write profile data to file
            fs.writeFileSync(profilePath, JSON.stringify(userData, null, 2));
            return true;
        } catch (error) {
            console.error('Error saving user profile:', error);
            return false;
        }
    }

    // Update a specific field in the profile
    async updateProfileField(userId, fieldName, value) {
        try {
            const userProfile = await this.loadUserProfile(userId);
            userProfile[fieldName] = value;
            return await this.saveUserProfile(userId, userProfile);
        } catch (error) {
            console.error('Error updating profile field:', error);
            return false;
        }
    }

    // Toggle skill selection for key competencies or additional skills
    async toggleSkillSelection(userId, skillType, skillValue, isSelected) {
        try {
            const userProfile = await this.loadUserProfile(userId);
            
            if (!userProfile[skillType]) {
                userProfile[skillType] = [];
            }
            
            const skillsArray = userProfile[skillType];
            const index = skillsArray.indexOf(skillValue);
            
            if (isSelected && index === -1) {
                // Add skill if selected and not already in array
                skillsArray.push(skillValue);
            } else if (!isSelected && index !== -1) {
                // Remove skill if deselected and exists in array
                skillsArray.splice(index, 1);
            }
            
            return await this.saveUserProfile(userId, userProfile);
        } catch (error) {
            console.error('Error toggling skill selection:', error);
            return false;
        }
    }

    // Get default profile structure
    getDefaultProfile() {
        return {
            name: "",
            phone: "",
            email: "",
            address: "",
            keyCompetencies: [],
            summary: "",
            workExperience: [],
            education: [],
            additionalSkills: []
        };
    }
}

// Export the class for use in other modules
module.exports = UserProfileManager;