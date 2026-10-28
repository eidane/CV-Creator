# CV Project with User Data and PDF Export

This project demonstrates a folder structure for storing user data and PDF extraction based on templates.

## Folder Structure

```
CVproject/
├── userData/                 # Folder for storing user data
│   ├── user1/                # Individual user folders
│   │   └── profile.json      # User profile data
│   └── user2/
│       └── profile.json
├── templates/                # Template files for CV generation
│   ├── style.css             # Template styling
│   └── TemplateFile          # Main template file
├── main.html                 # Main application page
├── main.css                  # Main styling
└── userDataManager.js        # User data management functionality
```

## Features

### 1. User Data Storage
- Each user has a dedicated folder in the `userData` directory
- User data is stored as JSON files
- Easy to manage multiple users with their own profiles

### 2. Template-Based PDF Generation
- Templates are stored in the `templates/` folder
- Templates support placeholders like `{{name}}`, `{{email}}`
- Data can be dynamically injected into templates
- Users can select which data fields to include when exporting

### 3. Usage Example

1. Create a user profile with personal information
2. Select a template from the templates directory
3. Choose which data fields to include in the PDF
4. Generate PDF output

## Implementation Details

The `userDataManager.js` file provides:
- User creation and management
- Template processing with data injection
- PDF generation simulation
- Data persistence using browser localStorage

## How to Use

1. Open `main.html` in a web browser
2. Create user profiles using the "Create User" button
3. View existing users
4. Select a template and generate PDF output

Note: This is a frontend demonstration. In a production environment, you would need:
- A backend server for full file system access
- PDF generation libraries (like jsPDF)
- More robust data persistence mechanisms