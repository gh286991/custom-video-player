interface IVimeoFile {
  quality: string;
  link: string;
}

interface IVimeoResponse {
  files: IVimeoFile[];
}

interface IGetVimeoHLSUrl {
  (videoId: string, accessToken: string): Promise<string | undefined>;
}

export const getVimeoHLSUrl: IGetVimeoHLSUrl = async function (videoId, accessToken) {
  const url = `https://api.vimeo.com/videos/${videoId}`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch video information');
  }
  
  const data : IVimeoResponse = await response.json();

  if (!data.files) {
    throw new Error('No files property found in the response');
  }
  const hlsLink = data.files.find((file:IVimeoFile) => file.quality === 'hls');
  return hlsLink && hlsLink.link;
};
  