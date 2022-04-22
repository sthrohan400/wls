@echo off
if %1% == "force" docker compose rm test-database -s -f -v else
:: Start Test Database container
docker compose up test-database -d
:: Replace .env file with .env.test using dotenv cli
:: Start Jest E2E test
yarn prisma:test:deploy && yarn test:e2e