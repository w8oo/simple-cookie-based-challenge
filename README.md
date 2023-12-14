# simple-cookie-based-challenge

Very simple cookie based challenge

# Setup

```
 git clone https://github.com/w8oo/simple-cookie-based-challenge.git

cd simple-cookie-based-challenge
```

```
npm init -y
npm install express cookie-parser
npm install http-proxy-middleware
```

# config

you can edit the proxy port 

```
const port = 80;
```

and the backend

```
const backendUrl = 'https://1.1.1.1'; // Replace with your actual backend URL
```

# alternative

I made this code for fun. Perhaps you are interested in other reverse proxy software, such as [Baloo-Proxy](https://github.com/41Baloo/balooProxy) or [PoW-Shield](https://github.com/RuiSiang/PoW-Shield/)

