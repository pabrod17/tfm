package es.udc.paproject.backend.model.entities;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserDao extends PagingAndSortingRepository<User, Long> {
	
	boolean existsByUserName(String userName);

	Optional<User> findByUserName(String userName);
	List<User> findByCreatedBy(Long createdBy);


}
