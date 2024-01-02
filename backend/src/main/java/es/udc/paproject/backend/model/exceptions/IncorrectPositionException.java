package es.udc.paproject.backend.model.exceptions;


@SuppressWarnings("serial")
public class IncorrectPositionException extends Exception{

    private String position;
    
    public IncorrectPositionException(String position){
        this.position=position;
    }

    public String getPosition() {
        return position;
    }
}