import Navbar from "./Navbar"
import WeatherApp from "./components/WeatherInformation/index"
import { Route, Routes } from "react-router-dom"
import HomePage from "./components/Home"
import YoutubeApp from "./components/YouTubeVideoAnalytics/ytDataAnalytics"

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/weather_app" element={<WeatherApp />} />
          <Route path="/youtube_statistics" element={<YoutubeApp />} />
        </Routes>
      </div>
    </>
  )
}

export default App