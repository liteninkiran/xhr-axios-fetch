
    // Store reference to buttons
    const getBtn = document.getElementById('get-btn');
    const postBtn = document.getElementById('post-btn');

    const sendHttpRequest = (method, url, data) =>
    {
        // Create new promise
        const promise = new Promise((resolve, reject) =>
        {
            // Create new HTTP Request object
            const xhr = new XMLHttpRequest();

            // Prepare the HTTP Request
            xhr.open(method, url);

            // Specifying the response type means we do not need to use the JSON.parse() function on the response
            xhr.responseType = 'json';

            // If we are poting a request (i.e. data is not empty) we must tell the server that the data variable is JSON encoded
            if(data)
            {
                // Add to the header
                xhr.setRequestHeader('Content-Type', 'application/json');
            }

            // Add a LOAD event listener
            xhr.onload = () =>
            {
                if(xhr.status >= 400)
                {
                    reject(xhr.response);
                }
                else
                {
                    resolve(xhr.response);
                }
            }

            // Add an ERROR event listener
            xhr.onerror = () =>
            {
                reject('Something went wrong');
            }

            // Send the HTTP Request
            xhr.send(JSON.stringify(data));
        });

        return promise;
    };

    const getData = () =>
    {
        sendHttpRequest('GET', 'https://reqres.in/api/users').then(responseData =>
        {
            console.log(responseData);
        });
    };

    const sendData = () =>
    {
        sendHttpRequest('POST', 'https://reqres.in/api/register',
        {
            "email": "eve.holt@reqres.in",
            //"password": "pistol"
        }).then(responseData =>
        {
            console.log(responseData);
        }).catch(err =>
        {
            console.log(err);
        });
    };

    // Add click event listener
    getBtn.addEventListener('click', getData);
    postBtn.addEventListener('click', sendData);

