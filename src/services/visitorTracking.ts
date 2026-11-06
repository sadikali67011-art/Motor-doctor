export interface VisitorLocation {
  city?: string;
  region?: string;
  country?: string;
  latitude?: number | null;
  longitude?: number | null;
  accuracy?: number;
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

// Function to get high-accuracy GPS coordinates or IP fallback
export async function getVisitorLocation(): Promise<VisitorLocation> {
  return new Promise((resolve) => {
    // Try browser HTML5 geolocation first
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
            city: "GPS Detected",
            region: "India",
            country: "India"
          });
        },
        async () => {
          // If user denies or error, fallback to IP geo service
          try {
            const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(3000) });
            if (res.ok) {
              const data = await res.json();
              return resolve({
                city: data.city || "Mumbai",
                region: data.region || "Maharashtra",
                country: data.country_name || "India",
                latitude: data.latitude || 19.076,
                longitude: data.longitude || 72.877
              });
            }
          } catch {
            // Default Indian metropolitan center
            resolve({
              city: "Delhi NCR",
              region: "Delhi",
              country: "India",
              latitude: 28.6139,
              longitude: 77.209
            });
          }
        },
        { timeout: 4000, enableHighAccuracy: true }
      );
    } else {
      resolve({
        city: "Mumbai",
        region: "Maharashtra",
        country: "India",
        latitude: 19.076,
        longitude: 72.877
      });
    }
  });
}

// Track visit and send to backend
export async function sendVisitorPing(userIdentifier?: string) {
  try {
    const { device, browser, os } = detectDeviceInfo();
    const location = await getVisitorLocation();

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
  } catch (err) {
    console.warn("Visitor ping skipped (offline/local):", err);
  }
}
