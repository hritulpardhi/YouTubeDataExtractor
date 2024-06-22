Certainly! Here's a complete example of a README.md file formatted with Markdown syntax for your YouTube Data Extractor project:

```markdown
# YouTube Data Extractor

This project fetches video details from YouTube using YouTube's API. Users can search for videos, retrieve details such as video titles, descriptions, tags, and thumbnails, and fetch popular videos based on their selected country. The application is built with React and provides an interactive UI for users to explore YouTube content efficiently.

## Features

- **Search Videos:** Search any video on YouTube and extract its data.
- **View Video Details:** Click on "View Video Details" to open a modal with comprehensive information about the video.
- **Popular Videos by Country:** Fetch and display popular videos from any selected country.
- **Thumbnails:** Download video thumbnails in various resolutions.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)
- API Key to be generated from YouTube and need to be updated in .env file.

### Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/YouTube-Data-Extractor.git
cd YouTube-Data-Extractor
```

Install the dependencies:

```bash
npm install
```

### Running the Application

To start the application, run:

```bash
npm start
```

This will open http://localhost:3000 in your browser.

### Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner in interactive watch mode.
- `npm run build`: Builds the app for production to the build folder.
- `npm run eject`: If you need more control over the configuration, you can eject from Create React App. Note that this is a one-way operation.

### Deployment

To deploy the application, follow the instructions in the Create React App documentation.

### Learn More

To learn more about React and Create React App, check out the following resources:
- [React documentation](https://reactjs.org/docs/getting-started.html)
- [Create React App documentation](https://create-react-app.dev/docs/getting-started/)

## Screenshots

![Search Video](screenshots/search-video.png)
*Search Video*

![View Video Details Modal](screenshots/view-video-details-modal.png)
*View Video Details Modal*

![Popular Videos by Country](screenshots/popular-videos-by-country.png)
*Popular Videos by Country*

## Acknowledgments

This project was bootstrapped with Create React App.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
```