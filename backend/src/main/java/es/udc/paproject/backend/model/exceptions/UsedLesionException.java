package es.udc.paproject.backend.model.exceptions;

@SuppressWarnings("serial")
public class UsedLesionException extends Exception{
    
    private String lesionName;

    public UsedLesionException(String lesionName) {
        this.lesionName = lesionName;
    }

    public String getLesionName() {
        return lesionName;
    }
}