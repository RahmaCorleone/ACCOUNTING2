const state = {
    invoices: [
      {
        ID: 1,
        DateTime: '2024-07-01 12:00:00',
        ProviderName: 'Provider A',
        Address: '123 Main St',
        Total: 100,
        Paid: 50,
        Remaining: 50,
        DeliveredBy: 'Delivery Person A',
      },
      {
        ID: 2,
        DateTime: '2024-07-02 13:00:00',
        ProviderName: 'Provider B',
        Address: '456 Elm St',
        Total: 200,
        Paid: 200,
        Remaining: 0,
        DeliveredBy: 'Delivery Person B',
      },
    ],
  };
  
  const mutations = {
    ADD_INVOICE(state, invoice) {
      state.invoices.push(invoice);
    },
    UPDATE_INVOICE(state, updatedInvoice) {
      const index = state.invoices.findIndex(invoice => invoice.ID === updatedInvoice.ID);
      if (index !== -1) {
        state.invoices.splice(index, 1, updatedInvoice);
      }
    },
    DELETE_INVOICE(state, invoiceID) {
      state.invoices = state.invoices.filter(invoice => invoice.ID !== invoiceID);
    },
  };
  
  const actions = {
    addInvoice({ commit }, invoice) {
      commit('ADD_INVOICE', invoice);
    },
    updateInvoice({ commit }, invoice) {
      commit('UPDATE_INVOICE', invoice);
    },
    deleteInvoice({ commit }, invoiceID) {
      commit('DELETE_INVOICE', invoiceID);
    },
  };
  
  const getters = {
    allInvoices: state => state.invoices,
  };
  
  export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true,
  };
  