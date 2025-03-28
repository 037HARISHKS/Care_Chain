import mongoose from "mongoose";

const TechnicianSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
  },
  staff_role: { 
    type: String, 
    enum: ["Scan Staff", "Lab Staff"], 
  },
  
  scan_requests: [{
    appointment_id: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    scan_type: { type: String, required: true },
    scan_status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
    observations: { type: String },
    scan_report: { type: String },
    reported_at: { type: Date }
  }],

  lab_requests: [{
    appointment_id: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    doctor_name: { type: String, required: true },
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    patient_name: { type: String, required: true },
    test_type: { type: String, required: true }, // Example: Blood Test, Urine Test
    test_status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
    observations: { type: String }, // Staff's observations on the test
    test_report: { type: String }, // URL or Path of the test report
    reported_at: { type: Date }
  }]
});

TechnicianSchema.index({ user_id: 1 });
TechnicianSchema.index({ 'scan_requests.appointment_id': 1 });
TechnicianSchema.index({ 'lab_requests.appointment_id': 1 });

const Technician = mongoose.model("Technician", TechnicianSchema);

export default Technician;
