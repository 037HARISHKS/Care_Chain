import Report from '../models/report.model.js';
import Application from '../models/application.model.js'; // Updated to use Application model

export const createReport = async (req, res) => {
  try {
    console.log("Received request to create report:", req.body);

    const { appointmentId, name, patientId, age, medicineSuggested, remarks, generateReport } = req.body;
    const doctorId = req.user.id; // Assuming you have user authentication

    console.log("Finding application with ID:", appointmentId);
    const application = await Application.findById(appointmentId); // Updated to use Application model

    if (!application) {
      console.log("Application not found for ID:", appointmentId);
      return res.status(404).json({ message: 'Application not found' });
    }

    console.log("Creating report with data:", {
      appointmentId,
      doctorId,
      patientId,
      name,
      age,
      medicineSuggested,
      remarks,
      generateReport,
    });

    const report = new Report({
      appointmentId,
      doctorId,
      patientId,
      name,
      age,
      medicineSuggested,
      remarks,
      generateReport,
      reportFile: null, // No file upload, set to null
    });

    await report.save();
    console.log("Report created successfully:", report);
    res.status(201).json(report);
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getReportsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    console.log("Fetching reports for patient ID:", patientId);

    const reports = await Report.find({ patientId }).populate('doctorId', 'name');
    console.log("Reports fetched successfully:", reports);

    res.status(200).json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getReportById = async (req, res) => {
  try {
    const { appointmentId } = req.query; // Get appointmentId from query parameters
    console.log("Fetching report details for appointment ID:", appointmentId);

    const report = await Report.findOne({ appointmentId }) // Find report by appointmentId
      .populate('doctorId', 'name')
      .populate('patientId', 'name');

    if (!report) {
      console.log("Report not found for appointment ID:", appointmentId);
      return res.status(404).json({ message: 'Report not found' });
    }

    console.log("Report details fetched successfully:", report);
    res.status(200).json(report);
  } catch (error) {
    console.error("Error fetching report details:", error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}; 