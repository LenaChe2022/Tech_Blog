
const submitFormHandler = async (event) => {
    event.preventDefault();

    // window.location gives us access to the URL. We then use the .split() method to access the number at the end of the URL and set that equal to id.
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    // Collect value from the form
    const content = document.querySelector("#newcomment").value.trim();
    const user_id = document.querySelector("#user_id").value;
    console.log(content);
    console.log(user_id, "user_id");
    console.log(post_id, "post_id");

    if (content) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({content, post_id, user_id}),
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