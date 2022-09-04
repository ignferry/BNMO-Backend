# BNMO-Backend

API yang dibuat untuk aplikasi BMMO sesuai dengan spesifikasi yang diberikan pada seleksi asisten Labpro.

## Fitur

- Autentikasi (sign up, login, verifikasi akun)
- Pembuatan dan manajemen transakasi, baik request maupun transfer

## Teknologi yang digunakan

- NodeJS
- ExpressJS
- Typescript
- MySQL

## Requirements

- NodeJS
- Docker

## Cara menjalankan

1. Clone repository ini
    ```
    git clone https://github.com/ignferry/BNMO-Backend
    ```
2. Buat file .env dengan isi sebagai berikut
    ```
    BACKEND_PORT = YOUR_CHOSEN_BACKEND_PORT
    BACKEND_HOST = bnmo_backend

    MYSQL_ROOT_USER = YOUR_DATABASE_USERNAME
    
    # Asumsi password kosong
    MYSQL_ALLOW_EMPTY_PASSWORD=yes
    
    MYSQL_DATABASE = YOUR_DATABASE_NAME
    MYSQL_PORT = YOUR_DATABASE_PORT

    SECRET_KEY = YOUR_SECRET_KEY
    ```
3. Jalankan command berikut
    ```
    docker-compose build
    docker-compose up
    ```
    
## API Endpoint

### Auth Endpoint
| No | HTTP Method  | URI              | Description                              |
| -- | ------------ | ---------------- | ---------------------------------------- |
| 1  | POST         | signup           | Register new user                        |
| 2  | POST         | login            | Login user                               |
| 3  | POST         | logout           | Logout user                              |
| 4  | GET          | verify/:id       | Get user data required for verification  |
| 5  | GET          | verify/id/image  | Get uploaded KTP image of user           |
| 6  | POST         | verify/:id       | Accepts or declines user registration    |


### User Endpoint
| No | HTTP Method  | URI                     | Description                              |
| -- | ------------ | ----------------------- | ---------------------------------------- |
| 1  | GET          | users                   | Get paginated list of users              |
| 2  | GET          | users/:id               | Get detailed user data                   |
| 3  | GET          | users/:id/requests      | Get requests made by user                |
| 4  | GET          | users/:id/transfers     | Get transfers involving the user         |
| 5  | GET          | users/:id/transactions  | Get transactions involving the user      |


### Transaction Endpoint
| No | HTTP Method  | URI                     | Description                              |
| -- | ------------ | ----------------------- | ---------------------------------------- |
| 1  | GET          | transactions/:id        | Get detailed transaction data            |


### Request Endpoint
| No | HTTP Method  | URI                 | Description                              |
| -- | ------------ | ------------------- | ---------------------------------------- |
| 1  | GET          | requests            | Get paginated list of requests           |
| 2  | POST         | requests            | Create request                           |
| 3  | DELETE       | requests/:id        | Delete request                           |
| 4  | PUT          | reuqests/verify/:id | Accepts or declines a request            |


### Transfer Endpoint
| No | HTTP Method  | URI         | Description                              |
| -- | ------------ | ----------- | ---------------------------------------- |
| 1  | GET          | transfers   | Get paginated list of transfers          |
| 2  | POST         | transfers   | Create transfer                          |

## Author

Ignasius Ferry Priguna (13520126)
