// Profile Manager Utilities

async function saveEducation(params) {
    console.log('Saving education...');
    try {
        console.log('Saving education try...');
        // Save to database using API call
        
        // Collect form data
        const educationData = {
            school: document.getElementById('school').value,
            degree: document.getElementById('degree').value,
            year: document.getElementById('year').value
        };
        
        // Save to database using API call with service
        await ProfileService.saveEducation({
            education_data: educationData
        });
        
        alert('Education saved successfully!');
        // Return to profile list view
        cancelEdit();
        loadProfiles(); // Reload profiles to show updated data
    } catch (error) {
        console.error('Error saving education:', error);
        alert('Error saving education: ' + error.message);
    }
}

async function saveExperience(params) {
    console.log('Saving experience...');
    try {
        console.log('Saving experience try...');
        // Save to database using API call
        userId = null; // Initialize userId variable we need to get userid if there is one
        console.log('User ID for saving experience:', userId);
        
        // Collect form data
        const experienceData = {
            title: document.getElementById('title').value,
            company: document.getElementById('company').value,
            years: document.getElementById('years').value
        };
        
        // Save to database using API call with service
        await ProfileService.saveExperience({
            user_id: userId,
            experience_data: experienceData
        });
        
        alert('Experience saved successfully!');
        // Return to profile list view
        cancelEdit();
        loadProfiles(); // Reload profiles to show updated data
    } catch (error) {
        console.error('Error saving experience:', error);
        alert('Error saving experience: ' + error.message);
    }
}

async function saveSkills(params) {
    console.log('Saving skills...');
    try {
        console.log('Saving skills try...');
        // Save to database using API call
        
        const userId = 'sample-user';
        console.log('User ID for saving skills:', userId);
        
        // Collect form data
        const skillsData = {
            skills: document.getElementById('skills').value.split(',').map(skill => skill.trim())
        };
        
        // Save to database using API call with service
        await ProfileService.saveSkills({
            user_id: userId,
            skills_data: skillsData
        });
        
        alert('Skills saved successfully!');
        // Return to profile list view
        cancelEdit();
        loadProfiles(); // Reload profiles to show updated data
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

// Delete a profile 
async function deleteProfile(profileId) {
    if (confirm('Are you sure you want to delete this profile?')) {
        try {
            // Use ProfileService to delete from the backend
            const profileService = new ProfileService();
            await profileService.deleteProfile(profileId);
            
            // Reload profiles to show updated data
            loadProfiles();
            alert('Profile deleted successfully.');
        } catch (error) {
            console.error('Error deleting profile:', error);
            alert('Error deleting profile: ' + error.message);
        }
    }
}