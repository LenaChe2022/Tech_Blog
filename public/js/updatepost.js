
const deletePostHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        console.log(`I will delete post: ${id}`);

        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert("Failed to delete post");
        }
    }
};

const updatePostHandler = async (event) => {
    if (event.target.hasAttribute('id')) {
        const postId = event.target.getAttribute('id');

        console.log(`I will update post: ${postId}`);

        // const parentElement = document.querySelector(`#post-form-${postId}`);

        const title = document.querySelector(`#post-title-${postId}`).value.trim();
        const content = document.querySelector(`#description-${postId}`).value.trim();
        const user_id = document.querySelector(`#post-user-id-${postId}`).value.trim();

        console.log(`title: ${title}`);
        console.log(`content: ${content}`);
        console.log(`user_id: ${user_id}`);

        if (title && content && user_id) {
            response = await fetch(`/api/posts/${postId}`, {
                method: "PUT",
                body: JSON.stringify({ title, content, user_id }),
                headers: { "Content-Type": "application/json"},
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                alert("Failed to update post");
            }
        }  
    }
};

document
   .querySelector(".post-list")
   .addEventListener("click", deletePostHandler);


document
   .querySelector(".post-list")
   .addEventListener("submit", updatePostHandler);   