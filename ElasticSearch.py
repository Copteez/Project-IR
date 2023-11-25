import csv
from elasticsearch import Elasticsearch

# Connect to Elasticsearch
es = Elasticsearch([{'host': 'localhost', 'port': 3030}])

# Index data from CSV file
def index_data_from_csv(index_name, csv_file_path):
    with open(csv_file_path, 'r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            document = {
                'id': row['id'],
                'product_name': row['product_name'],
                'category': row['category'],
                'price': row['price']
            }
            es.index(index=index_name, body=document)

# Search function
def search(index_name, query):
    result = es.search(index=index_name, body={
        "query": {
            "match": {
                "product_name": query
            }
        }
    })
    return result

# Example usage
if __name__ == "__main__":
    index_name = "food_index"
    csv_file_path = "DOC_LIST.csv"

    # Index data from CSV file
    index_data_from_csv(index_name, csv_file_path)

    # Example search
    search_query = "Egg"
    search_result = search(index_name, search_query)

    # Process search results
    print("Search Results:")
    for hit in search_result['hits']['hits']:
        print(f"Score: {hit['_score']}, Document: {hit['_source']}")
