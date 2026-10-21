#!/usr/bin/env bash
set -euo pipefail

if [ -z "${MYSQL_PASSWORD:-}" ]; then
  echo "Set MYSQL_PASSWORD before preparing the local database." >&2
  exit 1
fi

user="${MYSQL_USER:-myanmol}"
database="${MYSQL_DATABASE:-myanmol}"

sudo service mariadb start
sudo mysql <<SQL
CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '${user}'@'127.0.0.1' IDENTIFIED BY '${MYSQL_PASSWORD}';
ALTER USER '${user}'@'127.0.0.1' IDENTIFIED BY '${MYSQL_PASSWORD}';
GRANT ALL PRIVILEGES ON \`${database}\`.* TO '${user}'@'127.0.0.1';
FLUSH PRIVILEGES;
SQL
