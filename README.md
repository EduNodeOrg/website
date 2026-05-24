# EduNode

[![Netlify Status](https://api.netlify.com/api/v1/badges/0eca6af0-abbd-4056-ae63-33dd6a3325e4/deploy-status)](https://app.netlify.com/sites/edunode/deploys)

EduNode is an educational platform designed to provide accessible learning resources and interactive educational experiences.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview
EduNode aims to democratize education by providing a user-friendly platform for learners of all backgrounds. Our React-based application delivers educational content in an engaging and interactive format.

## Features
- Interactive learning modules and educational content
- 3D interactive experiences (Three.js, Spline)
- Built-in code editor (Monaco Editor)
- Blockchain wallet integration (Stellar/Freighter, Albedo)
- PayPal payment integration
- Interactive maps (Mapbox)
- User authentication (Google OAuth, JWT)
- Admin dashboard
- Progress tracking and achievements
- Responsive design for all devices
- Resource library and content management

## Installation

### Prerequisites
- Node.js (v18.16.0 or higher)
- npm (v9 or higher)

### Setup
1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/edunode-website.git
   cd edunode-website
   ```
2. Install dependencies
   ```bash
   npm install
   ```

## Usage
In the project directory, you can run:

### `npm start`
Runs the app in the development mode. Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes. You may also see any lint errors in the console.

### `npm start-low`
Runs the app with default memory settings (useful if `npm start` runs out of memory).

### `npm test`
Launches the test runner in the interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run buildMax`
Builds the app with increased memory allocation (4GB) for large builds.

### `npm run stage`
Deploys a preview version to Netlify.

### `npm run prod-deploy`
Deploys the production build to Netlify.

## Project Structure

```
edunode-website/
├── public/             # Static files and favicons
├── src/                # Source code
│   ├── actions/        # Redux actions (auth, items, errors)
│   ├── admin/          # Admin dashboard source
│   ├── components/     # Reusable UI components
│   ├── config/         # Configuration files (roles, etc.)
│   ├── App.js          # Main app component
│   ├── Navigate.js     # Navigation logic
│   └── ThemeContext.js # Theme provider
├── package.json        # Project dependencies
└── netlify.toml        # Netlify deployment configuration
```

### Advanced Configuration
For advanced configuration options, please refer to the Create React App documentation .

## Deployment
This project is deployed using Netlify. Any changes pushed to the main branch will trigger a new deployment automatically.

For more information about deployment options, see the Create React App deployment documentation .

## Contributing
1. Fork the repository
2. Create your feature branch ( git checkout -b feature/amazing-feature )
3. Commit your changes ( git commit -m 'Add some amazing feature' )
4. Push to the branch ( git push origin feature/amazing-feature )
5. Open a Pull Request
## License
See the repository for license details.

Built with ❤️ by the EduNode Team