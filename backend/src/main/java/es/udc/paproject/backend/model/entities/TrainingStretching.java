package es.udc.paproject.backend.model.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class TrainingStretching {

    private Long id;
    private Training training;
    private Stretching stretching;

    public TrainingStretching() {
    }

    public TrainingStretching(Training training, Stretching stretching) {
        this.training = training;
        this.stretching = stretching;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trainingId", nullable = true)
    public Training getTraining() {
        return training;
    }

    public void setTraining(Training training) {
        this.training = training;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stretchingId", nullable = true)
    public Stretching getStretching() {
        return stretching;
    }

    public void setStretching(Stretching stretching) {
        this.stretching = stretching;
    }
}