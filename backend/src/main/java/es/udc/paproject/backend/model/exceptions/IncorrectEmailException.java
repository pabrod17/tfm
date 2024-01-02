package es.udc.paproject.backend.model.exceptions;

@SuppressWarnings("serial")
public class IncorrectEmailException extends Exception{

    private String email;
    
    public IncorrectEmailException(String email){
        this.email=email;
    }

    public String getEmail() {
        return email;
    }
}