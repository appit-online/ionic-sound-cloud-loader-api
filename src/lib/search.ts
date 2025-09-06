import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { SearchOptions, SearchResponse } from '../@types/model';
import { apiBaseUrl } from '../config/config';
import { buildHeaders } from './client';

export async function search(
  clientId: string,
  searchOptions: SearchOptions,
  headers: { [key: string]: string } = {},
): Promise<SearchResponse> {
  const httpClient = new HTTP();

  const { query, limit = 20, offset = 0, filter = 'all' } = searchOptions;
  const path = filter === 'all' ? '' : `/${filter}`;
  const baseUrl = `${apiBaseUrl}/search${path}`;
  const url = encodeURI(`${baseUrl}?q=${query}&limit=${limit}&offset=${offset}&access=playable&client_id=${clientId}`);

  try {
    const response = await httpClient.get(url, {}, buildHeaders(headers)); // Cordova HTTP call
    return JSON.parse(response.data) as SearchResponse; // response.data ist ein String!
  } catch (e) {
    throw new Error('Invalid search query: ' + e);
  }
}
