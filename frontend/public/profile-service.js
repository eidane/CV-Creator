// Profile Service - Centralized API calls for profile management operations

// Simple service to handle all API interactions with backend
const ProfileService = {
    baseUrl: 'http://localhost:3001/api',

    /**
     * Save a new profile to the database
     * @param {Object} profileData - Profile data to save
     * @returns {Promise<Object>} Response from server
     */
    async saveProfile(profileData) {
        try {
            // first update user using /api/create-user
            const userResponse = await fetch(`${this.baseUrl}/create-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData.user)
            });
            const response = await fetch(`${this.baseUrl}/profiles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error saving profile:', error);
            throw error;
        }
    },

    /**
     * Load all user profiles
     * @param {string} userId - The user ID
     * @returns {Promise<Array>} Array of profile objects
     */
    async loadUserProfiles(userId) {
        try {
            const response = await fetch(`${this.baseUrl}/users/${userId}/profiles`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error loading profiles:', error);
            throw error;
        }
    },

    /**
     * Save education data
     * @param {Object} educationData - Education data to save
     * @returns {Promise<Object>} Response from server
     */
    async saveEducation(educationData) {
        try {
            const response = await fetch(`${this.baseUrl}/education`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(educationData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error saving education:', error);
            throw error;
        }
    },

    /**
     * Save experience data
     * @param {Object} experienceData - Experience data to save
     * @returns {Promise<Object>} Response from server
     */
    async saveExperience(experienceData) {
        try {
            const response = await fetch(`${this.baseUrl}/experience`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(experienceData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error saving experience:', error);
            throw error;
        }
    },

    /**
     * Save skills data
     * @param {Object} skillsData - Skills data to save
     * @returns {Promise<Object>} Response from server
     */
    async saveSkills(skillsData) {
        try {
            const response = await fetch(`${this.baseUrl}/skills`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(skillsData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error saving skills:', error);
            throw error;
        }
    },
    
    /** 
     * Create or update a user with profile data
     * @param {Object} profileData - Profile data to save
     * @returns {Promise<Object>} Response from server
     */
    async saveUserWithProfile(profileData) {
        try {
            const response = await fetch(`${this.baseUrl}/create-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error saving user with profile:', error);
            throw error;
        }
    }
};

// Export for use in other modules (in a real implementation)
window.ProfileService = ProfileService;