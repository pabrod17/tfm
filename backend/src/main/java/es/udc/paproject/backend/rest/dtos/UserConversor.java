package es.udc.paproject.backend.rest.dtos;

import es.udc.paproject.backend.model.entities.Game;
import es.udc.paproject.backend.model.entities.User;

import java.util.List;
import java.util.stream.Collectors;

public class UserConversor {
	
	private UserConversor() {}
	
	public final static UserDto toUserDto(User user) {
		return new UserDto(user.getId(), user.getUserName(), user.getFirstName(), user.getLastName(), user.getEmail(),
			user.getRole().toString(), user.getCreatedBy());
	}

	public final static List<UserDto> toUserDtos(List<User> users) {
		return users.stream().map(c -> toUserDto(c)).collect(Collectors.toList());
	}
	
	public final static User toUser(UserDto userDto) {
		
		return new User(userDto.getUserName(), userDto.getPassword(), userDto.getFirstName(), userDto.getLastName(),
			userDto.getEmail(), userDto.getCreatedBy());
	}
	
	public final static AuthenticatedUserDto toAuthenticatedUserDto(String serviceToken, User user) {
		
		return new AuthenticatedUserDto(serviceToken, toUserDto(user));
		
	}

}
