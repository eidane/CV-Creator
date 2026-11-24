// Test script to verify the fix works
console.log('Testing ProfileService implementation...');

// Verify that ProfileService is available in global scope
if (typeof ProfileService !== 'undefined') {
    console.log('✅ ProfileService is properly defined');
    
    // Check if it has required methods
    const requiredMethods = ['saveProfile', 'loadUserProfiles', 'saveEducation', 'saveExperience', 'saveSkills'];
    let allMethodsExist = true;
    
    requiredMethods.forEach(method => {
        if (typeof ProfileService[method] !== 'function') {
            console.log(`❌ Missing method: ${method}`);
            allMethodsExist = false;
        } else {
            console.log(`✅ Method exists: ${method}`);
        }
    });
    
    if (allMethodsExist) {
        console.log('🎉 All ProfileService methods are properly defined!');
    } else {
        console.log('❌ Some methods are missing');
    }
} else {
    console.log('❌ ProfileService is NOT defined - fix failed');
}

// Test that the old UserProfileManager is not referenced anywhere
const filesToCheck = [
    'profile-manager-core.js',
    'profile-manager-utils.js'
];

filesToCheck.forEach(file => {
    fetch(`./${file}`)
        .then(response => response.text())
        .then(content => {
            if (content.includes('UserProfileManager')) {
                console.log(`❌ ${file} still contains UserProfileManager references`);
            } else {
                console.log(`✅ ${file} does not contain UserProfileManager references`);
            }
            
            if (content.includes('new UserProfileManager()')) {
                console.log(`❌ ${file} still contains new UserProfileManager() calls`);
            } else {
                console.log(`✅ ${file} does not contain new UserProfileManager() calls`);
            }
        })
        .catch(error => {
            console.log(`Error checking ${file}:`, error);
        });
});