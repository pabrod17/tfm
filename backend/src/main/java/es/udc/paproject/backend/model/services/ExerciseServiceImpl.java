package es.udc.paproject.backend.model.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;

import es.udc.paproject.backend.model.entities.Exercise;
import es.udc.paproject.backend.model.entities.ExerciseDao;
import es.udc.paproject.backend.model.entities.ExerciseType;
import es.udc.paproject.backend.model.entities.Game;
import es.udc.paproject.backend.model.entities.GameDao;
import es.udc.paproject.backend.model.entities.GameExercise;
import es.udc.paproject.backend.model.entities.GameExerciseDao;
import es.udc.paproject.backend.model.entities.Training;
import es.udc.paproject.backend.model.entities.TrainingDao;
import es.udc.paproject.backend.model.entities.TrainingExercise;
import es.udc.paproject.backend.model.entities.TrainingExerciseDao;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.UsedExerciseException;
@Service
@Transactional
public class ExerciseServiceImpl implements ExerciseService {


//    Tactic, Technique, Physical, Globalized, Specific, Psychological, Strategy, PreMatch

    @Autowired
    private ExerciseDao exerciseDao;

    @Autowired
    private TrainingExerciseDao trainingExerciseDao;

    @Autowired
    private TrainingDao trainingDao;

    @Autowired
    private  GameExerciseDao gameExerciseDao;

    @Autowired
    private  GameDao gameDao;

	@Override
	public Exercise addExercise(String exerciseName, String description, String objective, String exerciseType)
            throws InstanceNotFoundException {

        if (!exerciseType.equals("Tactico") && !exerciseType.equals("Tecnica") 
                && !exerciseType.equals("Fisico") && !exerciseType.equals("Global")
                && !exerciseType.equals("Especifico") && !exerciseType.equals("Psicologico") 
                && !exerciseType.equals("Estrategia") && !exerciseType.equals("PrePartido")) {
            throw new InstanceNotFoundException("project.entities.exercise");
        }

        ExerciseType exerciseTypeEnum = ExerciseType.valueOf(exerciseType);
        Exercise exercise = new Exercise(exerciseName, description, objective, exerciseTypeEnum);
        exerciseDao.save(exercise);

        return exercise;
	}

	@Override
	public void addExerciseToTraining(Long trainingId, Long exerciseId) throws InstanceNotFoundException {

        if (!trainingDao.existsById(trainingId)) {
            throw new InstanceNotFoundException("project.entities.training");
        }
        if (!exerciseDao.existsById(exerciseId)) {
            throw new InstanceNotFoundException("project.entities.exercise");
        }

        Training training = trainingDao.findById(trainingId).get();
        Exercise exercise = exerciseDao.findById(exerciseId).get();

        TrainingExercise trainingExercise = new TrainingExercise(training, exercise);
        trainingExerciseDao.save(trainingExercise);
	}

	@Override
	public void addExerciseToGame(Long gameId, Long exerciseId) throws InstanceNotFoundException {

        if (!gameDao.existsById(gameId)) {
            throw new InstanceNotFoundException("project.entities.game");
        }
        if (!exerciseDao.existsById(exerciseId)) {
            throw new InstanceNotFoundException("project.entities.exercise");
        }

        Game game = gameDao.findById(gameId).get();
        Exercise exercise = exerciseDao.findById(exerciseId).get();

        GameExercise gameExercise = new GameExercise(game, exercise);
        gameExerciseDao.save(gameExercise);
	}

	@Override
	public Exercise findExerciseById(Long exerciseId) throws InstanceNotFoundException {

        if (!exerciseDao.existsById(exerciseId)) {
            throw new InstanceNotFoundException("project.entities.exercise");
        }
        Exercise exercise = exerciseDao.findById(exerciseId).get();

        return exercise;
	}

	@Override
	public List<Exercise> findAllExercises() throws InstanceNotFoundException {


        List<Exercise> exercises = new ArrayList<>();
        exercises = (List<Exercise>) exerciseDao.findAll();

        if (exercises.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.exercise");
        }

		return exercises;
	}

    @Override
    public Block<Exercise> findAllExercises(int page, int size) throws InstanceNotFoundException {

        Sort sort = Sort.by(Sort.Direction.ASC, "id");
        Slice<Exercise> slice = exerciseDao.findAll(PageRequest.of(page, size, sort));

        return new Block<>(slice.getContent(), slice.hasNext());
    }

    @Override
    public Block<Exercise> findExercisesByType(String exerciseType, int page, int size)
            throws InstanceNotFoundException {
        
        Slice<Exercise> slice = exerciseDao.findByExerciseTypeOrderById(exerciseType, PageRequest.of(page, size));

        return new Block<>(slice.getContent(), slice.hasNext());
    }

	@Override
	public List<Exercise> findExercisesByType(String exerciseType) throws InstanceNotFoundException {

        List<Exercise> exercises = new ArrayList<>();
        exercises = exerciseDao.findByExerciseType(exerciseType);

        if (exercises.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.exercise");
        }

		return exercises;
	}

	@Override
	public List<Exercise> findExercisesByTrainingId(Long trainingId) throws InstanceNotFoundException {

        if (!trainingDao.existsById(trainingId)) {
            throw new InstanceNotFoundException("project.entities.training");
        }

        List<TrainingExercise> trainingExercises = trainingExerciseDao.findByTrainingId(trainingId);
        if (trainingExercises.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.exercise");
        }

        List<Exercise> exercises = new ArrayList<>();
        for (TrainingExercise trainingExercise : trainingExercises) {
            if(trainingExercise.getExercise() != null) {
                exercises.add(trainingExercise.getExercise());
            }
        }

        if (exercises.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.exercise");
        }

        exercises = exercises.stream().distinct().collect(Collectors.toList());
        return exercises;
	}

	@Override
	public List<Exercise> findExercisesByGameId(Long gameId) throws InstanceNotFoundException {


        if (!gameDao.existsById(gameId)) {
            throw new InstanceNotFoundException("project.entities.game");
        }

        List<GameExercise> gameExercises = gameExerciseDao.findByGameId(gameId);
        if (gameExercises.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.exercise");
        }

        List<Exercise> exercises = new ArrayList<>();
        for (GameExercise gameExercise : gameExercises) {
            if(gameExercise.getExercise() != null) {
                exercises.add(gameExercise.getExercise());
            }
        }

        if (exercises.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.exercise");
        }

        exercises = exercises.stream().distinct().collect(Collectors.toList());
        return exercises;
	}

	@Override
	public void removeExercise(Long exerciseId) throws InstanceNotFoundException, UsedExerciseException {

        if (!exerciseDao.existsById(exerciseId)) {
            throw new InstanceNotFoundException("project.entities.exercise");
        }

        List<GameExercise> gameExercises = (List<GameExercise>) gameExerciseDao.findAll();
        for (GameExercise gameExercise : gameExercises) {
            if(gameExercise.getExercise() != null && gameExercise.getExercise().getId() == exerciseId){
                throw new UsedExerciseException(gameExercise.getExercise().getExerciseName());
            }
        }

        List<TrainingExercise> trainingExercises = (List<TrainingExercise>) trainingExerciseDao.findAll();
        for (TrainingExercise trainingExercise : trainingExercises) {
            if(trainingExercise.getExercise()!= null && trainingExercise.getExercise().getId() == exerciseId){
                throw new UsedExerciseException(trainingExercise.getExercise().getExerciseName());
            }
        }

        Exercise exercise = exerciseDao.findById(exerciseId).get();

        exerciseDao.delete(exercise);
	}

	@Override
	public void removeExerciseToTraining(Long exerciseId, Long trainingId) throws InstanceNotFoundException {

        if (!trainingDao.existsById(trainingId)) {
            throw new InstanceNotFoundException("project.entities.training");
        }
        if (!exerciseDao.existsById(exerciseId)) {
            throw new InstanceNotFoundException("project.entities.exercise");
        }

        List<TrainingExercise> trainingExercises = (List<TrainingExercise>) trainingExerciseDao.findAll();
        for (TrainingExercise trainingExercise : trainingExercises) {
            if(trainingExercise.getExercise()!= null && trainingExercise.getExercise().getId() == exerciseId && trainingExercise.getTraining().getId() == trainingId){
                trainingExerciseDao.delete(trainingExercise);
            }
        }
	}

	@Override
	public void removeExerciseToGame(Long exerciseId, Long gameId) throws InstanceNotFoundException {

        if (!exerciseDao.existsById(exerciseId)) {
            throw new InstanceNotFoundException("project.entities.exercise");
        }
        if (!gameDao.existsById(gameId)) {
            throw new InstanceNotFoundException("project.entities.game");
        }
        
        List<GameExercise> gameExercises = (List<GameExercise>) gameExerciseDao.findAll();
        for (GameExercise gameExercise : gameExercises) {
            if(gameExercise.getExercise()!= null && gameExercise.getExercise().getId() == exerciseId && gameExercise.getGame().getId() == gameId){
                gameExerciseDao.delete(gameExercise);
            }
        }
	}

	@Override
	public Exercise updatExercise(Long exerciseId, String exerciseName, String description, String objective,
			String exerciseType) throws InstanceNotFoundException {

        if (!exerciseDao.existsById(exerciseId)) {
            throw new InstanceNotFoundException("project.entities.exercise");
        }

        if (!exerciseType.equals("Tactico") && !exerciseType.equals("Tecnica") 
                && !exerciseType.equals("Fisico") && !exerciseType.equals("Global")
                && !exerciseType.equals("Especifico") && !exerciseType.equals("Psicologico") 
                && !exerciseType.equals("Estrategia") && !exerciseType.equals("PrePartido")) {
            throw new InstanceNotFoundException("project.entities.exercise");
        }

        Exercise existingExercise = null;
        Long id = (long) -1;
        List<GameExercise> gameExercises = (List<GameExercise>) gameExerciseDao.findAll();
        for (GameExercise gameExercise : gameExercises) {
            if(gameExercise.getExercise() != null && gameExercise.getExercise().getId() == exerciseId){
                id = gameExercise.getExercise().getId();
                existingExercise = gameExercise.getExercise();
                if(exerciseName != null)
                    existingExercise.setExerciseName(exerciseName);
                if(description != null)
                    existingExercise.setDescription(description);
                if(objective != null)
                    existingExercise.setObjective(objective);
                if(exerciseType != null)
                    existingExercise.setExerciseType(exerciseType);
                exerciseDao.save(existingExercise);

                GameExercise gameExercise2 = gameExerciseDao.findById(gameExercise.getId()).get();
                if(exerciseName != null)
                    gameExercise2.getExercise().setExerciseName(exerciseName);
                if(description != null)
                    gameExercise2.getExercise().setDescription(description);
                if(objective != null)
                    gameExercise2.getExercise().setObjective(objective);
                if(exerciseType != null)
                    gameExercise2.getExercise().setExerciseType(exerciseType);
                gameExerciseDao.save(gameExercise2);
            }
        }

        List<TrainingExercise> trainingExercises = (List<TrainingExercise>) trainingExerciseDao.findAll();
        for (TrainingExercise trainingExercise : trainingExercises) {
            if(trainingExercise.getExercise() != null && trainingExercise.getExercise().getId() == exerciseId){
                id = trainingExercise.getExercise().getId();
                existingExercise = trainingExercise.getExercise();
                if(exerciseName != null)
                    existingExercise.setExerciseName(exerciseName);
                if(description != null)
                    existingExercise.setDescription(description);
                if(objective != null)
                    existingExercise.setObjective(objective);
                if(exerciseType != null)
                    existingExercise.setExerciseType(exerciseType);
                exerciseDao.save(existingExercise);

                TrainingExercise trainingExercise2 = trainingExerciseDao.findById(trainingExercise.getId()).get();
                if(exerciseName != null)
                    trainingExercise2.getExercise().setExerciseName(exerciseName);
                if(description != null)
                    trainingExercise2.getExercise().setDescription(description);
                if(objective != null)
                    trainingExercise2.getExercise().setObjective(objective);
                if(exerciseType != null)
                    trainingExercise2.getExercise().setExerciseType(exerciseType);
                trainingExerciseDao.save(trainingExercise2);
            }
        }

        if(id == -1){
            existingExercise = exerciseDao.findById(exerciseId).get();
            if(exerciseName != null)
            existingExercise.setExerciseName(exerciseName);
            if(description != null)
                existingExercise.setDescription(description);
            if(objective != null)
                existingExercise.setObjective(objective);
            if(exerciseType != null)
                existingExercise.setExerciseType(exerciseType);
            exerciseDao.save(existingExercise);
        }
		return existingExercise;
	}
}