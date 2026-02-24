# Google Maps Setup Guide

## Issue Fixed ✅

The Google Maps component on the About page has been fixed with the following improvements:

### What Was Fixed

1. **Added Error Handling**: The GoogleMap component now gracefully handles cases where Google Maps API fails to load
2. **Added Loading State**: Shows a loading spinner while waiting for Google Maps to initialize
3. **Added Fallback UI**: If the map fails to load, users see a fallback UI with a link to open the location in Google Maps
4. **Optimized Script Loading**: Changed from `beforeInteractive` to `lazyOnload` strategy for better performance

### Current Status

**The map component will display a fallback UI with "Map Unavailable" message** because the Google Maps API key is not configured yet.

## How to Get Google Maps Working

To enable the actual Google Maps display, you need to:

### Step 1: Get a Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Maps JavaScript API**
4. Create an API key:
   - Go to "Credentials" in the left menu
   - Click "Create Credentials" > "API Key"
   - Copy the generated API key

### Step 2: Configure the API Key

1. Open `.env.local` file in the `aierxuan-website` directory
2. Replace the placeholder with your actual API key:

```bash
# Current (placeholder):
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY_HERE

# Replace with your actual key:
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyB...your_actual_key_here
```

### Step 3: Restart the Development Server

```bash
cd aierxuan-website
npm run dev
```

### Step 4: Verify

Visit http://localhost:3001/about and you should see the Google Map displayed with a marker at:
- **Location**: Juyin Science and Technology Industrial Park, Shenzhen
- **Coordinates**: 22.5431°N, 114.0579°E

## Cost Information

- Google Maps JavaScript API has a **free tier** of $200/month credit
- Most small to medium websites stay within the free tier
- Static map loads typically cost $7 per 1000 loads
- For more details: https://cloud.google.com/maps-platform/pricing

## Security Best Practices

1. **Restrict your API key** in Google Cloud Console:
   - Add HTTP referrer restrictions (e.g., `localhost:3001/*`, `yourdomain.com/*`)
   - Only enable "Maps JavaScript API" for this key

2. **Don't commit API keys** to version control:
   - The `.env.local` file is already in `.gitignore`
   - Never push API keys to GitHub or other public repositories

## Alternative Solution (No API Key Needed)

If you prefer not to use Google Maps API, you can use a static image or OpenStreetMap instead. The current fallback UI includes a "Open in Google Maps" button that works without any API key.

## Files Modified

1. **src/components/GoogleMap.tsx**
   - Added loading state management
   - Added error handling
   - Added fallback UI with link to Google Maps
   - Added try-catch for map initialization

2. **src/app/layout.tsx**
   - Changed script loading strategy from `beforeInteractive` to `lazyOnload`
   - Added error handling for script load failures
   - Added `libraries=places` parameter for future features

## Testing

### Without API Key (Current State)
- Visit http://localhost:3001/about
- You should see a gray box with "Map Unavailable" message
- Click "Open in Google Maps" to view the location

### With API Key (After Configuration)
- Visit http://localhost:3001/about
- You should see an interactive Google Map
- The map should have a marker at AIERXUAN's location
- You can zoom and pan the map

## Support

If you encounter any issues:
1. Check browser console for error messages
2. Verify the API key is correctly set in `.env.local`
3. Ensure the Maps JavaScript API is enabled in Google Cloud Console
4. Verify API key restrictions allow your domain/localhost

---

**Summary**: The Google Maps component is now robust and won't crash if the API key is missing. It will show a user-friendly fallback UI instead. To enable the full map functionality, simply add a valid Google Maps API key to `.env.local`.
