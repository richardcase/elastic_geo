
docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:6.2.2

New index name restgeo
curl -XPUT 'http://localhost:9200/restgeo'

Make sure the location property is marked as a geopoint
curl -H 'Content-Type: application/json' -XPUT 'http://localhost:9200/restgeo/_mapping/restaurant' -d '{
  "restaurant" : {
    "properties" : {
      "location" : {
        "type": "geo_point"
      }
    }
  }
}'

curl -XGET 'http://localhost:9200/restgeo/_mapping/restaurant'

curl -H 'Content-Type: application/json' -XPOST 'http://localhost:9200/restgeo/restaurant' -d @data/converted_1.json


curl -H 'Content-Type: application/json' -XPOST 'http://localhost:9200/restgeo/restaurant/_search?pretty=true' -d @./queries/geo_scf.json