## 📦 Services

### Service A

- Fetches large data from a public API (JSON/Excel)
- Parses and inserts data into MongoDB
- Provides a search API with filters, pagination, and indexing
- Publishes events (e.g., `record.created`) to RabbitMQ
- Sends all API actions/events to RedisTimeSeries

### Service B

- Subscribes to events from Service A via RabbitMQ
- Stores log entries in MongoDB
- Exposes an API to query logs with filters (e.g., by type or date)
- Generates a PDF report with charts from RedisTimeSeries data

### Shared Libraries (`libs/`)

This project includes 3 reusable modules located in the `libs/` folder:

- **mongo** – shared MongoDB connection logic via `MongooseModule.forRoot(...)`
- **rabbitmq** – shared RabbitMQ module for inter-service messaging using NestJS microservices
- **redis** – shared Redis module (including support for RedisTimeSeries)

These modules are designed for reuse across all services (e.g., Service A and Service B) to promote clean architecture and reduce duplication.

---

## 📁 Project Structure

```
dataflow-service/
├── libs/
│   ├── mongo/       # Shared MongoDB connection module
│   ├── rabbitmq/    # Shared RabbitMQ microservice module
│   └── redis/       # Shared Redis/RedisTimeSeries module
├── service-a/       # Microservice A (data ingestion, search)
├── service-b/       # Microservice B (logs, PDF reports)
├── docker-compose.yml
├── tsconfig.base.json
└── ...
```