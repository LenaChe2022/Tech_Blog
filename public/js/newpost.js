const submitFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the form
    const title = document.querySelector("#title").value.trim();
    const content = document.querySelector("#description").value.trim();

    console.log(title);
    console.log(content);

    if (title && content) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/posts/', {
            method: 'POST',
            body: JSON.stringify({ title, content}),
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
    .querySelector(".newpostform")
    .addEventListener("submit", submitFormHandler);