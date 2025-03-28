import Technicians from '../models/technician.model.js';
import User from '../models/user.model.js';

export const techReportCreationByDoctor = async(req, res) => {
    try {
        const { technicianRequests } = req.body;
        console.log("Technician Requests", technicianRequests);

        for(const request of technicianRequests) {
            const { request_type, ...requestData } = request;

            let technician;
            if (request_type === "Scan") {
                // Find a scan staff technician
                technician = await User.findOne({ 
                    role: 'technician',
                    'technicianDetails.staff_role': 'Scan Staff',
                    status: 'active'
                });
                console.log("Technician", technician);
                
                if (!technician) {
                    console.log("No scan staff found");
                    return res.status(404).json({ message: "No scan staff found" });
                }

                // Create or update technician record
                await Technician.findOneAndUpdate(
                    { user_id: technician._id },
                    {
                        $push: {
                            scan_requests: {
                                appointment_id: requestData.appointment_id,
                                doctor_id: requestData.doctor_id,
                                doctor_name: requestData.doctor_name,
                                patient_id: requestData.patient_id,
                                patient_name: requestData.patient_name,
                                scan_type: requestData.scan_type,
                                observations: requestData.observations || "",
                                scan_status: "Pending"
                            }
                        }
                    },
                    { 
                        upsert: true,
                        new: true,
                        setDefaultsOnInsert: true
                    }
                );
            }

            if (request_type === "Lab Test") {
                console.log("Lab Test");
                technician = await User.findOne({ 
                    role: 'technician',
                    'technicianDetails.staff_role': 'Lab Staff',
                    status: 'active'
                });

                if (!technician) {
                    console.log("No lab staff found");
                    return res.status(404).json({ message: "No lab staff found" });
                }

                await Technician.findOneAndUpdate(
                    { user_id: technician._id },
                    {
                        $push: {
                            lab_requests: {
                                appointment_id: requestData.appointment_id,
                                doctor_id: requestData.doctor_id,
                                doctor_name: requestData.doctor_name,
                                patient_id: requestData.patient_id,
                                patient_name: requestData.patient_name,
                                test_type: requestData.test_type,
                                observations: requestData.observations || "",
                                test_status: "Pending"
                            }
                        }
                    },
                    { 
                        upsert: true,
                        new: true,
                        setDefaultsOnInsert: true
                    }
                );
            }
        }

        res.status(200).json({ message: "Technician requests created successfully" });

    } catch(error) {
        console.error("Error creating technician requests:", error);
        res.status(500).json({ message: "Error creating technician requests", error: error.message });
    }
}

export const fetchScanReports = async(req,res)=>{
    try{
        console.log("entered");
        const reports = await Technicians.find();
        console.log("found reports", reports);
        if (!reports) {
            return res.status(404).json({ message: "No scan reports found" });
        }
        
        res.status(200).json(reports);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const fetchLabReports = async(req,res)=>{
    try{
        const reports = await Technicians.find();
        console.log("found reports", reports);
        if (!reports) {
            return res.status(404).json({ message: "No lab reports found" });
        }
        
        res.status(200).json(reports);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}