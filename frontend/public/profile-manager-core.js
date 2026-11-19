// Profile Manager Core JavaScript
let currentProfileId = null;
let allProfiles = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadProfiles();
});

// Create a new profile
function createNewProfile() {
    currentProfileId = null;
    showProfileEditor({});
}

// Edit an existing profile
async function editProfile(profileId) {
    try {
        // Load the actual profile data from database 
        const userProfileManager = new UserProfileManager();
        const userId = 'sample-user';
        
        // Load the actual profile data from database
        const profileData = await userProfileManager.loadUserProfile(userId);
        currentProfileId = profileId;
        showProfileEditor(profileData);
    } catch (error) {
        console.error('Error editing profile:', error);
        alert('Error loading profile for editing.');
    }
}

// Show the profile editor with form fields
function showProfileEditor(profileData) {
    const container = document.getElementById('profileForm');
    const editorSection = document.getElementById('profile-editor');
    // Populate the form fields with profile data from user database (or empty for new profile).
    // userData.name, userData.email, userData.mobile, userData.address
    container.innerHTML = `
        <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" value="${profileData.name || ''}">
        </div>
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" value="${profileData.email || ''}">
        </div>
        <div class="form-group">
            <label for="mobile">Mobile:</label>
            <input type="text" id="mobile" value="${profileData.mobile || ''}">
        </div>
        <div class="form-group">
            <label for="address">Address:</label>
            <textarea id="address">${profileData.address || ''}</textarea>
        </div>
    `;
    
    document.getElementById('profile-list').style.display = 'none';
    editorSection.style.display = 'block';
}

// Load profiles from database
async function loadProfiles() {
    try {
        // In a real implementation, this would fetch from the backend
        const userProfileManager = new UserProfileManager();
        const userId = 'sample-user';
        
        // For demo purposes, we'll simulate loading profiles
        allProfiles = await userProfileManager.loadUserProfiles(userId);
        displayProfiles();
    } catch (error) {
        console.error('Error loading profiles:', error);
        document.getElementById('profiles-container').innerHTML = '<p>Error loading profiles.</p>';
    }
}

// Display profiles in the UI
function displayProfiles() {
    const container = document.getElementById('profiles-container');
    
    if (allProfiles.length === 0) {
        container.innerHTML = '<p>No profiles found. Create a new profile to get started.</p>';
        return;
    }
    
    let html = '';
    allProfiles.forEach(profile => {
        html += `
            <div class="card">
                <h3>${profile.name || 'Unnamed Profile'}</h3>
                <p>Email: ${profile.email || 'N/A'}</p>
                <p>Mobile: ${profile.mobile || 'N/A'}</p>
                <button onclick="editProfile('${profile.id}')" class="btn btn-secondary">Edit</button>
                <button onclick="deleteProfile('${profile.id}')" class="btn btn-danger">Delete</button>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Save the profile
async function saveProfile() {
    console.log('Saving profile...');
    try {
        console.log('Saving profile try...');
        // Save to database with api 
        
        const userId = 'sample-user';
        console.log('User ID for saving profile:', userId);
        
        // Collect form data
        const profileData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            mobile: document.getElementById('mobile').value,
            address: document.getElementById('address').value
        };
        
        // Save to database using the manager
        const success = true; // Simulate success for demo purposes
        if (success) {
            alert('Profile saved successfully!');
            // Return to profile list view
            cancelEdit();
            loadProfiles(); // Reload profiles to show updated data
        } else {
            alert('Error saving profile...');
        }
    } catch (error) {
        console.error('Error saving profile:', error);
        alert('Error saving profile: ' + error.message);
    }
}