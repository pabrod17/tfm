package es.udc.paproject.backend.model.exceptions;

@SuppressWarnings("serial")
public class UsedStretchingException  extends Exception{
    
    private String stretchingName;

    public UsedStretchingException(String stretchingName) {
        this.stretchingName = stretchingName;
    }

    public String getStretchingName() {
        return stretchingName;
    }
}