// Profile Manager Utilities
async function saveEducation(params) {
    console.log('Saving education...');
    try {
        console.log('Saving education try...');
        // Save to database using manager
        const userProfileManager = new UserProfileManager();
        
        const userId = 'sample-user';
        console.log('User ID for saving education:', userId);
        
        // Collect form data
        const educationData = {
            school: document.getElementById('school').value,
            degree: document.getElementById('degree').value,
            year: document.getElementById('year').value
        };
        
        // Save to database using the manager
        const success = await userProfileManager.saveUserEducation(userId, educationData);
        if (success) {
            alert('Education saved successfully!');
            // Return to profile list view
            cancelEdit();
            loadProfiles(); // Reload profiles to show updated data
        } else {
            alert('Error saving education...');
        }
    } catch (error) {
        console.error('Error saving education:', error);
        alert('Error saving education: ' + error.message);
    }
}

async function saveExperience(params) {
    console.log('Saving experience...');
    try {
        console.log('Saving experience try...');
        // Save to database using manager
        const userProfileManager = new UserProfileManager();
        
        const userId = 'sample-user';
        console.log('User ID for saving experience:', userId);
        
        // Collect form data
        const experienceData = {
            title: document.getElementById('title').value,
            company: document.getElementById('company').value,
            years: document.getElementById('years').value
        };
        
        // Save to database using the manager
        const success = await userProfileManager.saveUserExperience(userId, experienceData);
        if (success) {
            alert('Experience saved successfully!');
            // Return to profile list view
            cancelEdit();
            loadProfiles(); // Reload profiles to show updated data
        } else {
            alert('Error saving experience...');
        }
    } catch (error) {
        console.error('Error saving experience:', error);
        alert('Error saving experience: ' + error.message);
    }
}

async function saveSkills(params) {
    console.log('Saving skills...');
    try {
        console.log('Saving skills try...');
        // Save to database using manager
        const userProfileManager = new UserProfileManager();
        
        const userId = 'sample-user';
        console.log('User ID for saving skills:', userId);
        
        // Collect form data
        const skillsData = {
            skills: document.getElementById('skills').value.split(',').map(skill => skill.trim())
        };
        
        // Save to database using the manager
        const success = await userProfileManager.saveUserSkills(userId, skillsData);
        if (success) {
            alert('Skills saved successfully!');
            // Return to profile list view
            cancelEdit();
            loadProfiles(); // Reload profiles to show updated data
        } else {
            alert('Error saving skills...');
        }
    } catch (error) {
        console.error('Error saving skills:', error);
        alert('Error saving skills: ' + error.message);
    }
}

// Cancel editing and return to profile list
function cancelEdit() {
    document.getElementById('profile-list').style.display = 'block';
    document.getElementById('profile-editor').style.display = 'none';
}

// Delete a profile (simplified for demo)
async function deleteProfile(profileId) {
    if (confirm('Are you sure you want to delete this profile?')) {
        try {
            // In a real implementation, you'd remove from the profile manager
            allProfiles = allProfiles.filter(p => p.id !== profileId);
            displayProfiles();
            alert('Profile deleted successfully.');
        } catch (error) {
            console.error('Error deleting profile:', error);
            alert('Error deleting profile');
        }
    }
}