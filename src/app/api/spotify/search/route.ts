import { NextResponse } from 'next/server';

// Simple in-memory cache for the Spotify access token
let cachedToken: string | null = null;
let tokenExpiry: number = 0;

async function getSpotifyAccessToken() {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!client_id || !client_secret) {
    throw new Error('Spotify credentials not set');
  }

  // Check if we have a valid cached token
  const now = Date.now();
  if (cachedToken && now < tokenExpiry) {
    return cachedToken;
  }

  // Get new access token using Client Credentials Flow
  const authOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  };

  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', authOptions);
  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok) {
    console.error('Spotify token error:', tokenData);
    throw new Error('Failed to get Spotify access token');
  }

  cachedToken = tokenData.access_token;
  // Set expiry with a small buffer (5 minutes / 300 seconds)
  tokenExpiry = Date.now() + (tokenData.expires_in - 300) * 1000;

  return cachedToken;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  try {
    const accessToken = await getSpotifyAccessToken();

    // 2. Search for the track
    const searchOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    };

    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`;
    const searchResponse = await fetch(searchUrl, searchOptions);
    const searchData = await searchResponse.json();

    if (!searchResponse.ok) {
      console.error('Spotify search error:', searchData);
      return NextResponse.json({ error: 'Failed to search Spotify' }, { status: searchResponse.status });
    }

    return NextResponse.json(searchData.tracks.items);

  } catch (error: unknown) {
    console.error('API Route Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    if (errorMessage === 'Spotify credentials not set') {
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
