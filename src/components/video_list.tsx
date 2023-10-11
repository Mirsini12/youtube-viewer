import React from "react";
import VideoListItem from "./video_list_item";
import { Video } from "../App";



interface VideoListProps {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
}

const VideoList: React.FC<VideoListProps> = (props) => {
  const videoItems = props.videos.map((video) => {
    return (
      <VideoListItem
       onVideoSelect={() => props.onVideoSelect(video)}
        key={video.etag}
        video={video}
      />
    );
  });

  return <ul className="col-md-4 list-group">{videoItems}</ul>;
};

export default VideoList;
