export interface VisitorLocation {
  city: string;
  region: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  accuracy?: number | null;
  address?: string;
  ip?: string;
}

export function detectDeviceInfo() {
  const ua = navigator.userAgent;
  let device = "Desktop";
  if (/mobile/i.test(ua)) device = "Mobile";
  else if (/tablet|ipad/i.test(ua)) device = "Tablet";

  let browser = "Browser";
  if (/chrome|crios/i.test(ua)) browser = "Chrome";
  else if (/firefox|fxios/i.test(ua)) browser = "Firefox";
  else if (/safari/i.test(ua)) browser = "Safari";
  else if (/edg/i.test(ua)) browser = "Edge";

  let os = "Unknown OS";
  if (/windows/i.test(ua)) os = "Windows";
  else if (/android/i.test(ua)) os = "Android";
  else if (/iphone|ipad|ipod/i.test(ua)) os = "iOS";
  else if (/macintosh|mac os x/i.test(ua)) os = "macOS";
  else if (/linux/i.test(ua)) os = "Linux";

  return { device, browser, os };
}

// Live GPS Coordinates with Reverse Geocoding
export async function getLiveGPSLocation(): Promise<VisitorLocation> {
  return new Promise((resolve) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const accuracy = Math.round(position.coords.accuracy);

          // Try reverse geocoding via OpenStreetMap Nominatim (Free, no API key needed)
          let city = "Detected Location";
          let region = "India";
          let address = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;

          try {
            const geoRes = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=14&addressdetails=1`,
              { signal: AbortSignal.timeout(3500) }
            );
            if (geoRes.ok) {
              const geoData = await geoRes.json();
              city =
                geoData.address.city ||
                geoData.address.town ||
                geoData.address.suburb ||
                geoData.address.county ||
                "Live Location";
              region = geoData.address.state || "India";
              address = geoData.display_name?.split(",").slice(0, 3).join(",") || address;
            }
          } catch {
            // Reverse geocode fallback
          }

          resolve({
            latitude: lat,
            longitude: lon,
            accuracy,
            city,
            region,
            country: "India",
            address
          });
        },
        async (err) => {
          console.warn("GPS Geolocation error or denied:", err.message);
          // Fallback to IP geolocation
          const ipLoc = await getIPLocationFallback();
          resolve(ipLoc);
        },
        {
          enableHighAccuracy: true,
          timeout: 7000,
          maximumAge: 10000
        }
      );
    } else {
      getIPLocationFallback().then(resolve);
    }
  });
}

// IP-based Geolocation Fallback
async function getIPLocationFallback(): Promise<VisitorLocation> {
  try {
    const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(3500) });
    if (res.ok) {
      const data = await res.json();
      return {
        city: data.city || "Mumbai",
        region: data.region || "Maharashtra",
        country: data.country_name || "India",
        latitude: data.latitude || 19.076,
        longitude: data.longitude || 72.8777,
        ip: data.ip,
        address: `${data.city || "Mumbai"}, ${data.region || "Maharashtra"}`
      };
    }
  } catch (e) {
    // offline default
  }

  return {
    city: "Delhi NCR",
    region: "Delhi",
    country: "India",
    latitude: 28.6139,
    longitude: 77.209,
    address: "Delhi NCR, India"
  };
}

// Send live visitor ping with exact GPS coordinates to backend
export async function sendVisitorPing(userIdentifier?: string) {
  try {
    const { device, browser, os } = detectDeviceInfo();
    const location = await getLiveGPSLocation();

    await fetch("http://localhost:5000/api/track-visitor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...location,
        device,
        browser,
        os,
        page: window.location.pathname + window.location.hash,
        user: userIdentifier || "Guest Visitor",
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight
      })
    });

    return location;
  } catch (err) {
    console.warn("Visitor ping skipped (offline/local):", err);
    return null;
  }
}

export const getVisitorLocation = getLiveGPSLocation;
