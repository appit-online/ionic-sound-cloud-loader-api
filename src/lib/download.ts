import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { getTrack } from './track';
import { buildHeaders } from './client';

export async function getM3u8Url(clientId: string,
                                 url: string,
                                 headers: { [key: string]: string } = {}): Promise<string> {
  const httpClient = new HTTP();

  const _url = `${url}?client_id=${clientId}`;
  try {
    const response = await httpClient.get(
      _url,
      {},
      buildHeaders(headers)
    );

    const parsed = JSON.parse(response.data) as { url: string };
    return parsed.url;
  } catch (e) {
    throw new Error('Invalid stream url: ' + e);
  }
}


export async function download(clientId: string, url: string,
                               headers: { [key: string]: string } = {}
): Promise<string> {
  const track = await getTrack(clientId, url, headers);
  const transcoding = track.media.transcodings.find(
    (t: any) => t.format.protocol === 'progressive'
  );

  if (!transcoding) {
    throw new Error('No HLS load stream found');
  }

  return await getM3u8Url(clientId, transcoding.url, headers);
}

