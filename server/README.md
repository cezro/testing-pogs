<!-- client -->

### should be same with the port on server

NEXT_PUBLIC_SERVER_URL=""

<!-- server -->

### should be same with the port on client

PORT=

DATABASE_URL="postgres://username:password@127.0.0.1:5432/database_name?sslmode=disable"

DATABASE_URL="protocol://username:password@host:port/database_name?options"

protocol must be one of mysql, postgres, postgresql, sqlite, sqlite3, clickhouse
username and password must be URL encoded (you will get an error if you use special charactors)
host can be either a hostname or IP address
options are driver-specific (refer to the underlying Go SQL drivers if you wish to use these)

Heres the link for [dbmate](https://github.com/amacneil/dbmate?tab=readme-ov-file#creating-migrations)
