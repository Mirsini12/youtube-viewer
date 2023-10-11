import React from "react";
import { Video } from "../App";


interface VideoDetailProps {
  video: Video | null;
  comments: any[];
}


const VideoDetail: React.FC<VideoDetailProps>= ({ video,comments }) => {
  if (!video) {
    return <div>Loading...</div>;
  }

  const videoId = video.id.videoId;
  const url = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="video-detail col-md-8">
      <div className="embed-responsive embed-responsive-16by9">
        <iframe
          title={video.snippet.title}
          className="embed-responsive-item"
          src={url}
        />
      </div>
      <div className="details">
        <div>{video.snippet.title}</div>
        <div>{video.snippet.description}</div>
      </div>
      {/* display the comments, we need map function-comments are an array */}
      <div className="comments">
         <p>Comments</p>
         <ul>
          {
            comments.map((comment)=>(
              <li key={comment.id} className="comments">
                {/* retrieve the the author's display name from the comment data. */}
                 <strong>{comment.snippet.topLevelComment.snippet.authorDisplayName}:</strong>{" "}                
                 {/* retrieves the actual text content of the comment*/}
              {comment.snippet.topLevelComment.snippet.textDisplay}
              </li>
            ))
          }
         </ul>
      </div>
    </div>
  );
};

export default VideoDetail;
