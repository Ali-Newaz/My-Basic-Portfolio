@echo off
cd /d "%~dp0"
node ".\node_modules\next\dist\bin\next" dev --hostname 127.0.0.1 --port 3000 > dev-server.log 2> dev-server.err.log
