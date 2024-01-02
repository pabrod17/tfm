package es.udc.paproject.backend.model.entities;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ExerciseDao extends PagingAndSortingRepository<Exercise, Long>{

    Slice<Exercise> findByExerciseTypeOrderById(String exerciseType, Pageable pageable);

    List<Exercise> findByExerciseType(String exerciseType);

    Page<Exercise> findAll(Pageable pageable);

    List<Exercise> findAll();
}