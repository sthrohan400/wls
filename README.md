# NEST JS WEB LOTTERY

Lottery with postgresql - No fancy stuffs yet.

## Requirements

- Node > 14+
- Nest JS > 8
- Prisma - ORM

## Installation

1. Clone the repository
2. Install dependencies: npm install & yarn install
3. Execute:
   Start Dev- `yarn run start:dev`

4. Rename .env.sample to .env and update the configuration accordingly
5. Verify application using: http://localhost:{APP_PORT}

## Run with docker

- docker build .
- docker compose up -d
- Verify applicaiton using: http://localhost:3000
- Check container Logs - docker exec -it {container-name} /bin/sh

## Start Application

- CMD ./start-dev.bat

## Run Test

- CMD ./start-test.bat
