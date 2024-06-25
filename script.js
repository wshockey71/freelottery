document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const submitButton = form.querySelector('button[type="submit"]');
    let player;

    // Menu toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-nav');
    });

    window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('filler-video', {
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
    };

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.ENDED) {
            submitButton.disabled = false;
            alert('Thank you for watching the video. You can now submit the form.');
        }
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Disable the submit button to prevent multiple submissions
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        const company = document.getElementById('company').value;
        const correctAnswer = 'Coke';
        if (company.trim().toLowerCase() !== correctAnswer.toLowerCase()) {
            alert('Incorrect answer for the advertisement question.');
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
            return;
        }

        const formData = new FormData(form);
        fetch('https://script.google.com/macros/s/AKfycbyMrnn6RQBKgYGkmE80G3u6FhUVKrHT10xDs-rR9gNQcxdaHTXFj2N6N4HA76_NvE6c/exec', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert('Thank you for your submission! Winners will receive an email on July 3rd.');
                form.reset();
                submitButton.textContent = 'Submit';
            } else {
                return response.json().then(data => {
                    alert(`Oops! There was a problem with your submission. ${data.result}`);
                    submitButton.disabled = false;
                    submitButton.textContent = 'Submit';
                });
            }
        }).catch(error => {
            console.error('Error:', error);
            alert('Oops! There was a problem with your submission.');
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
        });
    });
});
