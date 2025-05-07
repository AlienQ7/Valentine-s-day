// Bindings - set these in your Cloudflare Worker settings
// For example:
// KV_NAMESPACE: VALENTINE_LINKS

const TOKEN_LENGTH = 16;
const EXPIRATION_SECONDS = 60 * 60; // 1 hour

function generateToken() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < TOKEN_LENGTH; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
}

async function handleCreateLink(request) {
    if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }
    const { name } = await request.json();
    if (!name) {
        return new Response('Missing name', { status: 400 });
    }

    const token = generateToken();
    const expiration = Date.now() + EXPIRATION_SECONDS * 1000;
    const value = JSON.stringify({ name, expiration });

    await VALENTINE_LINKS.put(token, value, { expirationTtl: EXPIRATION_SECONDS });

    return new Response(JSON.stringify({ token }), {
        headers: { 'Content-Type': 'application/json' },
    });
}

async function handleValentinePage(request, token) {
    const stored = await VALENTINE_LINKS.get(token);
    if (!stored) {
        return new Response('Link expired or invalid', { status: 404 });
    }

    const { name, expiration } = JSON.parse(stored);
// Bindings - set these in your Cloudflare Worker settings
// For example:
// KV_NAMESPACE: VALENTINE_LINKS

const TOKEN_LENGTH = 16;
const EXPIRATION_SECONDS = 60 * 60; // 1 hour

function generateToken() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < TOKEN_LENGTH; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
}

async function handleCreateLink(request) {
    if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }
    const { name } = await request.json();
    if (!name) {
        return new Response('Missing name', { status: 400 });
    }

    const token = generateToken();
    const expiration = Date.now() + EXPIRATION_SECONDS * 1000;
    const value = JSON.stringify({ name, expiration });

    await VALENTINE_LINKS.put(token, value, { expirationTtl: EXPIRATION_SECONDS });

    return new Response(JSON.stringify({ token }), {
        headers: { 'Content-Type': 'application/json' },
    });
}

async function handleValentinePage(request, token) {
    const stored = await VALENTINE_LINKS.get(token);
    if (!stored) {
        return new Response('Link expired or invalid', { status: 404 });
    }

    const { name, expiration } = JSON.parse(stored);
    if (Date.now() > expiration) {
        await VALENTINE_LINKS.delete(token); // Clean up expired link
        return new Response('Link expired', { status: 410 });
    }

    // Construct the personalized HTML - adapt your original index.html
    const personalizedHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Will You Be My Valentine?</title>
        <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
        <div class="container">
            <h1 id="valentineQuestion">${name}, Will you be my Valentine❤️?</h1>
            <div class="buttons">
                <button class="yes-button" onclick="redirectToYes()">Yes</button>
                <button class="no-button" onclick="handleNo('${name}')">No</button>
            </div>
            <div class="gif_container">
                <img src="/cute.gif" alt="Cute GIF">
            </div>
        </div>
        <script>
            function redirectToYes() {
                localStorage.setItem('valentineName', '${name}');
                window.location.href = "/yes_page.html";
            }

            const messages = [
                \`I knew you'd tap No, ${name} !\`,
                "Again ???",
                \`I Meow you, ${name}...\`,
                "Stop, Just say Yes",
                \`Let me be your Valentine, ${name}\`,
                \`${name} I love you >3\`,
                "Ok fine, tap No Again ;)...",
                "Just kidding, say yes please! ❤️",
                "Your trapped until you say yes!!"
            ];

            let messageIndex = 0;

            function handleNo(name) {
                const noButton = document.querySelector('.no-button');
                const yesButton = document.querySelector('.yes-button');
                noButton.textContent = messages[messageIndex];
                messageIndex = (messageIndex + 1) % messages.length;
                const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
                yesButton.style.fontSize = \`\${currentSize * 1.5}px\`;
            }
        </script>
    </body>
    </html>
    `;

    return new Response(personalizedHTML, {
        headers: { 'Content-Type': 'text/html' },
    });
}

addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);

    if (url.pathname === '/api/create-link') {
        event.respondWith(handleCreateLink(event.request));
    } else if (pathParts[0] === 'valentine' && pathParts.length === 2) {
        const token = pathParts[1];
        event.respondWith(handleValentinePage(event.request, token));
    } else {
        // Serve static assets (your HTML, CSS, JS, GIFs) from the origin
        event.respondWith(fetch(event.request));
    }
});
￼Enter    if (Date.now() > expiration) {
        await VALENTINE_LINKS.delete(token); // Clean up expired link
        return new Response('Link expired', { status: 410 });
    }

    // Construct the personalized HTML - adapt your original index.html
    const personalizedHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Will You Be My Valentine?</title>
        <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
        <div class="container">
            <h1 id="valentineQuestion">${name}, Will you be my Valentine❤️?</h1>
            <div class="buttons">
                <button class="yes-button" onclick="redirectToYes()">Yes</button>
                <button class="no-button" onclick="handleNo('${name}')">No</button>
            </div>
            <div class="gif_container">
                <img src="/cute.gif" alt="Cute GIF">
            </div>
        </div>
  <script>
            function redirectToYes() {
                localStorage.setItem('valentineName', '${name}');
                window.location.href = "/yes_page.html";
            }

            const messages = [
                \`I knew you'd tap No, ${name} !\`,
                "Again ???",
                \`I Meow you, ${name}...\`,
                "Stop, Just say Yes",
                \`Let me be your Valentine, ${name}\`,
                \`${name} I love you >3\`,
                "Ok fine, tap No Again ;)...",
                "Just kidding, say yes please! ❤️",
                "Your trapped until you say yes!!"
            ];

            let messageIndex = 0;

            function handleNo(name) {
                const noButton = document.querySelector('.no-button');
                const yesButton = document.querySelector('.yes-button');
                noButton.textContent = messages[messageIndex];
                messageIndex = (messageIndex + 1) % messages.length;
                const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
