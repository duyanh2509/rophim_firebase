// utilities/ConvertLinkYoutube.js

export function convertToYoutubeEmbedUrl(url) {
  if (!url) return '';

  if (url.includes('youtu.be/')) {
    return `https://www.youtube.com/embed/${url.split('youtu.be/')[1].split('?')[0]}`;
  } else if (url.includes('watch?v=')) {
    return `https://www.youtube.com/embed/${url.split('watch?v=')[1].split('&')[0]}`;
  }

  return url;
}
