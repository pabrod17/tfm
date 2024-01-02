package es.udc.paproject.backend.model.exceptions;

@SuppressWarnings("serial")
public class IncorrectPlayTypeException extends Exception{

    private String playType;

    public IncorrectPlayTypeException(String playType) {
        this.playType = playType;
    }

    public String getPlayType() {
        return playType;
    }
}