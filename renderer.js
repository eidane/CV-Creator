// Renderer process for Electron application
const { ipcRenderer } = require('electron');

// Simple initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('Renderer process initialized');
    
    // Setup basic navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            showPage(pageId);
        });
    });
    
    // Setup form submission handlers
    setupFormHandlers();
});

function setupFormHandlers() {
    // Handle profile form submission if it exists
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(profileForm);
            const profileData = {};
            
            for (let [key, value] of formData.entries()) {
                profileData[key] = value;
            }
            
            console.log('Profile form submitted with data:', profileData);
            
            // In a real implementation, we would save this to database
            // For now, show success message
            alert('Profile saved successfully! (In a full implementation, this would save to database)');
        });
    }
}

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
}

// Add the functions to global scope for HTML references
window.showPage = showPage;