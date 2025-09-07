# [ionic-sound-cloud-loader-api: Ionic](https://github.com/appit-online/ionic-sound-cloud-loader-api)

Search tracks by url, by query and convert mp3 url... on soundcloud without API key in ionic apps

**Table of contents:**


* [Quickstart](#quickstart)

  * [Installing the library](#installing-the-library)
  * [Using the library](#using-the-library)
* [License](#license)

## Quickstart

### Installing the library

```bash
ionic cordova plugin add cordova-plugin-advanced-http
npm install ionic-sound-cloud-loader-api --save
```

### Using the library

```javascript
import {SoundCloud} from 'ionic-sound-cloud-loader-api';

/**
 * Searching on soundcloud
 */
const reqHeaders = {
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.118 Safari/537.36',
}


await SoundCloud.connect(reqHeaders);

const videos = await SoundCloud.search({
  query: string;
  limit?: number;
  offset?: number;
  filter?: SearchFilter; // Default: "all";  "tracks" | "users" | "albums" | "playlists" | "all"
}, reqHeaders);
console.log(videos);

{
  "collection": [
    {
      "artwork_url": "https://dummyimage.com/600x600/000/fff.jpg",
      "caption": null,
      "commentable": true,
      "comment_count": 123,
      "created_at": "2025-01-01T12:00:00Z",
      "description": "This is a dummy track description for testing purposes.",
      ...
    }
  ],
  "total_results": 12345,
  "next_href": "https://api-v2.sound.com/search/tracks?query=dummy&limit=20&offset=20",
  "query_urn": "sound:search:dummyquery"
}
```

```javascript
import {SoundCloud} from 'ionic-sound-cloud-loader-api';

const reqHeaders = {
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.118 Safari/537.36',
}

/**
 * Search track by url
 */
await SoundCloud.connect(reqHeaders);

const video = await SoundCloud.getTrack(url, reqHeaders);
console.log(video);
{
  "artwork_url": "https://dummyimage.com/600x600/000/fff.jpg",
  "caption": null,
  "commentable": true,
  "comment_count": 123,
  "created_at": "2025-01-01T12:00:00Z",
  "description": "This is a dummy track description for testing purposes.",
  "downloadable": false,
  "download_count": 0,
  "duration": 180000,
  "full_duration": 180000,
  "embeddable_by": "all",
  "genre": "Electronic",
  "has_downloads_left": false,
  "id": 123456789,
  "kind": "track",
  "label_name": null,
  "last_modified": "2025-01-01T12:00:00Z",
  "license": "all-rights-reserved",
  "likes_count": 999,
  "permalink": "dummy-track",
  "permalink_url": "https://sound.com/dummyuser/dummy-track",
  "playback_count": 5000,
  "public": true,
  "publisher_metadata": null,
  "purchase_title": null,
  "purchase_url": null,
  "release_date": null,
  "reposts_count": 50,
  "secret_token": null,
  "sharing": "public",
  "state": "finished",
  "streamable": true,
  "tag_list": "dummy music test track",
  "title": "Dummy Track - Test Audio",
  "uri": "https://api.sound.com/tracks/123456789",
  "urn": "sound:tracks:123456789",
  "user_id": 987654321,
  "visuals": null,
  "waveform_url": "https://dummyimage.com/600x100/ccc/000.png",
  "display_date": "2025-01-01T12:00:00Z",
  "media": {
    "transcodings": [
        {
          "url": "https://dummyurl.com/stream/track1.m3u8",
          "preset": "aac_160k",
          "duration": 180000,
          "snipped": false,
          "format": {
            "protocol": "hls",
            "mime_type": "audio/mp4; codecs=\"mp4a.40.2\""
          },
          "quality": "sq",
          "is_legacy_transcoding": false
        },
        {
          "url": "https://dummyurl.com/stream/track1.mp3",
          "preset": "mp3_0_0",
          "duration": 180000,
          "snipped": false,
          "format": {
            "protocol": "progressive",
            "mime_type": "audio/mpeg"
          },
          "quality": "sq",
          "is_legacy_transcoding": true
        }
      ]
  },
  "station_urn": "sound:system-playlists:track-stations:123456789",
  "station_permalink": "track-stations:123456789",
  "track_authorization": "dummy_authorization_token",
  "monetization_model": "BLACKBOX",
  "policy": "MONETIZE",
  "user": {
    "avatar_url": "https://dummyimage.com/100x100/000/fff.jpg",
    "city": "Dummy City",
    "comments_count": 0,
    "country_code": "US",
    "created_at": "2020-01-01T12:00:00Z",
    "creator_subscriptions": [
      {
        "product": {
          "id": "free"
        }
      }
    ],
    "creator_subscription": {
      "product": {
        "id": "free"
      }
    },
    "description": "Dummy user description",
    "followers_count": 100,
    "followings_count": 50,
    "first_name": "Dummy",
    "full_name": "Dummy User",
    "groups_count": 0,
    "id": 987654321,
    "kind": "user",
    "last_modified": "2025-01-01T12:00:00Z",
    "last_name": "User",
    "likes_count": 10,
    "playlist_likes_count": 1,
    "permalink": "dummyuser",
    "permalink_url": "https://sound.com/dummyuser",
    "playlist_count": 0,
    "reposts_count": null,
    "track_count": 3,
    "uri": "https://api.sound.com/users/987654321",
    "urn": "sound:users:987654321",
    "username": "DummyUser",
    "verified": false,
    "visuals": null,
    "badges": {
      "pro": false,
      "creator_mid_tier": false,
      "pro_unlimited": false,
      "verified": false
    },
    "station_urn": "sound:system-playlists:artist-stations:987654321",
    "station_permalink": "artist-stations:987654321",
    "date_of_birth": null
  }
}

```

```javascript
import {SoundCloud} from 'ionic-sound-cloud-loader-api';


const reqHeaders = {
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.118 Safari/537.36',
}

/**
 * Download by Url
 */
await SoundCloud.connect(reqHeaders);

const downloadUrl = await SoundCloud.download(url, reqHeaders);
console.log(downloadUrl);
// https://cf-media.cdn.com/6adykLZcm.128.mp3?Policy=...
```
## License

Apache Version 2.0

See [LICENSE](https://github.com/appit-online/ionic-sound-cloud-loader-api/blob/master/LICENSE)
