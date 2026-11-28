import React, { useState } from 'react';
import { ProfileService } from '../services/profile-service';

const ProfileManager = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    summary: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle save profile functionality - FIXED VERSION
  const handleSaveProfile = async () => {
    setIsLoading(true);
    setSaveStatus('');
    
    try {
      // Prepare data for saving according to the backend structure
      const dataToSave = {
        user_id: 1, // Default user ID for now
        profile_summary: {
          name: profileData.name,
          email: profileData.email,
          mobile: profileData.mobile,
          address: profileData.address,
          summary: profileData.summary
        }
      };
      
      console.log('Sending data to backend:', dataToSave);
      
      // Call the existing service method that makes API calls
      const result = await ProfileService.saveProfile(dataToSave);
      
      setSaveStatus('success');
      
      // Reset form after successful save
      if (result) {
        setProfileData({
          name: '',
          email: '',
          mobile: '',
          address: '',
          summary: ''
        });
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      setSaveStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-manager">
      <header className="main">
        <h1>Profile Manager</h1>
        <p>Manage your CV profiles here.</p>
        <nav>
          <button onClick={() => window.location.href = './index.html'} className="btn btn-secondary">
            Back to Main Page
          </button>
        </nav>
      </header>

      <main>
        <section id="profile-editor" className="features" style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <h2>Create New Profile</h2>
          
          <form>
            <div className="form-group">
              <label htmlFor="name">Full Name:</label>
              <input 
                type="text" 
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input 
                type="email" 
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="mobile">Mobile:</label>
              <input 
                type="text" 
                id="mobile"
                name="mobile"
                value={profileData.mobile}
                onChange={handleInputChange}
                placeholder="Enter your mobile number"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <textarea 
                id="address"
                name="address"
                value={profileData.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="summary">Profile Summary:</label>
              <textarea 
                id="summary"
                name="summary"
                value={profileData.summary}
                onChange={handleInputChange}
                placeholder="Enter your professional summary"
                rows="4"
              />
            </div>
          </form>
          
          <button 
            onClick={handleSaveProfile} 
            disabled={isLoading}
            className="btn btn-primary"
          >
            {isLoading ? 'Saving...' : 'Save Profile'}
          </button>
          
          {saveStatus === 'success' && (
            <div className="alert alert-success" style={{ marginTop: '10px' }}>
              Profile saved successfully!
            </div>
          )}
          
          {saveStatus === 'error' && (
            <div className="alert alert-danger" style={{ marginTop: '10px' }}>
              Error saving profile. Please try again.
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ProfileManager;