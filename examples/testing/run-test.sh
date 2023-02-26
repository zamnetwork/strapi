
# Execute k6 run <test.js> --out influxdb=http://localhost:8086  with the given options and check the output

# Usage: run-test.sh <test.js> <options>
k6 run ./many-fields/many-fields.js --out influxdb=http://localhost:8086
k6 run ./nested-components/find-many.js --out influxdb=http://localhost:8086
k6 run ./nested-components/populate.js --out influxdb=http://localhost:8086
