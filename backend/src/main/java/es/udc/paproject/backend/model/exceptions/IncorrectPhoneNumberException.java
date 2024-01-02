package es.udc.paproject.backend.model.exceptions;


@SuppressWarnings("serial")
public class IncorrectPhoneNumberException extends Exception{
    
    private String phoneNumber;
    
    public IncorrectPhoneNumberException(String phoneNumber){
        this.phoneNumber=phoneNumber;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }
}