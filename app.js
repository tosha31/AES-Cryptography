const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const CryptoJS = require('crypto-js')

const app = express();

app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => {
    res.send("Say hello to my little friend!")
})

function encrypt(data, key) {
    const cipherText = CryptoJS.AES.encrypt(data, key).toString();
    return cipherText;
}

function decrypt(cipherText, key) {
    try {
        const bytes = CryptoJS.AES.decrypt(cipherText, key)

        if (bytes.sigBytes > 0) {
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            return decryptedData;
        }
    } catch (error) {
        throw new Error('Decryption Failed Invalid Key!!!')
    }
}

app.post('/encrypt', (req, res) => {
    const { data, key } = req.body;
    const encrypted = encrypt(data, key);
    res.json({ encrypted });
})

app.post('/decrypt', (req, res) => {
    const { encryptedData, key } = req.body;
    const decryptedData = decrypt(encryptedData, key);
    res.json({ decryptedData });
})
module.exports = app;