package es.udc.paproject.backend.model.exceptions;

@SuppressWarnings("serial")
public class UsedPlayException extends Exception{
    
    private String title;

    public UsedPlayException(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }
}