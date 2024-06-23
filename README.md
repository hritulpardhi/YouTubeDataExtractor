
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
git clone https://github.com/hritulpardhi/YouTubeDataExtractor.git
cd YouTube-Data-Extractor
```

Install the dependencies:

```bash
npm install
```

### Running the Application

To start the application, run :

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

[Search Video]
![image](https://github.com/hritulpardhi/YouTubeDataExtractor/assets/166939863/5d2d8889-5fe6-4d18-b385-8b41b1d240c4)
*Search Video*

[Search Video : Results]
![image](https://github.com/hritulpardhi/YouTubeDataExtractor/assets/166939863/347f41ea-6000-450f-a98c-31564640347b)
*Get the video results*

[View Video Details Modal]
![image](https://github.com/hritulpardhi/YouTubeDataExtractor/assets/166939863/097b041d-beff-47e8-82fd-1d30655bc746)
*View Video Details Modal, you can play the video here as well as copy the description and other stuff at just a click, download thumbnails as well as per the resolution you want.*

[Popular Videos by Country]
![image](https://github.com/hritulpardhi/YouTubeDataExtractor/assets/166939863/4fbe5c0c-dbcc-4689-831d-639c80fe8c14)
*Popular Videos by Country*

[Popular Videos by Country : Results]
![image](https://github.com/hritulpardhi/YouTubeDataExtractor/assets/166939863/ee82fc79-21b0-4b5b-b06a-33528288bfed)
*Get the popular video by country results*

## Acknowledgments

This project was bootstrapped with Create React App.

## License

This project is licensed under the MIT License(![LICENSE](https://github.com/hritulpardhi/YouTubeDataExtractor/blob/1e5ce41b2c1d51763731e719cf0795d767e31798/LICENSE)) - see the LICENSE file for details.
