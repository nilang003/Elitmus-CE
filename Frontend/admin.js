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


const image = document.getElementById('image');

fetch('http://localhost:5000/api/products', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
})
    .then(response => response.json())
    .then(data => {
        console.log(data[data.length - 1].image);

        for (const i of data.reverse()) {
            const img = new Image();
            img.src = `C:\\Users\\nktha\\Desktop\\Backend\\Backend\\${i.image}`
            const div = document.createElement('div');

            // Create a timestamp element for each image
            const timestamp = document.createElement('p');
            timestamp.textContent = new Date(i.timeStamp).toLocaleString();

            // Add the image and timestamp to the div
            div.appendChild(img);
            div.appendChild(timestamp);
            document.body.appendChild(div);
        }
        // image.src = `C:\\Users\\nktha\\Desktop\\Backend\\Backend\\${data[data.length - 1].image}`;
        console.log('Data submitted successfully');
    })
    .catch(error => {
        console.error(error);
        console.log('An error occurred while submitting the data');
    });