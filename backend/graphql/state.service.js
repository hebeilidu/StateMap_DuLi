const {RESTDataSource} = require("apollo-datasource-rest");
const statesData = require("./state.data");
class StateService extends RESTDataSource{
  constructor() {
    super();
  }

  async queryState(query) {
    return statesData.filter(item => item.name.includes(query));
  }
}

module.exports = new StateService();