import { Playlist, Track, User } from '../@types/model';
import { apiBaseUrl } from '../config/config';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { buildHeaders } from './client';

export const getTrack = async (
  clientId: string,
  url: string,
  headers: { [key: string]: string } = {},
): Promise<Track> => {
  try {
    return (await getSingleItemInfo(clientId, url, headers)) as Track;
  } catch (e) {
    throw new Error('Invalid track url: ' + e);
  }
};

export const getSingleItemInfo = async (
  clientId: string,
  url: string,
  headers: { [key: string]: string } = {},
): Promise<Playlist | Track | User> => {
  try {
    const httpClient = new HTTP();
    const cleanedURL = cleanSoundCloudUrl(url);
    const requestUrl = `${apiBaseUrl}/resolve?url=${cleanedURL}&client_id=${clientId}`;

    const response = await httpClient.get(requestUrl, {}, buildHeaders(headers));
    return JSON.parse(response.data) as Playlist | Track | User;
  } catch (e) {
    throw new Error('Invalid resolve url: ' + e);
  }
};

export function cleanSoundCloudUrl(url: string): string {
  try {
    // Schema erzwingen
    const tempUrl = url.startsWith('http') ? url : `https://${url}`;
    const parsedUrl = new URL(tempUrl);

    // Nur SoundCloud-Domains zulassen
    const validHosts = ['soundcloud.com', 'm.soundcloud.com'];
    if (!validHosts.includes(parsedUrl.hostname) || parsedUrl.pathname.length <= 1) {
      throw new Error('Invalid hostname');
    }

    // Mobile Subdomain entfernen
    const host = 'soundcloud.com';

    // Nur Pfad behalten, Query-Parameter entfernen
    const cleanPath = parsedUrl.pathname;

    return `https://${host}${cleanPath}`;
  } catch (err) {
    return url; // fallback: originale URL zurückgeben
  }
}
