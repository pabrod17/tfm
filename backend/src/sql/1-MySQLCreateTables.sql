-- Indexes for primary keys have been explicitly created.


DROP TABLE GameExercise;
DROP TABLE GameStretching;

DROP TABLE TrainingExercise;
DROP TABLE TrainingStretching;
DROP TABLE PlayerStretching;
DROP TABLE PlayerTraining;
DROP TABLE PlayerGameStatistics;

DROP TABLE Game;
DROP TABLE GameStatistics;

DROP TABLE Stretching;
DROP TABLE Exercise;

DROP TABLE Training;

DROP TABLE SeasonTeam;

DROP TABLE User;
DROP TABLE Season;
DROP TABLE PlayerLesion;
DROP TABLE Note;
DROP TABLE PlayTeam;
DROP TABLE Play;
DROP TABLE Player;
DROP TABLE Lesion;
DROP TABLE Team;



CREATE TABLE User (
    id BIGINT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(60) COLLATE latin1_bin NOT NULL,
    password VARCHAR(60) NOT NULL, 
    firstName VARCHAR(60) NOT NULL,
    lastName VARCHAR(60) NOT NULL, 
    email VARCHAR(60) NOT NULL,
    role TINYINT NOT NULL,
    CONSTRAINT UserPK PRIMARY KEY (id),
    CONSTRAINT UserNameUniqueKey UNIQUE (userName)
) ENGINE = InnoDB;

CREATE INDEX UserIndexByUserName ON User (userName);

CREATE TABLE Season (
    id BIGINT NOT NULL AUTO_INCREMENT,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL, 
    Calendario VARCHAR(60) NOT NULL,
    CONSTRAINT SeasonPK PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE INDEX UserIndexByStartDate ON Season (startDate);

CREATE TABLE Team (
    id BIGINT NOT NULL AUTO_INCREMENT,
    teamName VARCHAR(60) COLLATE latin1_bin NOT NULL,
    arenaName VARCHAR(60) COLLATE latin1_bin NOT NULL,
    ownerName VARCHAR(60) COLLATE latin1_bin NOT NULL,
    CONSTRAINT TeamPK PRIMARY KEY (id),
    CONSTRAINT TeamNameUniqueKey UNIQUE (teamName)
) ENGINE = InnoDB;

CREATE INDEX TeamIndexByTeamName ON Team (teamName);

CREATE TABLE SeasonTeam (
    id BIGINT NOT NULL AUTO_INCREMENT,    
    seasonId BIGINT,
    teamId BIGINT,
    userId BIGINT,    
    CONSTRAINT SeasonTeamPK PRIMARY KEY (id),
    CONSTRAINT SeasonTeamUserIdFK FOREIGN KEY(userId)
        REFERENCES User (id),    
    CONSTRAINT SeasonTeamSeasonIdFK FOREIGN KEY(seasonId)
        REFERENCES Season (id),
    CONSTRAINT SeasonTeamTeamIdFK FOREIGN KEY(teamId)
        REFERENCES Team (id)
) ENGINE = InnoDB;

CREATE TABLE Player (
    id BIGINT NOT NULL AUTO_INCREMENT,
    playerName VARCHAR(60) COLLATE latin1_bin NOT NULL,
    primaryLastName VARCHAR(60) COLLATE latin1_bin NOT NULL,
    secondLastName VARCHAR(60) COLLATE latin1_bin NOT NULL,
    position    ENUM('Base','Escolta', 'Alero', 'AlaPivot', 'Pivot') NOT NULL,
    trends VARCHAR(500),
    phoneNumber VARCHAR(60) NOT NULL, 
    email VARCHAR(60) NOT NULL,
    dni VARCHAR(60) NOT NULL,
    teamId BIGINT NOT NULL,
    totalPoints BIGINT,   
    totalThreePointShots BIGINT,   
    totalSetShots BIGINT,   
    totalFreeShots BIGINT,   
    totalFailThreePointShots BIGINT,   
    totalfailSetShots BIGINT,   
    totalfailFreeShots BIGINT,   
    totalRebounds BIGINT,   
    totalBlockedShot BIGINT,   
    totalAssists BIGINT,   
    totalPersonalFouls BIGINT,   
    totalTechnicalFouls BIGINT,   
    totalUnsportsmanlikeFouls BIGINT,
    injured BOOLEAN,
    CONSTRAINT PlayerTeamIdFK FOREIGN KEY(teamId)
        REFERENCES Team (id),
    CONSTRAINT PlayerPK PRIMARY KEY (id),
    CONSTRAINT DniUniqueKey UNIQUE (dni),
    CONSTRAINT EmailUniqueKey UNIQUE (email)
) ENGINE = InnoDB;

CREATE TABLE Note (
    id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(60) COLLATE latin1_bin NOT NULL,
    description VARCHAR(500) NOT NULL,
    noteDate DATE NOT NULL,
    playerId BIGINT,
    CONSTRAINT NotePlayerIdFK FOREIGN KEY(playerId)
        REFERENCES Player (id),
    CONSTRAINT NotePK PRIMARY KEY (id),
    CONSTRAINT TitleUniqueKey UNIQUE (title)
) ENGINE = InnoDB;

CREATE TABLE Play (
    id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(60) COLLATE latin1_bin NOT NULL,
    playType    ENUM('Ataque','Defensa') NOT NULL,
    gesture VARCHAR(60),
    pointGuardText VARCHAR(500),
    shootingGuardText VARCHAR(500),
    smallForwardText VARCHAR(500),
    powerForwardText VARCHAR(500),
    centerText VARCHAR(500),
    CONSTRAINT PlayPK PRIMARY KEY (id),
    CONSTRAINT TitleUniqueKey UNIQUE (title)
) ENGINE = InnoDB;

CREATE TABLE PlayTeam (
    id BIGINT NOT NULL AUTO_INCREMENT,   
    playId BIGINT NOT NULL,
    teamId BIGINT NOT NULL,
    CONSTRAINT PlayTeamPK PRIMARY KEY (id),
    CONSTRAINT PlayTeamPlayIdFK FOREIGN KEY(playId)
        REFERENCES Play (id),    
    CONSTRAINT PlayTeamTeamIdFK FOREIGN KEY(teamId)
        REFERENCES Team (id)
) ENGINE = InnoDB;

CREATE TABLE Lesion (
    id BIGINT NOT NULL AUTO_INCREMENT,
    lesionName VARCHAR(60) COLLATE latin1_bin NOT NULL,
    description VARCHAR(500) NOT NULL,
    medication VARCHAR(500) NOT NULL,
    lesionType    ENUM('Muscular','Tendinosa', 'Articular', 'ColumnaVertebral', 'Psicologica') NOT NULL,
    version BIGINT NOT NULL,
    CONSTRAINT LesionPK PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE TABLE PlayerLesion (
    id BIGINT NOT NULL AUTO_INCREMENT,   
    playerId BIGINT,
    lesionId BIGINT,
    CONSTRAINT PlayerLesionPK PRIMARY KEY (id),
    CONSTRAINT PlayerLesionPlayerIdFK FOREIGN KEY(playerId)
        REFERENCES Player (id),    
    CONSTRAINT PlayerLesionLesionIdFK FOREIGN KEY(lesionId)
        REFERENCES Lesion (id)
) ENGINE = InnoDB;











CREATE TABLE GameStatistics (
    id BIGINT NOT NULL AUTO_INCREMENT,   
    totalPoints BIGINT,   
    durationMinutes BIGINT,   
    totalThreePointShots BIGINT,   
    totalSetShots BIGINT,   
    totalFreeShots BIGINT,   
    totalRebounds BIGINT,   
    totalBlockedShot BIGINT,   
    totalAssists BIGINT,   
    totalPersonalFouls BIGINT,   
    totalTechnicalFouls BIGINT,   
    totalUnsportsmanlikeFouls BIGINT,   

    totalPointsRival BIGINT,   
    totalThreePointShotsRival BIGINT,   
    totalSetShotsRival BIGINT,   
    totalFreeShotsRival BIGINT,   
    totalReboundsRival BIGINT,   
    totalBlockedShotsRival BIGINT,   
    totalAssistsRival BIGINT,   
    totalPersonalFoulsRival BIGINT,   
    totalTechnicalFoulsRival BIGINT,   
    totalUnsportsmanlikeFoulsRival BIGINT,   
    CONSTRAINT GameStatisticsPK PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE TABLE Game (
    id BIGINT NOT NULL AUTO_INCREMENT,
    gameDate DATE,
    rival VARCHAR(500),
    objective VARCHAR(500),
    seasonTeamId BIGINT NOT NULL,
    gameStatisticsId BIGINT,
    CONSTRAINT GamePK PRIMARY KEY (id),
    CONSTRAINT GameSeasonTeamIdFK FOREIGN KEY(seasonTeamId)
        REFERENCES SeasonTeam (id),    
    CONSTRAINT GameGameStatisticsIdIdFK FOREIGN KEY(gameStatisticsId)
        REFERENCES GameStatistics (id)
) ENGINE = InnoDB;

CREATE TABLE Training (
    id BIGINT NOT NULL AUTO_INCREMENT,
    trainingDate DATE,
    durationMinutes BIGINT,   
    description VARCHAR(500),
    objective VARCHAR(500),
    seasonTeamId BIGINT,
    CONSTRAINT TrainingPK PRIMARY KEY (id),
    CONSTRAINT TrainingSeasonTeamIdFK FOREIGN KEY(seasonTeamId)
        REFERENCES SeasonTeam (id)
) ENGINE = InnoDB;



CREATE TABLE Stretching (
    id BIGINT NOT NULL AUTO_INCREMENT,
    stretchingName VARCHAR(60) COLLATE latin1_bin NOT NULL,
    description VARCHAR(500) NOT NULL,
    stretchingType    ENUM('Isquiotibiales','Gluteos', 'Gemelos', 'Adductores', 'Hombro', 'Cuadriceps', 'Espalda', 'Pectoral', 'Ingle', 'Triceps') NOT NULL,
    version BIGINT NOT NULL,
    CONSTRAINT StretchingPK PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE TABLE Exercise (
    id BIGINT NOT NULL AUTO_INCREMENT,
    exerciseName VARCHAR(60) COLLATE latin1_bin NOT NULL,
    description VARCHAR(500) NOT NULL,
    objective VARCHAR(500) NOT NULL,
    exerciseType    ENUM('Tactico','Tecnica', 'Fisico', 'Global', 'Especifico', 'Psicologico', 'Estrategia', 'PrePartido') NOT NULL,
    version BIGINT NOT NULL,
    CONSTRAINT ExercisePK PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE TABLE PlayerGameStatistics (
    id BIGINT NOT NULL AUTO_INCREMENT,   
    playerId BIGINT NOT NULL,
    gameId BIGINT NOT NULL,

    totalPoints BIGINT,
    minutes BIGINT,
    threePointShots BIGINT,
    setShots BIGINT,
    freeShots BIGINT,

    failThreePointShots BIGINT,
    failSetShots BIGINT,
    failFreeShots BIGINT,

    rebounds BIGINT,
    blockedShot BIGINT,
    assists BIGINT,
    personalFouls BIGINT,
    technicalFouls BIGINT,
    unsportsmanlikeFouls BIGINT,
    CONSTRAINT PlayerGameStatisticsPK PRIMARY KEY (id),
    CONSTRAINT PlayerGameStatisticsPlayerIdFK FOREIGN KEY(playerId)
        REFERENCES Player (id),    
    CONSTRAINT PlayerGameStatisticsGameIdFK FOREIGN KEY(gameId)
        REFERENCES Game (id)
) ENGINE = InnoDB;

CREATE TABLE GameExercise (
    id BIGINT NOT NULL AUTO_INCREMENT,   
    gameId BIGINT NOT NULL,
    exerciseId BIGINT NOT NULL,
    CONSTRAINT GameExercisePK PRIMARY KEY (id),
    CONSTRAINT GameExerciseGameIdFK FOREIGN KEY(gameId)
        REFERENCES Game (id),
    CONSTRAINT GameExerciseExerciseIdFK FOREIGN KEY(exerciseId)
        REFERENCES Exercise (id)    
) ENGINE = InnoDB;

CREATE TABLE GameStretching (
    id BIGINT NOT NULL AUTO_INCREMENT,   
    gameId BIGINT NOT NULL,
    stretchingId BIGINT NOT NULL,
    CONSTRAINT GameStretchingPK PRIMARY KEY (id),
    CONSTRAINT GameStretchingGameIdFK FOREIGN KEY(gameId)
        REFERENCES Game (id),
    CONSTRAINT GameStretchingStretchingIdFK FOREIGN KEY(stretchingId)
        REFERENCES Stretching (id)    
) ENGINE = InnoDB;

CREATE TABLE TrainingExercise (
    id BIGINT NOT NULL AUTO_INCREMENT,   
    trainingId BIGINT NOT NULL,
    exerciseId BIGINT NOT NULL,
    CONSTRAINT TrainingExercisePK PRIMARY KEY (id),
    CONSTRAINT TrainingExerciseTrainingIdFK FOREIGN KEY(trainingId)
        REFERENCES Training (id),
    CONSTRAINT TrainingExerciseExerciseIdFK FOREIGN KEY(exerciseId)
        REFERENCES Exercise (id)    
) ENGINE = InnoDB;

CREATE TABLE TrainingStretching (
    id BIGINT NOT NULL AUTO_INCREMENT,   
    trainingId BIGINT NOT NULL,
    stretchingId BIGINT NOT NULL,
    CONSTRAINT TrainingStretchingPK PRIMARY KEY (id),
    CONSTRAINT TrainingStretchingTrainingIdFK FOREIGN KEY(trainingId)
        REFERENCES Training (id),
    CONSTRAINT TrainingStretchingStretchingIdFK FOREIGN KEY(stretchingId)
        REFERENCES Stretching (id)    
) ENGINE = InnoDB;

CREATE TABLE PlayerStretching (
    id BIGINT NOT NULL AUTO_INCREMENT,   
    playerId BIGINT NOT NULL,
    stretchingId BIGINT NOT NULL,
    CONSTRAINT PlayerStretchingPK PRIMARY KEY (id),
    CONSTRAINT PlayerStretchingPlayerIdFK FOREIGN KEY(playerId)
        REFERENCES Player (id),
    CONSTRAINT PlayerStretchingcccStretchingIdFK FOREIGN KEY(stretchingId)
        REFERENCES Stretching (id)    
) ENGINE = InnoDB;

CREATE TABLE PlayerTraining (
    id BIGINT NOT NULL AUTO_INCREMENT,   
    playerId BIGINT NOT NULL,
    trainingId BIGINT NOT NULL,
    CONSTRAINT PlayerTrainingPK PRIMARY KEY (id),
    CONSTRAINT PlayerTrainingPlayerIdFK FOREIGN KEY(playerId)
        REFERENCES Player (id),
    CONSTRAINT PlayerTrainingTrainingIdFK FOREIGN KEY(trainingId)
        REFERENCES Training (id)    
) ENGINE = InnoDB;