package es.udc.paproject.backend.rest.dtos;

import java.util.List;
import java.util.stream.Collectors;

import es.udc.paproject.backend.model.entities.Player;

public class PlayerConversor {

    public PlayerConversor() {
    }
    
    public final static PlayerDto toPlayerDto(Player player) {
        return new PlayerDto(player.getId(), player.getPlayerName(), player.getPrimaryLastName(), player.getSecondLastName(), player.getPosition(),
        player.getTrends(), player.getPhoneNumber(), player.getEmail(), player.getDni(), player.getTeam().getId(), 
        player.getTotalPoints(), player.getTotalThreePointShots(), player.getTotalSetShots(), player.getTotalFreeShots(), player.getTotalFailThreePointShots(), player.getTotalfailSetShots(), 
        player.getTotalfailFreeShots(), player.getTotalRebounds(), player.getTotalBlockedShot(), player.getTotalAssists(), player.getTotalPersonalFouls(), player.getTotalTechnicalFouls(), player.getTotalUnsportsmanlikeFouls(),
        player.isInjured());
    }

    public final static List<PlayerDto> toPlayerDtos(List<Player> players) {
        return players.stream().map(c -> toPlayerDto(c)).collect(Collectors.toList());
    }
}