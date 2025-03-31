import ScanReport from '../models/scanReport.model.js';
import Technician from '../models/technician.model.js';

export const createScanReport = async (req, res) => {
  try {
    const { appointmentId, reportType, findings, impression, scanImage } = req.body;

    const scanReport = new ScanReport({
      appointmentId,
      reportType,
      findings,
      impression,
      scanImage,
    });

    await scanReport.save();

    await Technician.updateOne(
      { 'scan_requests.appointment_id': appointmentId },
      { $set: { 'scan_requests.$.scan_status': 'Completed', 'scan_requests.$.scan_report': scanReport._id, 'scan_requests.$.reported_at': new Date() } }
    );

    res.status(201).json(scanReport);
  } catch (error) {
    console.error("Error creating scan report:", error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getScanReports = async (req, res) => {
  try {
    const reports = await ScanReport.find().populate('appointmentId');
    res.status(200).json(reports);
  } catch (error) {
    console.error("Error fetching scan reports:", error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}; 