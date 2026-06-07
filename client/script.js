const API =
'http://localhost:5000/api/auth';

/* REGISTER */

async function register() {

    const name =
        document.getElementById('name').value;

    const email =
        document.getElementById('email').value;

    const password =
        document.getElementById('password').value;

    const res = await fetch(

        `${API}/register`,

        {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({

                name,
                email,
                password
            })
        }
    );

    const data = await res.json();

    alert(data.message);

    if (data.message ===
        'Registration Successful') {

        window.location.href =
            'login.html';
    }
}

/* LOGIN */

async function login() {

    const email =
        document.getElementById('email').value;

    const password =
        document.getElementById('password').value;

    const res = await fetch(

        `${API}/login`,

        {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({

                email,
                password
            })
        }
    );

    const data = await res.json();

    alert(data.message);

    if (data.token) {

        localStorage.setItem(
            'token',
            data.token
        );

        localStorage.setItem(
            'user',
            JSON.stringify(data.user)
        );

        window.location.href =
            'index.html';
    }
}

/* POSTS */

let posts = JSON.parse(

    localStorage.getItem('posts')

) || [];

function createPost() {

    const caption =
        document.getElementById('caption').value;

    const image =
        document.getElementById('image').value;

    let user =
        JSON.parse(localStorage.getItem('user'));

    if (!user) {

        user = {
            name: "Demo User"
        };
    }

    const post = {

        username: user.name,

        caption: caption,

        image: image,

        likes: 0
    };

    posts.unshift(post);

    localStorage.setItem(
        'posts',
        JSON.stringify(posts)
    );

    displayPosts();

    document.getElementById('caption').value = "";

    document.getElementById('image').value = "";
}
function displayPosts() {

    const postsContainer =
        document.getElementById('posts');

    if (!postsContainer) return;

    postsContainer.innerHTML = '';

    posts.forEach((post, index) => {

        postsContainer.innerHTML += `

        <div class="post">

            <h3>${post.username}</h3>

            <p>${post.caption}</p>

            <img src="${post.image}">

            <button onclick="likePost(${index})">

                ❤️ ${post.likes}
            </button>

        </div>
        `;
    });
}

function likePost(index) {

    posts[index].likes++;

    localStorage.setItem(
        'posts',
        JSON.stringify(posts)
    );

    displayPosts();
}

function logout() {

    localStorage.removeItem('token');

    localStorage.removeItem('user');

    window.location.href =
        'login.html';
}

displayPosts();