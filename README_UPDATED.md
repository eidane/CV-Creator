# CV Creator Desktop Application

A modern desktop application for creating professional CVs with local storage capabilities, built with Electron and Node.js.

## Features

- **Desktop Application**: Native desktop experience with proper window controls
- **Local Data Storage**: SQLite database for robust data management
- **Template System**: Manage and create professional CV templates
- **Profile Management**: Create and organize multiple CV profiles
- **PDF Generation**: Export CVs to PDF format
- **Cross-platform**: Works on Windows, macOS, and Linux

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (usually comes with Node.js)

### Setup Instructions

1. Clone or download this repository
2. Open terminal/command prompt in the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## Project Structure (After Separation)

```
cv-creator/
├── backend/                # Backend services and business logic
│   ├── src/
│   │   ├── modules/        # Application modules (profile manager, database manager)
│   │   ├── utils/          # Utility functions and classes
│   │   └── server.js       # Backend server entry point
│   └── package.json        # Backend dependencies
├── frontend/               # Frontend UI components
│   ├── public/             # Static assets and templates
│   │   ├── index.html      # Main HTML template
│   │   ├── main.css        # Global styles
│   │   └── templates/      # Template files
│   ├── src/                # Source code (React/Vue components)
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page-level components
│   │   ├── services/       # API service layer
│   │   └── App.js          # Main application component
│   └── package.json        # Frontend dependencies
├── main.js                 # Electron main process (entry point)
└── package.json            # Main project configuration
```

## Data Storage

The application uses SQLite for local data storage:

- **Users**: Stored in the `users` table
- **Profiles**: Stored in the `profiles` table with references to users
- **Templates**: Stored in the `templates` table

All data is stored locally in the application's data directory:
- **Windows**: `%APPDATA%\\CV Creator\\`
- **macOS**: `~/Library/Application Support/CV Creator/`
- **Linux**: `~/.config/CV Creator/`

## Building for Distribution

To create a distributable package:

1. Install build dependencies:
   ```bash
   npm install --save-dev electron-builder
   ```

2. Build the application:
   ```bash
   npm run build
   ```

This will generate installer files for your target platforms.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

Apache 2.0 License

## Acknowledgements

Built with Electron and Node.js technologies.