const express = require('express');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 80;
const backendUrl = 'https://1.1.1.1'; // Replace with your actual backend URL

app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); 

function generateRandomString() {
  return crypto.randomBytes(20).toString('hex');
}

app.get('/', (req, res) => {
  const cookieValue = req.cookies['cookie-test'];

  if (cookieValue) {
    res.send(`
      <h1>Welcome to the Challenge!</h1>
      <p>Present the following cookie value to proceed:</p>
      <p>${cookieValue}</p>
      <script>
        document.addEventListener('DOMContentLoaded', function() {
          var form = document.createElement('form');
          form.method = 'post';
          form.action = '/verify';

          var input = document.createElement('input');
          input.type = 'hidden';
          input.name = 'cookieInput';
          input.value = '${cookieValue}';

          form.appendChild(input);
          document.body.appendChild(form);
          form.submit();
        });
      </script>
    `);
  } else {
    const randomString = generateRandomString();
    res.cookie('cookie-test', randomString);
    res.redirect('/');
  }
});

app.post('/verify', (req, res) => {
  const userCookie = req.body.cookieInput;
  const expectedCookie = req.cookies['cookie-test'];

  if (userCookie === expectedCookie) {
    createProxyMiddleware({ target: backendUrl })(req, res);
  } else {
    res.send('<h1>Incorrect cookie. Try again!</h1>');
  }
});

app.listen(port, () => {
  console.log(`Server is running`);
});