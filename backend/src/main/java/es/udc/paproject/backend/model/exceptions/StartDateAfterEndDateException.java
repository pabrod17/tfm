package es.udc.paproject.backend.model.exceptions;

import java.time.LocalDateTime;
@SuppressWarnings("serial")
public class StartDateAfterEndDateException extends Exception{

    private LocalDateTime startDate;
    private LocalDateTime endDate;

    public StartDateAfterEndDateException(LocalDateTime startDate, LocalDateTime endDate){
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }
}