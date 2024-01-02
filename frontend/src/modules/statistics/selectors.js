const getModuleState = state => state.statistics;

export const getGameStatistics = state =>
    getModuleState(state).gameStatistics;

export const getPlayerGameStatistics = state =>
    getModuleState(state).playerGameStatistics;