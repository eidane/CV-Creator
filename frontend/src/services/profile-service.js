// Profile Service - Centralized API calls for profile management operations

const PROFILE_SERVICE = {
    baseUrl: 'http://localhost:3001/api',

    /**
     * Check if user ID exists by making an API call to verify authentication
     * @returns {Promise<boolean>} True if user is authenticated, false otherwise
     */
    async hasUserId() {
        try {
            // This would typically check with the backend to see if there's a valid session/user
            // For now we'll just check for a simple endpoint that requires auth
            const response = await fetch(`${this.baseUrl}/health`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            return response.ok;
        } catch (error) {
            console.error('Error checking user authentication:', error);
            return false;
        }
    },

    /**
     * Save a new profile to the database
     * @param {Object} profileData - Profile data to save
     * @returns {Promise<Object>} Response from server
     */
    async saveProfile(profileData) {
        try {
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
    }
};

// Export the service
export default PROFILE_SERVICE;