@echo off
if %1% == "force" docker compose rm app dev-database -s -f -v else
:: Start Application and Development Database
docker compose up app dev-database -d