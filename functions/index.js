const express = require("express");
const cors = require("cors");
const { onRequest } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const CollaboratorWorker = require("./collaborator.service.js");

// Initialize Firebase Admin
initializeApp();

// Create an Express app
const app = express();

// Middleware
app.use(cors({ origin: true })); // Allow all origins
app.use(express.json()); // Parse JSON request bodies

// Define routes
app.post("/submitForm", async (req, res) => {
    try {
        const txtData = req.body;
        const collab = {
            submitterName: txtData.submitterName,
            company: txtData.company,
            collaboratorName: String(txtData.collaboratorFirstName + " " + txtData.collaboratorLastName).toUpperCase().trim(),
            collaboratorDepartment: txtData.collaboratorDepartment,
            collaboratorTitle: txtData.collaboratorTitle,
            region: txtData["region"],
            district: txtData["district"],
            territory: txtData["territory"],
            zip: txtData.homeZip,
            state: txtData.homeState,
            reportsTo: txtData.reportsTo,
            notes: txtData.notes,
        };

        const dbWorker = new CollaboratorWorker();
        await dbWorker.addCollaborator(collab);
        res.status(200).json({ message: "Form submitted successfully" });
    } catch (error) {
        console.error("Error handling /submitForm:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Export the Express app as a Firebase Function
exports.api = onRequest(app);