const form = document.getElementById('form');
const submitLink = document.getElementById('submitBtn');

submitLink.addEventListener('click', (event) => {
    console.log("hiii")
    event.preventDefault();
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const pin = form.elements.icode.value;

    const data = { name, email, pin };

    fetch('http://localhost:5000/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log('Data submitted successfully');
        })
        .catch(error => {
            console.error(error);
            console.log('An error occurred while submitting the data');
        });

    window.open('webcam.html', '', width = 800, height = 600, toolbar = 0);
});

