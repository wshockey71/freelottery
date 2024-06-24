document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const video = document.getElementById('filler-video');
    const submitButton = form.querySelector('button[type="submit"]');

    // Enable the submit button after the video ends
    video.addEventListener('load', () => {
        // Attach event listener after video is loaded
        video.contentWindow.postMessage('{"event":"listening","id":1,"channel":"widget"}', '*');
    });

    window.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        if (data.event === 'infoDelivery' && data.info && data.info.playerState === 0) { // 0 means ended
            submitButton.disabled = false;
            alert('Thank you for watching the video. You can now submit the form.');
        }
    });

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const company = document.getElementById('company').value;
        const correctAnswer = 'Coke'; // Correct answer for the advertisement question
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
                alert('Thank you for your submission! Winners will receive an email on July 3rd.');
                form.reset();
                submitButton.disabled = true;  // Re-disable the submit button
            } else {
                alert('Oops! There was a problem with your submission.');
            }
        }).catch(error => {
            alert('Oops! There was a problem with your submission.');
        });
    });
});
