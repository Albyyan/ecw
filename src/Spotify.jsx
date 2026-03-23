import { useEffect, useRef } from 'react';

export default function Spotify({ playlistId, onReady }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://open.spotify.com/embed/iframe-api/v1';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      const options = {
        uri: `spotify:playlist:${playlistId}`,
        width: 1,
        height: 1,
      };

      IFrameAPI.createController(iframeRef.current, options, (controller) => {
        onReady(controller);
      });
    };

    return () => document.body.removeChild(script);
  }, [playlistId]);

  return (
    <div style={{ width: 1, height: 1, overflow: 'hidden', position: 'absolute' }}>
      <div ref={iframeRef} />
    </div>
  );
}