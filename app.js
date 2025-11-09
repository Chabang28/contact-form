// Firebase configuration (replace with your actual Firebase Web App config)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "contact-form-site-1bb08.firebaseapp.com",
    projectId: "contact-form-site-1bb08",
    storageBucket: "contact-form-site-1bb08.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference Firestore
const db = firebase.firestore();

// Reference the form
const form = document.querySelector('.contact-form');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload

    // Get form values
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Validate fields
    if (!name || !surname || !email || !subject || !message) {
        alert("Please fill in all fields.");
        return;
    }

    // Save data to Firestore
    db.collection('contacts').add({
        name: name,
        surname: surname,
        email: email,
        subject: subject,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        alert('Your message has been sent!');
        form.reset(); // Clear the form
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        alert('Error sending message: ' + error.message);
    });
});
