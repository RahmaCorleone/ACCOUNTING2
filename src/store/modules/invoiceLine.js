const state = {
    invoiceLines: [
      { id: 1, productName: 'Product A', quantity: 10, price: 5, invoiceID: 'INV-001' },
      { id: 2, productName: 'Product B', quantity: 2, price: 15, invoiceID: 'INV-002' },
    ],
    editableInvoiceLine: {
      productName: '',
      quantity: 0,
      price: 0,
      invoiceID: '',
    },
    editedLineId: null,
    searchQuery: '',
    newLine: {
      id: null,
    },
    sortKey: '',
    sortOrder: 1,
  };
  
  const getters = {
    filteredInvoiceLines: (state) => {
      if (!state.searchQuery) {
        return state.invoiceLines;
      }
      const lowerCaseQuery = state.searchQuery.toLowerCase();
      return state.invoiceLines.filter(
        (line) =>
          line.productName.toLowerCase().includes(lowerCaseQuery) ||
          line.invoiceID.toLowerCase().includes(lowerCaseQuery)
      );
    },
    sortedAndFilteredInvoiceLines: (state, getters) => {
      let filteredLines = getters.filteredInvoiceLines;
  
      if (state.sortKey) {
        filteredLines = filteredLines.slice().sort((a, b) => {
          let result = 0;
          if (a[state.sortKey] < b[state.sortKey]) result = -1;
          if (a[state.sortKey] > b[state.sortKey]) result = 1;
          return result * state.sortOrder;
        });
      }
  
      return filteredLines;
    },
  };
  
  const actions = {
    editInvoiceLine({ commit, state }, id) {
      const line = state.invoiceLines.find((l) => l.id === id);
      if (line) {
        commit('setEditableInvoiceLine', { ...line });
        commit('setEditedLineId', id);
      }
    },
    saveInvoiceLine({ commit, state }) {
        const id = state.editableInvoiceLine.id;
        const index = state.invoiceLines.findIndex((line) => line.id === id);
        if (index !== -1) {
          commit('updateInvoiceLine', { index, line: { ...state.editableInvoiceLine, id } });
        }
        commit('cancelEdit');
      },
      
    deleteInvoiceLine({ commit }, id) {
        commit('deleteInvoiceLine', id);
      },
    cancelEdit({ commit }) {
      commit('resetEditableInvoiceLine');
      commit('setEditedLineId', null);
      commit('resetNewLine');
    },
    addNewInvoiceLine({ commit }) {
        const newLine = { id: Date.now(), productName: '', quantity: 0, price: 0, invoiceID: '' };
        commit('addInvoiceLine', newLine);
        commit('setEditableInvoiceLine', newLine);
        commit('setEditedLineId', newLine.id);
      },
      saveNewInvoiceLine({ commit, state }) {
        const id = state.newLine.id; // Get the ID from the new line
        const index = state.invoiceLines.findIndex((line) => line.id === id);
        if (index !== -1) {
          commit('updateInvoiceLine', { index, line: { ...state.editableInvoiceLine, id } });
        } else {
          commit('addInvoiceLine', { ...state.editableInvoiceLine, id: Date.now() });
        }
        commit('cancelEdit');
      },
      
    sort({ commit, state }, key) {
      if (state.sortKey === key) {
        commit('setSortOrder', state.sortOrder * -1);
      } else {
        commit('setSortKey', key);
        commit('setSortOrder', 1);
      }
    },
    getSortIcon({ state }, key) {
      if (state.sortKey !== key) return 'fas fa-sort';
      return state.sortOrder === 1 ? 'fas fa-sort-up' : 'fas fa-sort-down';
    },
    
    
  };
  
  const mutations = {
    addInvoiceLine(state, newLine) {
        state.invoiceLines.push(newLine);
      },
    setEditableInvoiceLine(state, line) {
      state.editableInvoiceLine = line;
    },
    setEditedLineId(state, id) {
      state.editedLineId = id;
    },
    updateInvoiceLine(state, { index, line }) {
      state.invoiceLines[index] = line;
    },
    deleteInvoiceLine(state, id) {
      state.invoiceLines = state.invoiceLines.filter((line) => line.id !== id);
    },
    resetEditableInvoiceLine(state) {
      state.editableInvoiceLine = { productName: '', quantity: 0, price: 0, invoiceID: '' };
    },
    setNewLine(state, line) {
      state.newLine = line;
    },
    resetNewLine(state) {
      state.newLine = { id: null };
    },
    setSortKey(state, key) {
      state.sortKey = key;
    },
    setSortOrder(state, order) {
      state.sortOrder = order;
    },
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },
  };
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
  };
  