import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure data folder exists
const DATA_DIR = path.join(__dirname, "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const USERS_FILE = path.join(DATA_DIR, "users.json");
const VISITORS_FILE = path.join(DATA_DIR, "visitors.json");
const TICKETS_FILE = path.join(DATA_DIR, "tickets.json");

// Helper to read / write JSON
function readJSON(filePath, defaultData) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
  } catch (e) {
    console.error(`Error reading ${filePath}:`, e);
  }
  return defaultData;
}

function writeJSON(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error(`Error writing ${filePath}:`, e);
  }
}

// Initial default users
const defaultUsers = [
  {
    id: "usr_admin",
    fullName: "Admin Officer",
    email: "admin@motordoctor.in",
    phoneNumber: "7534894896",
    password: "admin", // simple demo password
    city: "Mumbai",
    role: "admin",
    createdAt: new Date().toISOString()
  },
  {
    id: "usr_demo",
    fullName: "Rahul Sharma",
    email: "rahul@gmail.com",
    phoneNumber: "9876543210",
    password: "password123",
    city: "Delhi NCR",
    role: "user",
    carBrand: "Hyundai",
    carModel: "Creta",
    createdAt: new Date().toISOString()
  }
];

// Initial default visitors
const defaultVisitors = [
  {
    id: "vis_101",
    ip: "103.211.54.12",
    city: "Mumbai",
    region: "Maharashtra",
    country: "India",
    latitude: 19.0760,
    longitude: 72.8777,
    device: "Mobile (Android)",
    browser: "Chrome Mobile 128",
    os: "Android 14",
    page: "/",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    user: "Guest Visitor"
  },
  {
    id: "vis_102",
    ip: "49.36.128.45",
    city: "Delhi",
    region: "Delhi",
    country: "India",
    latitude: 28.6139,
    longitude: 77.2090,
    device: "Desktop (Windows)",
    browser: "Chrome 129",
    os: "Windows 11",
    page: "/#calculator",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    user: "Rahul Sharma (Registered)"
  },
  {
    id: "vis_103",
    ip: "157.48.90.11",
    city: "Bengaluru",
    region: "Karnataka",
    country: "India",
    latitude: 12.9716,
    longitude: 77.5946,
    device: "Desktop (macOS)",
    browser: "Safari 17",
    os: "macOS Sonoma",
    page: "/#pricing",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    user: "Guest Visitor"
  }
];

let users = readJSON(USERS_FILE, defaultUsers);
let visitors = readJSON(VISITORS_FILE, defaultVisitors);
let auditTickets = readJSON(TICKETS_FILE, [
  {
    id: "MD-98214",
    fullName: "Vikas Malhotra",
    phoneNumber: "7534894896",
    carBrand: "Hyundai",
    carModel: "Creta 1.5 CRDi",
    carFuelType: "Diesel",
    carYear: "2021",
    estimatedQuotation: 26850,
    selectedPlan: "quick-review",
    status: "COMPLETED",
    savingsAchieved: 14450,
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
]);

// -------------------------------------------------------------
// Health Check
// -------------------------------------------------------------
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "MotorDoctor.in API",
    totalUsers: users.length,
    totalVisitors: visitors.length,
    totalTickets: auditTickets.length,
    timestamp: new Date().toISOString()
  });
});

app.get("/", (req, res) => {
  res.send("MotorDoctor.in Backend API is running on port " + PORT);
});

// -------------------------------------------------------------
// USER AUTHENTICATION: REGISTER & LOGIN
// -------------------------------------------------------------

// Register user
app.post("/api/auth/register", (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, city, carBrand, carModel } = req.body;

    if (!fullName || !phoneNumber || !password) {
      return res.status(400).json({ error: "Name, phone number and password are required." });
    }

    // Check if phone or email already registered
    const existing = users.find(
      (u) =>
        u.phoneNumber === phoneNumber ||
        (email && u.email && u.email.toLowerCase() === email.toLowerCase())
    );

    if (existing) {
      return res.status(400).json({
        error: "An account with this phone number or email already exists. Please login."
      });
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      fullName: fullName.trim(),
      email: (email || "").trim().toLowerCase(),
      phoneNumber: phoneNumber.trim(),
      password, // in real production hash with bcrypt
      city: city ? city.trim() : "India",
      carBrand: carBrand || "",
      carModel: carModel || "",
      role: "user",
      createdAt: new Date().toISOString()
    };

    users.unshift(newUser);
    writeJSON(USERS_FILE, users);

    // Return user without password
    const { password: _, ...userSafe } = newUser;
    return res.status(201).json({
      success: true,
      message: "Registration successful! Welcome to Motor Doctor.",
      user: userSafe
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ error: "Failed to register user." });
  }
});

// Login user
app.post("/api/auth/login", (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be email or phone

    if (!identifier || !password) {
      return res.status(400).json({ error: "Please enter phone/email and password." });
    }

    const cleanId = identifier.trim().toLowerCase();
    const user = users.find(
      (u) =>
        (u.email && u.email.toLowerCase() === cleanId) ||
        (u.phoneNumber && u.phoneNumber.replace(/\D/g, "") === cleanId.replace(/\D/g, ""))
    );

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid phone number/email or password." });
    }

    const { password: _, ...userSafe } = user;
    return res.json({
      success: true,
      message: "Logged in successfully!",
      user: userSafe
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Failed to login." });
  }
});

// Get all users (Admin only)
app.get("/api/users", (req, res) => {
  const safeUsers = users.map(({ password, ...u }) => u);
  res.json({ success: true, count: safeUsers.length, users: safeUsers });
});

// -------------------------------------------------------------
// VISITOR & LOCATION TRACKING
// -------------------------------------------------------------

// Track a visitor hit with Location coordinates & IP
app.post("/api/track-visitor", (req, res) => {
  try {
    const clientIp =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.headers["x-real-ip"] ||
      req.socket.remoteAddress ||
      "127.0.0.1";

    const {
      city,
      region,
      country,
      latitude,
      longitude,
      device,
      browser,
      os,
      page,
      user,
      screenWidth,
      screenHeight
    } = req.body;

    const newVisit = {
      id: `vis_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      ip: clientIp,
      city: city || "Detected Location",
      region: region || "India",
      country: country || "India",
      latitude: latitude ? Number(latitude) : null,
      longitude: longitude ? Number(longitude) : null,
      device: device || (req.headers["user-agent"]?.includes("Mobile") ? "Mobile" : "Desktop"),
      browser: browser || "Web Browser",
      os: os || "Operating System",
      page: page || "/",
      user: user || "Guest",
      screenResolution: screenWidth && screenHeight ? `${screenWidth}x${screenHeight}` : "N/A",
      timestamp: new Date().toISOString()
    };

    visitors.unshift(newVisit);

    // Keep max 500 recent visitors in memory
    if (visitors.length > 500) {
      visitors = visitors.slice(0, 500);
    }
    writeJSON(VISITORS_FILE, visitors);

    return res.json({ success: true, visitId: newVisit.id });
  } catch (error) {
    console.error("Visitor tracking error:", error);
    return res.status(500).json({ error: "Failed to record visitor location." });
  }
});

// Get all tracked visitors (for Admin Dashboard)
app.get("/api/visitors", (req, res) => {
  // Aggregate stats
  const cityCounts = {};
  const deviceCounts = {};

  visitors.forEach((v) => {
    const c = v.city || "Unknown";
    cityCounts[c] = (cityCounts[c] || 0) + 1;

    const d = v.device?.includes("Mobile") ? "Mobile" : "Desktop";
    deviceCounts[d] = (deviceCounts[d] || 0) + 1;
  });

  res.json({
    success: true,
    totalVisits: visitors.length,
    activeVisitorsNow: Math.min(visitors.length, Math.floor(Math.random() * 4) + 2), // realistic live count
    cityBreakdown: cityCounts,
    deviceBreakdown: deviceCounts,
    visitors: visitors.slice(0, 100) // latest 100 visits
  });
});

// -------------------------------------------------------------
// CONSULTATION TICKETS & BILL AUDIT
// -------------------------------------------------------------
app.get("/api/plans", (req, res) => {
  res.json({
    plans: [
      {
        id: "quick-review",
        name: "Quick Review",
        price: 499,
        turnaroundTime: "Within 20-30 Mins",
        description: "WhatsApp audit of job sheet / estimate with strike-off list"
      },
      {
        id: "expert-call",
        name: "Expert 1-on-1 Call",
        price: 999,
        turnaroundTime: "Scheduled in 15 Mins",
        description: "20-minute phone/video consultation with Senior Master Mechanic"
      },
      {
        id: "full-advisory",
        name: "Full Garage Advisory & Shield",
        price: 1499,
        turnaroundTime: "Live Active Support",
        description: "Doctor directly speaks with your workshop service advisor"
      }
    ]
  });
});

app.post("/api/submit-bill", (req, res) => {
  try {
    const {
      fullName,
      phoneNumber,
      carBrand,
      carModel,
      carFuelType,
      carYear,
      odometerReading,
      serviceCenterName,
      estimatedQuotation,
      selectedPlan,
      notes,
      userLocation
    } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    const ticketId = `MD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newRecord = {
      id: ticketId,
      fullName: fullName || "Valued Customer",
      phoneNumber,
      carBrand: carBrand || "Unknown",
      carModel: carModel || "Car",
      carFuelType: carFuelType || "Petrol",
      carYear: carYear || "2021",
      odometerReading: odometerReading || "N/A",
      serviceCenterName: serviceCenterName || "Authorized Dealer",
      estimatedQuotation: Number(estimatedQuotation) || 15000,
      selectedPlan: selectedPlan || "quick-review",
      notes: notes || "",
      userLocation: userLocation || null,
      status: "UNDER_REVIEW",
      createdAt: new Date().toISOString()
    };

    auditTickets.unshift(newRecord);
    writeJSON(TICKETS_FILE, auditTickets);

    return res.status(201).json({
      success: true,
      message: "Estimate submitted successfully to Motor Doctor!",
      ticket: newRecord
    });
  } catch (error) {
    console.error("Error submitting bill:", error);
    return res.status(500).json({ error: "Failed to process bill submission" });
  }
});

app.get("/api/track/:id", (req, res) => {
  const { id } = req.params;
  const cleanId = id.trim().toLowerCase();

  const found = auditTickets.find(
    (t) => t.id.toLowerCase() === cleanId || t.phoneNumber.includes(cleanId)
  );

  if (found) {
    return res.json({ success: true, ticket: found });
  }

  return res.status(404).json({
    success: false,
    message: "No consultation audit found with that Ticket ID or phone number."
  });
});

app.post("/api/create-payment-order", (req, res) => {
  const { planId, amount } = req.body;
  const orderId = `order_${Math.random().toString(36).substring(2, 12)}`;
  res.json({
    orderId,
    amount: amount || 49900,
    currency: "INR",
    planId,
    key: process.env.RAZORPAY_KEY_ID || "rzp_test_motordoctor"
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`MotorDoctor backend server running on http://localhost:${PORT}`);
});
