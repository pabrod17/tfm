package es.udc.paproject.backend.test.model.services;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import es.udc.paproject.backend.model.entities.Exercise;
import es.udc.paproject.backend.model.entities.Game;
import es.udc.paproject.backend.model.entities.Team;
import es.udc.paproject.backend.model.entities.Training;
import es.udc.paproject.backend.model.entities.User;
import es.udc.paproject.backend.model.exceptions.DuplicateInstanceException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.UsedExerciseException;
import es.udc.paproject.backend.model.services.TeamService;
import es.udc.paproject.backend.model.services.UserService;
import es.udc.paproject.backend.model.services.ExerciseService;
import es.udc.paproject.backend.model.services.GameService;
import es.udc.paproject.backend.model.services.TrainingService;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class ExerciseServiceTest {

    @Autowired
    private UserService userService;

    @Autowired
    private TeamService teamService;

    @Autowired
    private TrainingService trainingService;

    @Autowired
    private GameService gameService;

    @Autowired
    private ExerciseService exerciseService;

    private final LocalDateTime startDate = LocalDateTime.of(2021, 5, 12, 15, 56);

    private User createUser(String userName) throws DuplicateInstanceException {
        User user = new User(userName, "password", "firstName", "lastName", userName + "@" + userName + ".com");
        userService.signUp(user);
        return user;
    }

    private Team createTeam(Long userId, String teamName) throws InstanceNotFoundException, DuplicateInstanceException {
        return teamService.addTeam(userId, teamName);
    }

    private Training createTraining(Long teamId) throws InstanceNotFoundException {
        return trainingService.addTraining(teamId, null, startDate, "120", "description", "objective");
    }

    private Game createGame(Long teamId) throws InstanceNotFoundException {
        return gameService.addGame(teamId, null, startDate, "rival");
    }

    // Tactic, Technique, Physical, Globalized, Specific, Psychological, Strategy,
    // PreMatch

    @Test
    public void testAddExerciseAndFindExerciseById() throws InstanceNotFoundException {

        Exercise exercise = exerciseService.addExercise("exerciseName", "description", "objective", "Tactic");

        Exercise exerciseFound = exerciseService.findExerciseById(exercise.getId());

        assertEquals(exercise, exerciseFound);
    }

    @Test
    public void testFindAllExercises() throws InstanceNotFoundException {

        exerciseService.addExercise("exerciseName", "description", "objective", "Tactic");
        exerciseService.addExercise("exerciseName", "description", "objective", "Physical");
        exerciseService.addExercise("exerciseName", "description", "objective", "Globalized");
        exerciseService.addExercise("exerciseName", "description", "objective", "Physical");
        exerciseService.addExercise("exerciseName", "description", "objective", "PreMatch");

        List<Exercise> exercises = exerciseService.findAllExercises();

        assertEquals(exercises.size(), 5);
    }

    @Test
    public void testFindExercisesByType() throws InstanceNotFoundException {

        exerciseService.addExercise("exerciseName", "description", "objective", "Tactic");
        exerciseService.addExercise("exerciseName", "description", "objective", "Physical");
        exerciseService.addExercise("exerciseName", "description", "objective", "Globalized");
        exerciseService.addExercise("exerciseName", "description", "objective", "Physical");
        exerciseService.addExercise("exerciseName", "description", "objective", "PreMatch");

        List<Exercise> exercises = exerciseService.findExercisesByType("Physical");
        List<Exercise> exercises1 = exerciseService.findExercisesByType("Tactic");
        List<Exercise> exercises2 = exerciseService.findExercisesByType("PreMatch");

        assertEquals(exercises.size(), 2);
        assertEquals(exercises1.size(), 1);
        assertEquals(exercises2.size(), 1);
    }

    @Test
    public void testAddExerciseToTraining() throws InstanceNotFoundException, DuplicateInstanceException {

        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team");
        Training training = createTraining(team.getId());
        Training training2 = createTraining(team.getId());

        Exercise exercise = exerciseService.addExercise("exerciseName", "description", "objective", "Tactic");
        Exercise exercise2 = exerciseService.addExercise("exerciseName", "description", "objective", "Physical");
        Exercise exercise3 = exerciseService.addExercise("exerciseName", "description", "objective", "Globalized");
        exerciseService.addExercise("exerciseName", "description", "objective", "Physical");
        exerciseService.addExercise("exerciseName", "description", "objective", "PreMatch");

        exerciseService.addExerciseToTraining(training.getId(), exercise.getId());
        exerciseService.addExerciseToTraining(training.getId(), exercise2.getId());

        exerciseService.addExerciseToTraining(training2.getId(), exercise.getId());
        exerciseService.addExerciseToTraining(training2.getId(), exercise2.getId());
        exerciseService.addExerciseToTraining(training2.getId(), exercise3.getId());

        List<Exercise> exercises = exerciseService.findAllExercises();
        List<Exercise> exercises1 = exerciseService.findExercisesByTrainingId(training.getId());
        List<Exercise> exercises2 = exerciseService.findExercisesByTrainingId(training2.getId());

        assertEquals(exercises.size(), 5);
        assertEquals(exercises1.size(), 2);
        assertEquals(exercises2.size(), 3);
    }

    @Test
    public void testRemoveExerciseToTraining() throws InstanceNotFoundException, DuplicateInstanceException {

        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team");
        Training training = createTraining(team.getId());
        Training training2 = createTraining(team.getId());

        Exercise exercise = exerciseService.addExercise("exerciseName", "description", "objective", "Tactic");
        Exercise exercise2 = exerciseService.addExercise("exerciseName", "description", "objective", "Physical");
        Exercise exercise3 = exerciseService.addExercise("exerciseName", "description", "objective", "Globalized");
        exerciseService.addExercise("exerciseName", "description", "objective", "Physical");
        exerciseService.addExercise("exerciseName", "description", "objective", "PreMatch");

        exerciseService.addExerciseToTraining(training.getId(), exercise.getId());
        exerciseService.addExerciseToTraining(training.getId(), exercise2.getId());

        exerciseService.addExerciseToTraining(training2.getId(), exercise.getId());
        exerciseService.addExerciseToTraining(training2.getId(), exercise2.getId());
        exerciseService.addExerciseToTraining(training2.getId(), exercise3.getId());

        exerciseService.removeExerciseToTraining(exercise.getId(), training.getId());
        exerciseService.removeExerciseToTraining(exercise2.getId(), training2.getId());

        List<Exercise> exercises = exerciseService.findAllExercises();
        List<Exercise> exercises1 = exerciseService.findExercisesByTrainingId(training.getId());
        List<Exercise> exercises2 = exerciseService.findExercisesByTrainingId(training2.getId());

        assertEquals(exercises.size(), 5);
        assertEquals(exercises1.size(), 1);
        assertEquals(exercises2.size(), 2);
    }

    @Test
    public void testAddExerciseToGame() throws InstanceNotFoundException, DuplicateInstanceException {

        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team");
        Game game = createGame(team.getId());
        Game game2 = createGame(team.getId());

        Exercise exercise = exerciseService.addExercise("exerciseName", "description", "objective", "Tactic");
        Exercise exercise2 = exerciseService.addExercise("exerciseName", "description", "objective", "Physical");
        Exercise exercise3 = exerciseService.addExercise("exerciseName", "description", "objective", "Globalized");
        exerciseService.addExercise("exerciseName", "description", "objective", "Physical");
        exerciseService.addExercise("exerciseName", "description", "objective", "PreMatch");

        exerciseService.addExerciseToGame(game.getId(), exercise.getId());
        exerciseService.addExerciseToGame(game.getId(), exercise2.getId());

        exerciseService.addExerciseToGame(game2.getId(), exercise.getId());
        exerciseService.addExerciseToGame(game2.getId(), exercise2.getId());
        exerciseService.addExerciseToGame(game2.getId(), exercise3.getId());

        List<Exercise> exercises = exerciseService.findAllExercises();
        List<Exercise> exercises1 = exerciseService.findExercisesByGameId(game.getId());
        List<Exercise> exercises2 = exerciseService.findExercisesByGameId(game2.getId());

        assertEquals(exercises.size(), 5);
        assertEquals(exercises1.size(), 2);
        assertEquals(exercises2.size(), 3);
    }

    @Test
    public void testRemoveExerciseToGame() throws InstanceNotFoundException, DuplicateInstanceException {

        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team");
        Game game = createGame(team.getId());
        Game game2 = createGame(team.getId());

        Exercise exercise = exerciseService.addExercise("exerciseName", "description", "objective", "Tactic");
        Exercise exercise2 = exerciseService.addExercise("exerciseName", "description", "objective", "Physical");
        Exercise exercise3 = exerciseService.addExercise("exerciseName", "description", "objective", "Globalized");
        exerciseService.addExercise("exerciseName", "description", "objective", "Physical");
        exerciseService.addExercise("exerciseName", "description", "objective", "PreMatch");

        exerciseService.addExerciseToGame(game.getId(), exercise.getId());
        exerciseService.addExerciseToGame(game.getId(), exercise2.getId());

        exerciseService.addExerciseToGame(game2.getId(), exercise.getId());
        exerciseService.addExerciseToGame(game2.getId(), exercise2.getId());
        exerciseService.addExerciseToGame(game2.getId(), exercise3.getId());

        exerciseService.removeExerciseToGame(exercise2.getId(), game2.getId());
        exerciseService.removeExerciseToGame(exercise2.getId(), game.getId());

        List<Exercise> exercises = exerciseService.findAllExercises();
        List<Exercise> exercises1 = exerciseService.findExercisesByGameId(game.getId());
        List<Exercise> exercises2 = exerciseService.findExercisesByGameId(game2.getId());

        assertEquals(exercises.size(), 5);
        assertEquals(exercises1.size(), 1);
        assertEquals(exercises2.size(), 2);
    }

    @Test
    public void testRemoveExercise()
            throws InstanceNotFoundException, DuplicateInstanceException, UsedExerciseException {

        exerciseService.addExercise("exerciseName", "description", "objective", "Tactic");
        Exercise exercise2 = exerciseService.addExercise("exerciseName", "description", "objective", "Physical");
        Exercise exercise3 = exerciseService.addExercise("exerciseName", "description", "objective", "Globalized");
        exerciseService.addExercise("exerciseName", "description", "objective", "Physical");
        exerciseService.addExercise("exerciseName", "description", "objective", "PreMatch");

        exerciseService.removeExercise(exercise2.getId());
        exerciseService.removeExercise(exercise3.getId());


        List<Exercise> exercises = exerciseService.findAllExercises();
        
        assertEquals(exercises.size(), 3);
    }

    @Test
    public void testRemoveUsedExercise() throws InstanceNotFoundException, DuplicateInstanceException,
            UsedExerciseException {

        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team");
        Training training = createTraining(team.getId());

        Exercise exercise = exerciseService.addExercise("exerciseName", "description", "objective", "Tactic");

        exerciseService.addExerciseToTraining(training.getId(), exercise.getId());

        assertThrows(UsedExerciseException.class, () -> exerciseService.removeExercise(exercise.getId()));
    }


    @Test
    public void testUpdateExercise() throws InstanceNotFoundException, DuplicateInstanceException {

        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team");
        Training training = createTraining(team.getId());
        Game game = createGame(team.getId());

        Exercise exercise2 = exerciseService.addExercise("exerciseName", "description", "objective", "Physical");

        exerciseService.addExerciseToTraining(training.getId(), exercise2.getId());
        exerciseService.addExerciseToGame(game.getId(), exercise2.getId());

        Exercise exerciseUpdated = exerciseService.updatExercise(exercise2.getId(), "cambiando", "je je je", "me parto", "Tactic");

        Exercise exerciseFound = exerciseService.findExerciseById(exercise2.getId());


        List<Exercise> exercises1 = exerciseService.findExercisesByTrainingId(training.getId());
        List<Exercise> exercises2 = exerciseService.findExercisesByGameId(game.getId());

        assertEquals(exerciseUpdated, exerciseFound);
        assertEquals(exerciseFound.getExerciseName(), "cambiando");
        assertEquals(exerciseFound.getDescription(), "je je je");
        assertEquals(exerciseFound.getObjective(), "me parto");
        assertEquals(exerciseFound.getExerciseType(), "Tactic");

        assertEquals(exercises1.get(0), exerciseUpdated);
        assertEquals(exercises2.get(0), exerciseUpdated);
    }

}