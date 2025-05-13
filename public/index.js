// Simplified Form Handler


    const form = document.getElementById("sales-rep-submit");
    
if (form && !form.dataset.listenerAttached) {
    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission
        await sendForm(); // Call the async function to handle the form submission
        event.target.reset(); // Reset the form after submission
    });

    // Mark the form to indicate the listener is attached
    form.dataset.listenerAttached = true;
} else if (!form) {
    console.error("Form element not found!");
}

    const sendForm = async () => {
        // Collect form data manually
        const formData = {
            submitterName: document.getElementById("submitter-name").value,
            company: document.getElementById("company").value,
            collaboratorFirstName: document.getElementById("collaborator-first-name").value,
            collaboratorLastName: document.getElementById("collaborator-last-name").value,
            collaboratorDepartment: document.getElementById("department").value,
            collaboratorTitle: document.getElementById("collaborator-title").value,
            region: document.getElementById("region").value,
            district: document.getElementById("district").value,
            territory: document.getElementById("territory").value,
            reportsTo: document.getElementById("reports-to").value,
            homeZip: document.getElementById("home-zip").value,
            homeState: document.getElementById("home-state").value,
            notes: document.getElementById("notes").value
        };

        try {
            // Send the form data to the server as JSON
            const response = await fetch('https://api-lvu3rvyduq-uc.a.run.app/submitForm', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            // Check if the response is successful
            if (!response.ok) {
                throw new Error(`Server error: ${response.status} ${response.statusText}`);
            }

            // Parse and handle the server's response
            const result = await response.json();
            console.log("Form submitted successfully:", result);
            alert("Form submitted successfully!");
        } catch (e) {
            // Handle errors during the fetch request
            console.error("Error submitting the form:", e);
            alert("There was an error submitting the form. Please try again.");
        }
    };

