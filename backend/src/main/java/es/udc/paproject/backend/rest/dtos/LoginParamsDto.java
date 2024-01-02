package es.udc.paproject.backend.rest.dtos;

import javax.validation.constraints.NotNull;

public class LoginParamsDto {
	
	private String userName;
	private String password;
	
	public LoginParamsDto() {}

	@NotNull
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName.trim();
	}

	@NotNull
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
