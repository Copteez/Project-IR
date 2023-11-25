const express = require('express');
const path = require('path');
const { Client } = require('@elastic/elasticsearch'); // Import the Elasticsearch client
const port = 3030;

const app = express();

const router = express.Router();
app.use(router);

app.use(express.static(path.join(__dirname, 'Frontend')));

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});

router.get('/', (req, res) => {
    res.statusCode = 200;
    res.sendFile(path.join(__dirname, 'Frontend/search.html'));
});

const esClient = new Client({ node: 'http://localhost:3030' }); // Specify the correct Elasticsearch node

function search() {
    const query = document.getElementById('searchInput').value;

    esClient.search({
        index: 'food_index',
        body: {
            query: {
                match: {
                    field_name: query
                }
            }
        }
    }).then(response => {
        displayResults(response.body.hits.hits);
    }).catch(error => {
        console.error(error);
    });
}

function displayResults(results) {
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = '';

    results.forEach(result => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = result._source.field_name; // Adjust based on your data structure
        resultsDiv.appendChild(itemDiv);
    });
}
