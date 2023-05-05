
const submitFormHandler = async (event) => {
    event.preventDefault();

    // window.location gives us access to the URL. We then use the .split() method to access the number at the end of the URL and set that equal to id.
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    // Collect value from the form
    const content = document.querySelector("#newcomment").value.trim();

    console.log(content);

    if (content) {
        // Send a POST request to the API endpoint
        const response = await fetch(`/api/comment/${id}`, {
            method: 'POST',
            body: JSON.stringify({content}),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector(".newcommentform")
    .addEventListener("submit", submitFormHandler);