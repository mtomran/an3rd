# An3red

`An3red` is a simplified Question and Answer Application, akin to `Stack Overflow`.

## Usage

### Download

Clone the repository using Git:

git clone https://github.com/mtomran/an3rd.git

### Running with Docker Images

Start the application using Docker Compose:

docker-compose up -d

### Building Images from the Source

Build Docker images from the source with this command:

docker-compose -f docker-compose.build.yml up -d

## Application Structure

The application is divided into two parts:

### Backend

Located under `/server`, it's an API server built using `Express` and communicates with the `Postgres` database through `Sequelize ORM`.

### Frontend

Found under `/www`, this part is a React application designed to interface with the API server and display basic information.