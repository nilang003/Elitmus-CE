const video = document.getElementById('videoElement');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const BITLY_ACCESS_TOKEN = "4ceb58c78a30d28a1feffd40cc34c6b21626e4b7";

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
        video.play();
    })
    .catch(err => {
        console.error(`An error occurred: ${err}`);
    });

let click = function () {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const uri = canvas.toDataURL(0.1);
    const date = Date.now();
    let ans = [uri, date]
    return ans;
};


async function shortenUrl(url) {
    const response = await fetch(`https://api-ssl.bitly.com/v4/shorten`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${BITLY_ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        long_url: url
      })
    });
    const json = await response.json();
    return json.link;
  }


setInterval(() => {
    let img = click();
    let uri = img[0]
    let timeStapmp = img[1]
    let shorturi = shortenUrl(uri);
    console.log(shorturi)
    //console.log(uri);
    // console.log(timeStapmp);
    const data = { timeStapmp, productImage: uri }
    fetch('http://localhost:5000/api/products', {
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
}, 1 * 60 * 1000);


const longUrl = "https://example.com/image.jpg";
shortenUrl(longUrl)
  .then(shortUrl => {
    console.log(shortUrl);
  })
  .catch(error => {
    console.error(error);
  });




// fetch('http://localhost:5000/api/product', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             console.log('Data submitted successfully');
//         })
//         .catch(error => {
//             console.error(error);
//             console.log('An error occurred while submitting the data');
//         });