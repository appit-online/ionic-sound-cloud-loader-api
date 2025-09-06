import { SearchOptions, SearchResponse, Track } from './@types/model';
import { download } from './lib/download';
import { getClientId } from './lib/client';
import { search } from './lib/search';
import { getTrack } from './lib/track';

const CLIENT_ID_KEY = 'soundcloud_client_id';
const CLIENT_ID_EXP_KEY = 'soundcloud_client_id_exp';
const ONE_DAY_MS = 60 * 60 * 1000;

export class SoundCloud {
  private static clientId: string | null = null;

  public static connect = async (headers: { [key: string]: string } = {}, force: boolean = false): Promise<void> => {
    if (SoundCloud.clientId && !force) {
      return;
    }

    // Cache prüfen
    if (!force) {
      const cachedId = localStorage.getItem(CLIENT_ID_KEY);
      const cachedExp = localStorage.getItem(CLIENT_ID_EXP_KEY);

      if (cachedId && cachedExp && Date.now() < parseInt(cachedExp, 10)) {
        SoundCloud.clientId = cachedId;
        return;
      }
    }

    // Neue Client-ID holen
    SoundCloud.clientId = await getClientId(headers);

    // Cache speichern
    localStorage.setItem(CLIENT_ID_KEY, SoundCloud.clientId);
    localStorage.setItem(CLIENT_ID_EXP_KEY, (Date.now() + ONE_DAY_MS).toString());
  };

  public static search = async (
    searchOptions: SearchOptions,
    headers: { [key: string]: string } = {},
  ): Promise<SearchResponse> => {
    this.checkClientId();
    return search(SoundCloud.clientId as string, searchOptions, headers);
  };

  public static getTrack = async (url: string, headers: { [key: string]: string } = {}): Promise<Track> => {
    SoundCloud.checkClientId();
    return await getTrack(SoundCloud.clientId as string, url, headers);
  };

  public static download = async (url: string, headers: { [key: string]: string } = {}): Promise<string> => {
    SoundCloud.checkClientId();
    return await download(SoundCloud.clientId as string, url, headers);
  };

  private static checkClientId() {
    if (!SoundCloud.clientId) throw Error('client_id not set. Run .connect() before executing');
  }
}

export * from './@types/model';
