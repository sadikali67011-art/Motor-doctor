import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory store for consultation audit tickets
const auditTickets = [
  {
    id: "MD-98214",
    fullName: "Vikas Malhotra",
    phoneNumber: "9819912166",
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
];

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "MotorDoctor.in API",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get("/", (req, res) => {
  res.send("MotorDoctor.in Backend API is running smoothly on port " + PORT);
});

// Service Plans endpoint
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

// Submit Service Estimate for Audit
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
      notes
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
      status: "UNDER_REVIEW",
      createdAt: new Date().toISOString()
    };

    auditTickets.unshift(newRecord);

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

// Track Ticket Status
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

// Payment order initialization (Mock / Razorpay)
app.post("/api/create-payment-order", (req, res) => {
  const { planId, amount } = req.body;
  
  // Safe mock order generator if RAZORPAY_KEY is not configured in env
  const orderId = `order_${Math.random().toString(36).substring(2, 12)}`;
  res.json({
    orderId,
    amount: amount || 49900,
    currency: "INR",
    planId,
    key: process.env.RAZORPAY_KEY_ID || "rzp_test_motordoctor"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`MotorDoctor backend server running on http://localhost:${PORT}`);
});
