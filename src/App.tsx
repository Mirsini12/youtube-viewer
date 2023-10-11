import React ,{useEffect, useState} from "react";
import axios from "axios";
import _ from "lodash";
import YTSearch from "youtube-api-search";
import SearchBar from './components/search_bar';
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";

export interface Video {
  etag: string;
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
  };
}


const API_KEY = "ADD_API_KEY_HERE";

const App: React.FC = () => {
  
const[videos,setVideos]=useState<Video[]>([])
const [selectedVideo,setSelectedVideo]=useState<Video | null>(null)
const [comments,setComments]=useState<any[]>([])
  
  useEffect(()=>{
    videoSearch("liverpool")
  },[])

  
  const videoSearch = (term: string) => {
    YTSearch({ key: API_KEY, term: term }, (foundVideos: Video[]) => {
      setVideos(foundVideos);
      setSelectedVideo(foundVideos[0]);
      setComments([]); // Clear the comments state when a new search is performed
      if (foundVideos.length > 0) {
        fetchComments(foundVideos[0].id.videoId);
      }
    });
  };

  //fetch comments
 const fetchComments =(videoId:string)=> {
    const commentApiUrl = `https://www.googleapis.com/youtube/v3/commentThreads?key=${API_KEY}&textFormat=plainText&part=snippet&videoId=${videoId}&maxResults=10`
    axios.get(commentApiUrl)
      .then((res) => { setComments(res.data.items) })
      .catch((e) => { console.error(e); })
  }

  const videoSearchDebounced = _.debounce((term: string) => {
    videoSearch(term);
  }, 300);

  
  return (
    <div>
      <SearchBar onSearchTermChange={videoSearchDebounced} />
      <VideoDetail video={selectedVideo} comments={comments} />
      <VideoList
         onVideoSelect={(selectedVideo: Video) => {
          setSelectedVideo(selectedVideo);
          setComments([]); // Clear comments when a new video is selected
          fetchComments(selectedVideo.id.videoId); // Fetch comments for the selected video
        }}
        videos={videos}
      />
    </div>
  )
}

export default App;
