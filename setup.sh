#!/bin/bash

# Create index
curl -XPUT 'http://localhost:9200/restgeo'

# Set mapping
curl  -H 'Content-Type: application/json' -XPUT 'http://localhost:9200/restgeo/_mapping/restaurant' -d @./queries/mapping.json
