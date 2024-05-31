document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const video = document.getElementById('filler-video');
    const submitButton = form.querySelector('button[type="submit"]');

    // Enable the submit button after the video ends
    video.addEventListener('ended', () => {
        submitButton.disabled = false;
        alert('Thank you for watching the video. You can now submit the form.');
    });

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        if (name && email) {
            alert(`Thank you, ${name}! Your email ${email} has been received.`);
            form.reset();
            submitButton.disabled = true;  // Re-disable the submit button
        } else {
            alert('Please fill out all fields.');
        }
    });
});
