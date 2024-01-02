package es.udc.paproject.backend.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Validations {
    
    public static boolean isValidPhoneNumber(String phoneNumber) 
    { 
        //movil:
        Pattern p = Pattern.compile("^(\\+34|0034|34)?[6789]\\d{8}$");
        //fijo:
        //Pattern pattern = Pattern.compile("^(\\+34|0034|34)?[67]\\d{8}$");

        Matcher m = p.matcher(phoneNumber); 
        return (m.find() && m.group().equals(phoneNumber)); 
    }

    public static boolean isValidDni(String dni) {
		String letraMayuscula = "";
			
		if(dni.length() != 9 || Character.isLetter(dni.charAt(8)) == false ) {
			return false;
		}
		
		letraMayuscula = (dni.substring(8)).toUpperCase();

		if(soloNumeros(dni) == true && letraDNI(dni).equals(letraMayuscula)) {
            return true;
        } else {
            return false;
        }
    }

    private static boolean soloNumeros(String dni) {
        int i, j = 0;
        String numero = ""; 
        String miDNI = ""; 
        String[] unoNueve = { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" };

        for (i = 0; i < dni.length() - 1; i++) {
            numero = dni.substring(i, i + 1);

            for (j = 0; j < unoNueve.length; j++) {
                if (numero.equals(unoNueve[j])) {
                    miDNI += unoNueve[j];
                }
            }
        }

        if (miDNI.length() != 8) {
            return false;
        } else {
            return true;
        }
    }

    private static String letraDNI(String dni) {
		int miDNI = Integer.parseInt(dni.substring(0,8));
		int resto = 0;
		String miLetra = "";
		String[] asignacionLetra = {"T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"};

		resto = miDNI % 23;
		miLetra = asignacionLetra[resto];
		return miLetra;
	}

    public static boolean isValidEmail(String email) {
        Pattern pattern = Pattern
                .compile("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
                        + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
        Matcher mather = pattern.matcher(email);
 
        if (mather.find() == true) {
            return true;
        } else {
            return false;
        }
    }


}