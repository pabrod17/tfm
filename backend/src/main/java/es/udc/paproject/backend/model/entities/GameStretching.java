package es.udc.paproject.backend.model.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class GameStretching {
    
    private Long id;
    private Game game;
    private Stretching stretching;

    public GameStretching() {
    }

    public GameStretching(Game game, Stretching stretching) {
        this.game = game;
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
    @JoinColumn(name = "gameId", nullable = true)
    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
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