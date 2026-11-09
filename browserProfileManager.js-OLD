// Browser-compatible User Profile Manager for CV Project
class UserProfileManager {
    constructor() {
        this.userDataKey = 'cv_user_profile';
    }

    // Load user profile from browser storage
    loadUserProfile(userId) {
        try {
            const profileData = localStorage.getItem(this.userDataKey);
            
            if (!profileData) {
                // Return default profile if it doesn't exist
                return this.getDefaultProfile();
            }
            
            return JSON.parse(profileData);
        } catch (error) {
            console.error('Error loading user profile:', error);
            // Return default profile on error
            return this.getDefaultProfile();
        }
    }

    // Save user profile to browser storage
    saveUserProfile(userId, userData) {
        try {
            localStorage.setItem(this.userDataKey, JSON.stringify(userData));
            return true;
        } catch (error) {
            console.error('Error saving user profile:', error);
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