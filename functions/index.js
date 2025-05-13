//Firebase Functions
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

//Firestore
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore")

//Service Workers
const CollaboratorWorker = require("./collaborator.service.js");

initializeApp();

exports.submitForm = onRequest(async (req, res) => {
    console.log("Request received: ", req.body);
    const txtData = req.body;
    let collab = {
        submitterName: txtData.submitterName,
        company: txtData.company,
        collaboratorName: String(txtData.collaboratorFirstName + " " + txtData.collaboratorLastName).toUpperCase(),
        collaboratorDepartment: txtData.collaboratorDepartment,
        collaboratorTitle: txtData.collaboratorTitle,
        region: txtData["region"],
        district: txtData["district"],
        territory: txtData["territory"],
        zip: txtData.homeZip,
        state: txtData.homeState,
        reportsTo: txtData.reportsTo,
        notes: txtData.notes
    }
    const dbWorker = new CollaboratorWorker();
    dbWorker.addCollaborator(collab);
});


