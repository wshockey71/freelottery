document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const submitButton = form.querySelector('button[type="submit"]');
    const correctAnswer = 'Coke'; // Correct answer for the advertisement question

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const company = document.getElementById('company').value;
        if (company.trim().toLowerCase() !== correctAnswer.toLowerCase()) {
            alert('Incorrect answer for the advertisement question.');
            return;
        }

        const formData = new FormData(form);
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert('Thank you for your submission!');
                form.reset();
                submitButton.disabled = true;  // Re-disable the submit button
            } else {
                alert('Oops! There was a problem with your submission.');
            }
        }).catch(error => {
            alert('Oops! There was a problem with your submission.');
        });
    });

    // Logic to enable the submit button after the video ends
    const videoIframe = document.querySelector('iframe');
    videoIframe.addEventListener('load', () => {
        const videoPlayer = videoIframe.contentWindow.document;
        const video = videoPlayer.querySelector('video');

        if (video) {
            video.addEventListener('ended', () => {
                submitButton.disabled = false;
                alert('Thank you for watching the video. You can now submit the form.');
            });
        } else {
            submitButton.disabled = false; // Enable the button if the video element is not found
        }
    });
});
