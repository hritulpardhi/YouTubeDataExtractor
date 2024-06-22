import Navbar from "./Navbar"
import { Route, Routes } from "react-router-dom"
import SearchVideos from "./components/YouTubeVideoAnalytics/searchVideos"
import MostPopular from "./components/YouTubeVideoAnalytics/mostPopular"

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<SearchVideos />} />
          <Route path="/youtube_search" element={<SearchVideos />} />
          <Route path="/youtube_popular_today" element={<MostPopular />} />
        </Routes>
      </div>
    </>
  )
}

export default App