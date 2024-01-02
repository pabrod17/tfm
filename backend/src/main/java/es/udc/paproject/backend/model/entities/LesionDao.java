package es.udc.paproject.backend.model.entities;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface LesionDao extends PagingAndSortingRepository<Lesion, Long>{

    Slice<Lesion> findByLesionTypeOrderById(String lesionType, Pageable pageable);

    Page<Lesion> findAll(Pageable pageable);

    List<Lesion> findByLesionType(String lesionType);

    List<Lesion> findAll();
}