// youtube-api-search.d.ts

// Declare the Video type
interface Video {
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
  
  // Declare the module structure
  declare module 'youtube-api-search' {
    // Define the function signature
    function YTSearch(
      options: { key: string; term: string },
      callback: (videos: Video[]) => void
    ): void;
  
    // Export the function
    export = YTSearch;
  }
  