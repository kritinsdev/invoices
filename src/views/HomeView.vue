<template>
  <div class="home container">
    <div class="header flex">
      <div class="left flex flex-column">
        <h1>Invoices</h1>
        <span>There are 3 total invoices</span>
      </div>
      <div class="right flex">
        <select class="filter" name="filter" id="filter">
          <option value="">Filter by status</option>
          <option value="draft">Draft</option>
          <option value="pending">Pending invoices</option>
          <option value="paid">Paid invoices</option>
          <option value="clear">Clear filter</option>
        </select>

        <button @click="newInvoice" class="button flex purple">
          <span>+ New Invoice</span>
        </button>
      </div>
    </div>
    <div class="invoices" v-if="invoiceData.length > 0">
      <Invoice v-for="(invoice, index) in invoiceData" :invoice="invoice" :key="index" />
    </div>
    <div v-else class="empty flex flex-column">
      <img src="@/assets/invoices-empty.svg" alt="no-invoices">
      <h3>There are no invoices</h3>
      <p>Create a new invoice by clicking the New Invoice button</p>
    </div>
  </div>
</template>
  
<script>
import Invoice from '../components/Invoice.vue';
import { mapMutations, mapState } from 'vuex';

export default {
  name: "HomeView",
  components: {
    Invoice
  },
  methods: {
    ...mapMutations(['TOGGLE_INVOICE']),
    newInvoice() {
      this.TOGGLE_INVOICE();
    }
  },
  computed: {
    ...mapState(['invoiceData'])
  }
};
</script>

<style lang="scss" scoped>
.header {
  justify-content: space-between;
  align-items: center;
}

.left {

  span {
    font-size: 14px;
  }
}

.right {
  gap: 24px;

  .filter {
    border: none;
    outline: none;
    background-color: transparent;

    option {
      color: black;
      outline: none;
    }

    &:hover {
      cursor: pointer;
    }
  }

  button {
    gap: 8px;
    transition: background-color .3s ease-in-out;

    &:hover {
      background-color: #9278fc;
    }
  }
}

.invoices {
  display: flex;
  gap:16px;
  flex-wrap: wrap;
  margin-top: 32px;
}

.empty {
  margin-top: 140px;
  align-items: center;

  img {
    width: 240px;
  }

  h3 {
    margin-top: 40px;
  }
}
</style>