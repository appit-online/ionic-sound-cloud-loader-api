import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { soundCloudUrl, clientIdRegex, scriptUrl } from '../config/config';

export async function getClientId(headers: { [key: string]: string } = {}): Promise<string> {
  const httpClient = new HTTP();

  try {
    // SoundCloud HTML laden
    const soundCloudDom = (await httpClient.get(soundCloudUrl, {}, buildHeaders(headers))).data as string;

    // Script-URLs extrahieren
    const paths = soundCloudDom.split('<script crossorigin src="');
    const urls: string[] = [];
    paths.forEach((path: string) => {
      const pathUrl = path.replace('"></script>', '');
      const res = pathUrl.split('\n')[0];
      if (scriptUrl.test(res)) urls.push(res);
    });

    // Script-Dateien abklappern, um Client-ID zu finden
    for (const url of urls) {
      const response = await httpClient.get(url, {}, {});
      const matchResult = (response.data as string).match(clientIdRegex);
      if (matchResult !== null) {
        return matchResult[1] as string;
      }
    }

    throw new Error("Can't get client id");
  } catch (e) {
    throw new Error("Can't get client id: " + e);
  }
}

export function buildHeaders (options?: any) {
  const baseHeaders = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
  };

  // Merge mit options und zwinge alle Werte zu Strings
  const merged = { ...baseHeaders, ...options };

  Object.keys(merged).forEach(key => {
    merged[key] = String(merged[key]);
  });

  return merged;
}

