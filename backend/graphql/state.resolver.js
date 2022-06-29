
const StateResolver = {
  Query: {
    states: (_, {query}, {dataSources}) => {
      return dataSources.stateService.queryState(query);
    },
    all: (_, $, {dataSources}) => {
      return dataSources.stateService.queryState('');
    }
  }
}

module.exports = StateResolver;