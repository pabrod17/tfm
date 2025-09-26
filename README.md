<div align="center">

# 🏀⚡ TeamHub  
### Web + Mobile app to boost your basketball experience

![GitHub stars](https://img.shields.io/github/stars/pabrod17/tfm?style=social)
![GitHub issues](https://img.shields.io/github/issues/pabrod17/tfm)
![Contributors](https://img.shields.io/github/contributors/pabrod17/tfm)
![GitHub top language](https://img.shields.io/github/languages/top/pabrod17/tfm)
![GitHub license](https://img.shields.io/github/license/pabrod17/tfm)


<p align="center">
  <a href="https://teamhubbasket.com">
    <img src="https://img.shields.io/badge/ Visit%20TeamHub-5122be?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Website"/>
  </a>
</p>



<!-- 
[![🌐 Live Demo](https://img.shields.io/badge/🌐_Live_Demo-4285F4?style=for-the-badge)](https://tu-web.com)
[![📱 Mobile App](https://img.shields.io/badge/📱_Mobile_App-FF6B35?style=for-the-badge)](https://tu-app.com)
-->




</div>



## Screenshots

![image](https://github.com/user-attachments/assets/f1549bc4-d71f-421e-b018-0683ef270390)
![image](https://github.com/user-attachments/assets/97a62c31-f0ad-40f1-bc36-2c509e535e3e)


<!-- 
| 💻 Web Application | 📱 Mobile Application |
|:---:|:---:|
| ![Web App](https://github.com/user-attachments/assets/ab8f72ad-abd7-4ed1-9c53-f870e5ecb4d9) | ![Mobile App](https://github.com/user-attachments/assets/fb37df98-0af7-4c9f-b710-bfed2309064b) |
-->

## 📚 Table of Contents

- [🏀⚡ TeamHub](#-TeamHub)
  - [📚 Table of Contents](#-table-of-contents)
  - [🚀 Getting Started](#-getting-started)
    - [📋 Requirements](#-requirements)
    - [🗄️ Database](#-database)
    - [🔨 Compile](#-compile)
    - [▶️ Execution](#-execution)
  - [👥 Authors](#-authors)
  - [🛠️ Stack](#️-stack)

## 🚀 Getting Started


1. Clone or fork this repository

   ```sh
   git clone https://github.com/pabrod17/tfm.git
   ```



### 📋 Requirements

- Node 12.14.0+.
- Yarn 1.21.1+.
- Java SE 8+.
- Maven 3+.
- MySQL 8+.

### 🗄️ Database

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

### 🔨 Compile
```
Inicializacion de la bd y compilacion/configuracion:

    cd \software\pa-shop-<version>/backend
    mvn sql:execute install
    cd \software\pa-shop-<version>/frontend
    yarn install

```

### ▶️ Execution

```
cd backend
mvn sql:execute (only first time to create tables)
mvn spring-boot:run

cd frontend
yarn install (only first time to download libraries)
yarn start
```

## 👥 Authors


[![Contributors](https://contrib.rocks/image?repo=pabrod17/tfm&)](https://github.com/pabrod17/tfm/graphs/contributors)


## 🛠️ Stack

![Java](https://img.shields.io/badge/Java-ED8B00?logo=openjdk&logoColor=white)
![Kotlin](https://img.shields.io/badge/Kotlin-0095D5?logo=kotlin&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)

![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?logo=springboot&logoColor=white)
![Hibernate](https://img.shields.io/badge/Hibernate-59666C?logo=hibernate&logoColor=white)

![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)

![Gradle](https://img.shields.io/badge/Gradle-02303A?logo=gradle&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-C71A36?logo=apachemaven&logoColor=white)

![AWS](https://img.shields.io/badge/AWS-232F3E?logo=amazonaws&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)

