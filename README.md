# PA Project 

## Requirements

- Node 12.14.0+.
- Yarn 1.21.1+.
- Java SE 8+.
- Maven 3+.
- MySQL 8+.

## Database creation

```
Start Mysql server if not running (e.g. mysqld).


****************************************************************************************
mysqladmin -u root create paproject
mysqladmin -u root create paprojecttest

mysql -u root
    CREATE USER 'pa'@'localhost' IDENTIFIED BY 'pa';
    GRANT ALL PRIVILEGES ON paproject.* to 'pa'@'localhost' WITH GRANT OPTION;
    GRANT ALL PRIVILEGES ON paprojecttest.* to 'pa'@'localhost' WITH GRANT OPTION;
    exit
...
****************************************************************************************
Creo las bds:
    mysqladmin -u root create pa -p
    mysqladmin -u root create patest -p
    mysqladmin -u root create paproject -p
    mysqladmin -u root create paprojecttest -p


Creo usuario 'pa' con permiso sobre las bds:
    mysql -u root -p
        CREATE USER 'pa'@'localhost' IDENTIFIED BY 'pa';
        GRANT ALL PRIVILEGES ON pa.* to 'pa'@'localhost' WITH GRANT OPTION;
        GRANT ALL PRIVILEGES ON patest.* to 'pa'@'localhost' WITH GRANT OPTION;
        GRANT ALL PRIVILEGES ON paproject.* to 'pa'@'localhost' WITH GRANT OPTION;
        GRANT ALL PRIVILEGES ON paprojecttest.* to 'pa'@'localhost' WITH GRANT OPTION;
        exit

Compruebo acceso con usuario pa: ( mysql -u pa -p pa )
    mysql -u pa --password=pa pa
        exit

    mysql -u pa --password=pa patest
        exit

    mysql -u pa --password=pa paproject
        exit

    mysql -u pa --password=pa paprojecttest
        exit

```

## Compile
```
Inicializacion de la bd y compilacion/configuracion:

    cd \software\pa-shop-<version>/backend
    mvn sql:execute install
    cd \software\pa-shop-<version>/frontend
    yarn install

```

## Run

```
cd backend
mvn sql:execute (only first time to create tables)
mvn spring-boot:run

cd frontend
yarn install (only first time to download libraries)
yarn start
```

## First design web version

Sidebar and Home
Topbar removed (I'm still wondering if it will be necessary to add it)


![DiagramaClases](dashboard_first_version.png)

New Topbar added

![ToolBare](toolbar.png)

New Login page created

![ToolBare](login.png)