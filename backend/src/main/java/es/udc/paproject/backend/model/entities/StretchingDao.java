package es.udc.paproject.backend.model.entities;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface StretchingDao extends PagingAndSortingRepository<Stretching, Long> {

    Slice<Stretching> findByStretchingTypeOrderById(String stretchingType, Pageable pageable);

    List<Stretching> findByStretchingType(String stretchingType);

    Page<Stretching> findAll(Pageable pageable);

    List<Stretching> findAll();
}