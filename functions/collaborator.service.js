const {getFirestore} = require("firebase-admin/firestore")

class CollaboratorWorker {
    #DB = getFirestore();
    #COLLECTION = "Collaborators";
    
    async getAll(){
        const response = await this.#DB.collection(this.#COLLECTION).get()
        .then((qs) => {
            qs.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
            });
        })
        .catch((error) => {
            console.error("Error retrieving data: ", error);
            return console.log("Error retrieving collection" );
        });

    }

    async addCollaborator(collaborator){
        console.log("Adding collaborator: ", collaborator);
        collaborator.createTimestamp = new Date();
        const response = await this.#DB.collection(this.#COLLECTION)
        const validateDoc = response.where(irebase.firestore.FieldPath.documentId(), '==', collaborator.collaboratorName).get();
        if(validateDoc.empty){
            response.doc(collaborator.collaboratorName).set(
            collaborator
        ).then(() => {
            return console.log({result: `Form data saved under: ${collaborator.collaboratorName}`});
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            return console.log({error: "Error adding document " + collaborator});
        });

        } else {
            console.log("This collaborator already exists!");
            return console.log({error: "Document already exists"});
        }
        
        

    }
    async updateCollaborator(collaborator, res){
        console.log("Updating collaborator: ", collaborator);
        collaborator.updateTimestamp = new Date();
        const response = await this.#DB.collection(this.#COLLECTION).doc(collaborator.collaboratorName).update(
            collaborator
        ).then(() => {
            return res.json({result: `Form data updated under: ${response.id}`});
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
            return res.json({error: "Error updating document " + collaborator});
        });
    }
    async deleteCollaborator(collaborator, res){
        console.log("Deleting collaborator: ", collaborator);
        const response = await this.#DB.collection(this.#COLLECTION).doc(collaborator.collaboratorName).delete().then(() => {
            return res.json({result: `Form data deleted under: ${response.id}`});
        })
        .catch((error) => {
            console.error("Error deleting document: ", error);
            return res.json({error: "Error deleting document " + collaborator});
        });
    }
}

module.exports = CollaboratorWorker;