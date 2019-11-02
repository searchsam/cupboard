<img src="https://github.com/nerdify/cupboard-back-end/workflows/CI/badge.svg" />

# CupBoard BackEnd

Simple api for simple database cupboard storage.

## Requirements

-   PHP 7.2 or higher.
-   Composer 1.9.0 or higher.
-   MariaDB 10.0 or higher.
-   MySQL 5.6 or higher.
-   Redis Server 5.0 or higher.

> More detailed information on [Laravel Installation](https://laravel.com/docs/6.x/installation#server-requirements) page.

## GetUp

### Clone repo

```bash
git clone https://github.com/nerdify/cupboard-back-end.git
```

and go into repo `cupboard-back-end` dir.

### Set Environment

Copy the `.env.example` file into `.env` file and fill it with the data relevant to the technology you use.

```bash
cp .env.example .env
```

### Install Dependencies

```bash
composer install
```

### Run Migrations

Before running the `migrations`, make sure that the data for the connection to `MariaDB` (and/or `MySQL`) on your `.env` file is correct.

```cfg
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

Once you have ensured that your data is correct run the `migrations`.

```bash
php artisan migrate
```

### Populate Database

As with the `migrations` before running the `seeders` make sure that you have correct your connection data with the database.

```bash
php artisan db:seed
```

### Run Passport Migrations

As with the `migrations` and `seeders` before running the `passport installation` make sure that you have correct your connection data with the database.

```bash
php artisan passport:install
```

This command returns a message with its users for authentication by OAuth 2.0

```bash
Encryption keys generated successfully.
Personal access client created successfully.
Client ID: 1
Client secret: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Password grant client created successfully.
Client ID: 2
Client secret: VUyc1ZwngoJRwicYnEVr214Hh7JuuOdfNBtQXk8q
```

Place user No 2 in your `.env` file

```cfg
PASSPORT_CLIENT_ID=2
PASSPORT_CLIENT_SECRET=VUyc1ZwngoJRwicYnEVr214Hh7JuuOdfNBtQXk8q
```

> Make sure you don't neglect where you put this data.

### Connect to Redis

In order to use `queues` it is necessary to establish a connection with a `Redis` database. Make sure that the data for the connection to `Redis` on your `.env` file is correct.

```cfg
REDIS_URL=
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_DB=
```

### Active Queue

```bash
php artisan queue:work
```
