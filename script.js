document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const submitButton = form.querySelector('button[type="submit"]');
    const correctAnswer = 'Coke'; // Correct answer for the advertisement question

    // Function to enable the submit button
    const enableSubmitButton = () => {
        submitButton.disabled = false;
        alert('Thank you for watching the video. You can now submit the form.');
    };

    // Listen for video end event within the iframe
    const videoIframe = document.querySelector('iframe');
    if (videoIframe) {
        videoIframe.addEventListener('load', () => {
            const player = new YT.Player(videoIframe, {
                events: {
                    'onStateChange': (event) => {
                        if (event.data === YT.PlayerState.ENDED) {
                            enableSubmitButton();
                        }
                    }
                }
            });
        });
    }

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
                alert('Thank you for your submission! Winners will be notified via email on July 3rd.');
                form.reset();
                submitButton.disabled = true;  // Re-disable the submit button
            } else {
                alert('Oops! There was a problem with your submission.');
            }
        }).catch(error => {
            console.error('Error:', error);
            alert('Oops! There was a problem with your submission.');
        });
    });
});
