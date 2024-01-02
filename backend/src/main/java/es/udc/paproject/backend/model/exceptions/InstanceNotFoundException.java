package es.udc.paproject.backend.model.exceptions;

@SuppressWarnings("serial")
public class InstanceNotFoundException extends InstanceException {
    
    public InstanceNotFoundException(String name, Object key) {
    	super(name, key); 	
    }

    public InstanceNotFoundException(String name, String teamName) {
    	super(name, teamName); 	
    }

	public InstanceNotFoundException(String message) {
        super(message);
	}
}
