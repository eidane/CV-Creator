// User Profile Manager for CV Project - Database version

class UserProfileManager {
    constructor(database) {
        this.db = database;
    }

    // Load user profile from database
    async loadUserProfile(userId) {
        try {
            return new Promise((resolve, reject) => {
                this.db.getUserById(userId, (err, user) => {
                    if (err) {
                        console.error('Error loading user:', err);
                        reject(err);
                        return;
                    }
                    
                    if (!user) {
                        resolve(this.getDefaultProfile());
                        return;
                    }
                    
                    this.db.getProfilesByUserId(userId, (err, profiles) => {
                        if (err) {
                            console.error('Error loading user profiles:', err);
                            reject(err);
                            return;
                        }
                        
                        if (!profiles || profiles.length === 0) {
                            resolve(this.getDefaultProfile());
                            return;
                        }
                        
                        const profile = profiles[0];
                        resolve(profile.profile_data);
                    });
                });
            });
        } catch (error) {
            console.error('Error loading user profile:', error);
            return this.getDefaultProfile();
        }
    }

    // Save user profile to database
    async saveUserProfile(userId, userData) {
        try {
            return new Promise((resolve, reject) => {
                this.db.getUserById(userId, (err, user) => {
                    if (err) {
                        console.error('Error checking user existence:', err);
                        reject(err);
                        return;
                    }
                    
                    let profileData = userData;
                    
                    if (!user) {
                        const newUser = {
                            name: userData.name || 'Default User',
                            email: userData.email || '',
                            mobile: userData.mobile || '',
                            address: userData.address || ''
                        };
                        
                        this.db.createUser(newUser, (err, createdUser) => {
                            if (err) {
                                console.error('Error creating user:', err);
                                reject(err);
                                return;
                            }
                            
                            const profileToSave = {
                                user_id: createdUser.id,
                                profile_summary: profileData,
                            };
                            
                            this.db.createProfile(profileToSave, (err, savedProfile) => {
                                if (err) {
                                    console.error('Error saving profile:', err);
                                    reject(err);
                                    return;
                                }
                                
                                resolve(true);
                            });
                        });
                    } else {
                        // User exists, create a new profile
                        const profileToSave = {
                            user_id: userId,
                            profile_summary: profileData,
                        };
                        
                        this.db.createProfile(profileToSave, (err, savedProfile) => {
                            if (err) {
                                console.error('Error saving profile:', err);
                                reject(err);
                                return;
                            }
                            
                            resolve(true);
                        });
                    }
                });
            });
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

// Export the class for use in other modules
module.exports = UserProfileManager;