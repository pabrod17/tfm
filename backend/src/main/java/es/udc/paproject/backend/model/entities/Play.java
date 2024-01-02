package es.udc.paproject.backend.model.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Play {

    private Long id;
    private String title;
    private PlayType playType;
    private String gesture;
    private String pointGuardText;
    private String shootingGuardText;
    private String smallForwardText;
    private String powerForwardText;
    private String centerText;

    public Play() {
    }

    public Play(String title, PlayType playType, String gesture, String pointGuardText, String shootingGuardText,
            String smallForwardText, String powerForwardText, String centerText) {
        this.title = title;
        this.playType = playType;
        this.gesture = gesture;
        this.pointGuardText = pointGuardText;
        this.shootingGuardText = shootingGuardText;
        this.smallForwardText = smallForwardText;
        this.powerForwardText = powerForwardText;
        this.centerText = centerText;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getGesture() {
        return gesture;
    }

    public void setGesture(String gesture) {
        this.gesture = gesture;
    }

	public String getPointGuardText() {
		return pointGuardText;
	}

	public void setPointGuardText(String pointGuardText) {
		this.pointGuardText = pointGuardText;
	}

	public String getShootingGuardText() {
		return shootingGuardText;
	}

	public void setShootingGuardText(String shootingGuardText) {
		this.shootingGuardText = shootingGuardText;
	}

	public String getSmallForwardText() {
		return smallForwardText;
	}

	public void setSmallForwardText(String smallForwardText) {
		this.smallForwardText = smallForwardText;
	}

	public String getPowerForwardText() {
		return powerForwardText;
	}

	public void setPowerForwardText(String powerForwardText) {
		this.powerForwardText = powerForwardText;
	}

	public String getCenterText() {
		return centerText;
	}

	public void setCenterText(String centerText) {
		this.centerText = centerText;
	}

    public String getPlayType() {
        return playType.name();
    }

    public void setPlayType(String playType) {
        this.playType = PlayType.valueOf(playType);
    }
}