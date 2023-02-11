const dataName = document.getElementById('name');
const dataEmail = document.getElementById('email');
const dataIcode = document.getElementById('icode');

fetch('http://localhost:5000/api/user', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
})
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log('Data retrieved successfully');
        dataName.innerHTML = `Name: ${data[data.length - 1].name}`;
        dataEmail.innerHTML = `Email: ${data[data.length - 1].email}`;
        dataIcode.innerHTML = `Invitation Code: ${data[data.length - 1].pin}`;

    })
    .catch(error => {
        console.error(error);
        console.log('An error occurred while retrieving the data');
    });


