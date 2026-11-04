#!/usr/bin/env python3
"""
Profile Data Saver - Cross-platform Python script to save CV profiles as JSON files
This script creates profile.json files in the userData directory structure.
"""

import os
import json
import sys
from pathlib import Path

def save_profile_data(user_id, profile_data):
    """
    Save profile data to a JSON file
    
    Args:
        user_id (str): The user identifier
        profile_data (dict): The profile data to save
        
    Returns:
        bool: True if successful, False otherwise
    """
    try:
        # Define the userData directory path
        user_dir = Path("userData") / user_id
        profile_file = user_dir / "profile.json"
        
        # Create directories if they don't exist
        user_dir.mkdir(parents=True, exist_ok=True)
        
        # Write the profile data to JSON file
        with open(profile_file, 'w', encoding='utf-8') as f:
            json.dump(profile_data, f, indent=2, ensure_ascii=False)
            
        print(f"Profile saved successfully to {profile_file}")
        return True
        
    except Exception as e:
        print(f"Error saving profile: {e}")
        return False

def main():
    """
    Main function to handle command line arguments
    Expects user_id and JSON data as command line arguments
    """
    if len(sys.argv) != 3:
        print("Usage: python save_profile.py <user_id> '<json_data>'")
        print("Example: python save_profile.py 'sample-user' '{\"name\":\"John Doe\",\"email\":\"john@example.com\"}'")
        sys.exit(1)
    
    user_id = sys.argv[1]
    json_data = sys.argv[2]
    
    try:
        profile_data = json.loads(json_data)
        success = save_profile_data(user_id, profile_data)
        sys.exit(0 if success else 1)
    except json.JSONDecodeError as e:
        print(f"Invalid JSON data: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()