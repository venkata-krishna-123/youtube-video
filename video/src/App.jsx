import React, { useState } from "react";
import { FaYoutube } from "react-icons/fa";
import axios from "axios";

function App() {
  const [URL, setURL] = useState("");

  const handleInput = (e) => {
    setURL(e.target.value);
  };

  const extractVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=)?([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : url;
  };

  const downloadVideo = async (e) => {
    e.preventDefault();
    const videoId = extractVideoId(URL);

    const options = {
      method: "GET",
      url: "https://youtube-data8.p.rapidapi.com/video/streaming-data/",
      params: { id: videoId },
      headers: {
        "x-rapidapi-key": "dcf67b0885mshb575ab13e81274dp19a061jsn8e8685fd7dd8",
        "x-rapidapi-host": "youtube-data8.p.rapidapi.com",
        "content-type": "application/json"
      }
    };

    try {
      const response = await axios.request(options);
      const downloadUrl = response?.data?.formats?.[0]?.url;
      if (downloadUrl) {
        window.location.href = downloadUrl; // Redirect to download URL
      } else {
        console.log("Download URL not found");
      }
    } catch (error) {
      console.error("Error fetching download URL:", error);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col bg-green-500">
      <div className="flex items-center justify-center gap-x-2">
        <FaYoutube size={60} className="text-red-600" />
        <p className="text-2xl font-bold text-red-400">Video Downloader</p>
      </div>
      
      <div className="flex items-center justify-center gap-x-2 mt-5">
        <input
          type="url"
          placeholder="Enter YouTube URL"
          className="h-10 w-96 border-none outline-none px-5 rounded-lg shadow-lg"
          onChange={handleInput}
        />
        <button
          className="h-10 bg-slate-600 text-white px-4 rounded-lg border-none outline-none"
          onClick={downloadVideo}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default App;
