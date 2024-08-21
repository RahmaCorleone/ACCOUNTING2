const state = {
    providers: [
      {
        ID: '12345',
        Name: 'John Doe',
        Address: '123 Main St',
        Phone: '123-456-7890',
        Service: 'General Practitioner',
        Note: 'Available on weekends',
      },
    ],
  };
  
  const mutations = {
    ADD_PROVIDER(state, provider) {
      state.providers.push(provider);
    },
    UPDATE_PROVIDER(state, updatedProvider) {
      const index = state.providers.findIndex(p => p.ID === updatedProvider.ID);
      if (index !== -1) {
        state.providers[index] = updatedProvider;
      }
    },
    DELETE_PROVIDER(state, providerID) {
      state.providers = state.providers.filter(provider => provider.ID !== providerID);
    },
  };
  
  const actions = {
    addProvider({ commit }, provider) {
      commit('ADD_PROVIDER', provider);
    },
    updateProvider({ commit }, provider) {
      commit('UPDATE_PROVIDER', provider);
    },
    deleteProvider({ commit }, providerID) {
      commit('DELETE_PROVIDER', providerID);
    },
  };
  
  const getters = {
    allProviders: state => state.providers,
  };
  
  export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true,
  };
  