const express = require('express');
const path = require('path');
const port = 3030;

const app = express();

const router = express.Router();
app.use(router);

app.use(express.static(path.join(__dirname, 'Frontend')));

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
})

router.get('/', (req, res) => {
    res.statusCode = 200;
    res.sendFile(path.join(__dirname, 'Frontend/search.html'));
})