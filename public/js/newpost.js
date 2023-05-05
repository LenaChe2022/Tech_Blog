const submitFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
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




// const form = document.querySelector("#post-form");

// function submitform(event) {
//     event.preventDefault();

//     const title = document.querySelector("#title");
//     const content = document.querySelector("#description");
//     // const user = session.user_id;

//     const formData = new FormData();

//     formData.append("title", title.value);
//     formData.append("content", content.value);
//     // formData.append("user_id", user);

//     console.log(formData);

//     fetch("/api/posts", {
//         method: "POST",
//         body: formData,
//     })
//       .then((response) => {
//         console.log(response);
//         alert("Post created successfully");
//         window.location.replace('/dashboard');
//       })
//       .catch((err) => ("Something went wrong", err));
// };

document
    .querySelector(".newpostform")
    .addEventListener("submit", submitFormHandler);