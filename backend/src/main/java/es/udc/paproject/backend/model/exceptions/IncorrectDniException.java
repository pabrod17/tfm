package es.udc.paproject.backend.model.exceptions;

@SuppressWarnings("serial")
public class IncorrectDniException extends Exception{

    private String dni;
    
    public IncorrectDniException(String dni){
        this.dni=dni;
    }

    public String getDni() {
        return dni;
    }}