Performance metrics: - Response time (p90, p95, p99) - Resource usage (CPU, Memory, Disk, Network) (is it possible to get this from k6 ?) - Error rate

Content types to test (for each one create at least 1000 entries):

- A content type with a large number of fields (e.g. 50)
- A content type with multiple levels of nested components (e.g. 5 levels)
- A content type with a large number of relations (e.g. 1000)

APIs to test:

- Content API
- Admin API
- GraphQL API
- Any plugin ?
  - D&P
  - Internationalization
  - Upload
  - Users & Permissions

Scenarios to test:

- GET query with a limit and sort parameter
- GET query with a populate parameter to fetch related entries
- GET query with a fields parameter to select specific fields
- POST query to create a new entry
- PUT query to update an existing entry
- DELETE query to delete an entry
- Query with multiple filters to search for entries
- Query with a complex filter to search for entries with multiple conditions

TODO: Define performance budgets for each scenario and content type

Databases to test:

- SQLite (only)
- MySQL
- PostgreSQL

Load testing:

- 10 users
- 100 users
- 1000 users ?

By creating these content-types and scenarios,
we can test the performance of different parts of Strapi and identify
any bottlenecks or issues that need to be optimized.

Additionally, you may want to test these scenarios under different levels of loads
and concurrent users to simulate real-world usage and ensure that the application
can handle the expected traffic (in an specific environment, preferably our cloud).
