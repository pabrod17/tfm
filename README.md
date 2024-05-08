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

Login Second version

![ToolBare](login2.png)

Lesion cards

![ToolBare](lesion_cards.png)

Lesion form

![ToolBare](lesionForm.png)

Lesion cards NEW DESIGN 1:

![ToolBare](lesionHome1.png)

Lesion cards NEW DESIGN 2:

![ToolBare](lesionHome2.png)

Lesion cards NEW DESIGN 3:

![ToolBare](lesionHome3.png)

Lesion cards NEW DESIGN 4:

![ToolBare](lesionHome4.png)

Lesion cards NEW DESIGN 5 with blur:

![ToolBare](lesionHome5.png)

Lesion form new design

![ToolBare](lesionForm2.png)

### Final home designs

Lesion home final design:

![ToolBare](lesionHome3.png)

Exercise home final design:

![ToolBare](exerciseHome.png)

Stretching home final design:

![ToolBare](stretchingHome1.png)

Trainings home final design:

![ToolBare](trainingHome.png)

Trainings form design:

![ToolBare](trainingForm.png)

Games form design:

![ToolBare](gameForm.png)

Games home final design:

![ToolBare](gamesHome.png)

Game Statistics Form:

![ToolBare](UpdateGameStatisticsForm.png)

Game Statistics layout:

![ToolBare](gameStatistics.png)

Court board design:

![ToolBare](courtDrawHome.png)

Plays animator design:

![ToolBare](playsAnimatorHome1.png)

Calendar Home design:

![ToolBare](CalendarHome1.png)

Mobile Gradient Home design. Option 1:

![ToolBare](gradient1.png)

Mobile Gradient Home design. Option 2:

![ToolBare](gradient2.png)

Mobile Gradient Home design. Option 3:

![ToolBare](gradient3.png)

Mobile Gradient Home design. Option 4:

![ToolBare](gradient4.png)

Main layout mockup:

![ToolBare](mainLayout2.png)

Club teams section:

![ToolBare](clubTeamsCards.png)