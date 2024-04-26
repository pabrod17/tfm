package es.udc.paproject.backend.model.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import es.udc.paproject.backend.model.entities.*;
import es.udc.paproject.backend.model.exceptions.IncorrectLoginException;
import es.udc.paproject.backend.model.exceptions.IncorrectPasswordException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.udc.paproject.backend.model.exceptions.DuplicateInstanceException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	
	@Autowired
	private PermissionChecker permissionChecker;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private UserDao userDao;

	@Autowired
	private SeasonTeamDao seasonTeamDao;

	@Autowired
	private TeamDao teamDao;

	@Autowired
	private SeasonDao seasonDao;

	@Autowired
	private PlayTeamDao playTeamDao;

	@Autowired
	private PlayDao playDao;
	
	@Override
	public void signUp(User user) throws DuplicateInstanceException {
		
		if (userDao.existsByUserName(user.getUserName())) {
			throw new DuplicateInstanceException("project.entities.user", user.getUserName());
		}
			
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setRole(User.RoleType.COACH);
		
		userDao.save(user);
		
	}

	@Override
	public void signUpUser(Long createdBy, User user) throws InstanceNotFoundException {
		if (!userDao.existsById(createdBy)) {
			throw new InstanceNotFoundException("project.entities.user", createdBy);
		}

		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setRole(User.RoleType.USER);
		user.setCreatedBy(createdBy);
		userDao.save(user);

	}

	@Override
	public void signUpCoach(Long createdBy, User user) throws InstanceNotFoundException {
		if (!userDao.existsById(createdBy)) {
			throw new InstanceNotFoundException("project.entities.user", createdBy);
		}

		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setRole(User.RoleType.COACH);
		userDao.save(user);

	}

	@Override
	public List<User> findUsersByCoachId(Long userId) throws InstanceNotFoundException {

		if (!userDao.existsById(userId)) {
			throw new InstanceNotFoundException("project.entities.user");
		}

		List<User> users = new ArrayList<>();

		users = userDao.findByCreatedBy(userId);

		if (users.isEmpty()) {
			return users;
		}

		return users;
	}

	@Override
	public List<User> findAllUsers(Long userId) throws InstanceNotFoundException {

		if (!userDao.existsById(userId)) {
			throw new InstanceNotFoundException("project.entities.user");
		}
		User admin = userDao.findById(userId).get();

		List<User> users = new ArrayList<>();

		if(admin.getRole().name().equals("ADMIN")) {
			users = (List<User>) userDao.findAll();

		} else {
			throw new InstanceNotFoundException("project.entities.user");
		}

		if (users.isEmpty()) {
			return users;
		}
		List<User> usersWithoutAdmin = users.stream()
				.filter(user -> !user.getRole().name().equals("ADMIN"))
				.collect(Collectors.toList());

		return usersWithoutAdmin;
	}

	@Override
	@Transactional(readOnly=true)
	public User login(String userName, String password) throws IncorrectLoginException {
		
		Optional<User> user = userDao.findByUserName(userName);
		
		if (!user.isPresent()) {
			throw new IncorrectLoginException(userName, password);
		}
		
		if (!passwordEncoder.matches(password, user.get().getPassword())) {
			throw new IncorrectLoginException(userName, password);
		}
		
		return user.get();
		
	}
	
	@Override
	@Transactional(readOnly=true)
	public User loginFromId(Long id) throws InstanceNotFoundException {
		return permissionChecker.checkUser(id);
	}

	@Override
	public User updateProfile(Long id, String firstName, String lastName, String email) throws InstanceNotFoundException {
		
		User user = permissionChecker.checkUser(id);
		
		user.setFirstName(firstName);
		user.setLastName(lastName);
		user.setEmail(email);
		
		return user;

	}

	@Override
	public void changePassword(Long id, String oldPassword, String newPassword)
		throws InstanceNotFoundException, IncorrectPasswordException {
		
		User user = permissionChecker.checkUser(id);
		
		if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
			throw new IncorrectPasswordException();
		} else {
			user.setPassword(passwordEncoder.encode(newPassword));
		}
		
	}

	@Override
	public void removeUserByCoachId(Long coachId, Long userId) throws InstanceNotFoundException {

		if (!userDao.existsById(coachId)) {
			throw new InstanceNotFoundException("project.entities.team");
		}
		if (!userDao.existsById(userId)) {
			throw new InstanceNotFoundException("project.entities.player");
		}

		User coach = userDao.findById(coachId).get();
		User user = userDao.findById(userId).get();
		if (coach.getRole().name().equals("COACH") && user.getCreatedBy().equals(coachId)) {
			userDao.delete(user);
		}
	}
	@Override
	public void removeUserByAdminId(Long adminId, Long userId) throws InstanceNotFoundException {

		if (!userDao.existsById(adminId)) {
			throw new InstanceNotFoundException("project.entities.team");
		}
		if (!userDao.existsById(userId)) {
			throw new InstanceNotFoundException("project.entities.player");
		}
		List<User> users = new ArrayList<>();

		User admin = userDao.findById(adminId).get();
		User user = userDao.findById(userId).get();

		if (admin.getRole().name().equals("ADMIN")) {
			List<SeasonTeam> seasonTeams = new ArrayList<>();
			seasonTeams = (List<SeasonTeam>) seasonTeamDao.findByUserId(userId);


			for(SeasonTeam seasonTeam : seasonTeams) {
				if(seasonTeam.getTeam() != null) {
					teamDao.delete(seasonTeam.getTeam());
					seasonTeam.setTeam(null);
				}
				if(seasonTeam.getSeason() != null) {
					seasonDao.delete(seasonTeam.getSeason());
					seasonTeam.setSeason(null);
				}
			}




			users = userDao.findByCreatedBy(userId);
			for(User user1: users) {
				userDao.delete(user1);
			}

			userDao.delete(user);

		}
	}


}
