document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const submitButton = form.querySelector('button[type="submit"]');
    let player;

    // This function creates an <iframe> (and YouTube player)
    // after the API code downloads.
    window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('filler-video', {
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
    };

    // The API will call this function when the player's state changes.
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.ENDED) {
            submitButton.disabled = false;
            alert('Thank you for watching the video. You can now submit the form.');
        }
    }

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
