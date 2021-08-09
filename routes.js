const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url; //get url localhost:3000{'/message' for example} 
  const method = req.method; //get or post
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title><head>');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', chunk => { //get the message as chunks 
      console.log(chunk);
      body.push(chunk); // register this chunks 
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString(); // concat chunks and decoded it
      const message = parsedBody.split('=')[1]; //get message after name= {name is name="message" of input}
      fs.writeFile('message.txt', message, err => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title><head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
};

// module.exports = requestHandler; this to export one function or const , its formal for JS

module.exports = { // to export object, its formal for JS 
    handler: requestHandler,
    someText: 'Some hard coded text'
};

// module.exports.handler = requestHandler; the same with object but seperated, its formal for JS
// module.exports.someText = 'Some text';

// exports.handler = requestHandler; // this understand with node not JS 
// exports.someText = 'Some hard coded text';