#!/usr/bin/env bash
set -euo pipefail

if [ -z "${MYSQL_PASSWORD:-}" ]; then
  echo "Set MYSQL_PASSWORD before preparing the local database." >&2
  exit 1
fi

user="${MYSQL_USER:-myanmol}"
database="${MYSQL_DATABASE:-myanmol}"

if [[ ! "$user" =~ ^[A-Za-z0-9_]+$ ]] || [[ ! "$database" =~ ^[A-Za-z0-9_]+$ ]]; then
  echo "MYSQL_USER and MYSQL_DATABASE may only contain letters, numbers, and underscores." >&2
  exit 1
fi

password_sql=${MYSQL_PASSWORD//\'/\'\'}

sudo service mariadb start
sudo mysql <<SQL
CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '${user}'@'127.0.0.1' IDENTIFIED BY '${password_sql}';
ALTER USER '${user}'@'127.0.0.1' IDENTIFIED BY '${password_sql}';
SQL

set +e
revoke_output=$(sudo mysql --batch -e "REVOKE ALL PRIVILEGES ON \`${database}\`.* FROM '${user}'@'127.0.0.1';" 2>&1)
revoke_status=$?
set -e
if [ "$revoke_status" -ne 0 ] && [[ "$revoke_output" != *"no such grant"* ]]; then
  printf '%s\n' "$revoke_output" >&2
  exit "$revoke_status"
fi

sudo mysql <<SQL
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, INDEX, REFERENCES ON \`${database}\`.* TO '${user}'@'127.0.0.1';
FLUSH PRIVILEGES;
SQL
