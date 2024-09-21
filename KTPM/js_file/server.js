const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/user_data', (req, res) => {
    const { name, email, password } = req.body;
    
    const xmlFilePath = path.join(__dirname, 'user_data.xml');
    
    fs.readFile(xmlFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading XML file');
        
        xml2js.parseString(data, (err, result) => {
            if (err) return res.status(500).send('Error parsing XML');
            
            const newAccount = {
                username: name,
                password: password,
                email: email
            };
            
            if (!result.accounts.account) result.accounts.account = [];
            result.accounts.account.push(newAccount);
            
            const builder = new xml2js.Builder();
            const updatedXml = builder.buildObject(result);
            
            fs.writeFile(xmlFilePath, updatedXml, 'utf8', (err) => {
                if (err) return res.status(500).send('Error writing XML file');
                res.send('Đăng ký thành công!');
            });
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
