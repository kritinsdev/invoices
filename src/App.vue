<template>
  <div v-if="invoicesLoaded">
    <div v-if="!mobile" class="app flex flex-column">
      <div class="app-content flex flex-column">
        <Modal v-if="modalActive" />
        <transition name="invoice">
          <InvoiceModal v-if="invoiceModal" />
        </transition>
        <router-view />
      </div>
    </div>

    <div v-else class="mobile-message flex flex-column">
      <h2>Sorry, this app is not supported on mobile devices</h2>
      <p>To use this app, please use tabled or computer</p>
    </div>
  </div>
</template>

<script>
import InvoiceModal from './components/InvoiceModal.vue';
import Modal from './components/Modal.vue';
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      mobile: null
    }
  },
  components: {
    Navigation,
    InvoiceModal,
    Modal
},
  created() {
    this.GET_INVOICES();
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
  },
  methods: {
    ...mapActions(['GET_INVOICES']),

    checkScreenSize() {
      const windowWidth = window.innerWidth;

      if(windowWidth <= 750) {
        this.mobile = true;
        return;
      }

      this.mobile = false;
    }
  },
  computed: {
    ...mapState(['invoiceModal', 'modalActive', 'invoicesLoaded'])
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  .app {
  background-color: white;
  min-height: 100vh;
  @media(min-width: 900px) {
    flex-direction: row;
  }

  .app-content {
    padding:0 20px;
    flex:1;
    position:relative;
  }
}

.mobile-message {
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #141625;
  padding:0 20px;
  color:white;

  p {
    margin-top: 16px;
  }
}
}

.invoice-enter-from,
.invoice-leave-to {
  transform: translateX(-700px);
}

.invoice-enter-active,
.invoice-leave-active
{
  transition: all .8s ease;
}

button,
.button {
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 30px;
  border: none;
  font-size: 12px;
  margin-right: 8px;
  color: #fff;
}
.dark-purple {
  background-color: #252945;
}
.red {
  background-color: #ec5757;
}
.purple {
  background-color: #7c5dfa;
}
.green {
  background-color: #33d69f;
}
.orange {
  background-color: #ff8f00;
}
// utility classes
.flex {
  display: flex;
}
.flex-column {
  flex-direction: column;
}
.container {
  width: 100%;
  padding: 40px 10px;
  max-width: 850px;
  margin: 0 auto;
  @media (min-width: 900px) {
    padding-top: 72px;
  }
}
.nav-link {
  text-decoration: none;
  color: initial;
}
// Status Button Styling
.status-button {
  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 8px;
  }
  font-size: 12px;
  align-items: center;
  padding: 8px;
  border-radius: 10px;
}
.paid {
  &::before {
    background-color: #33d69f;
  }
  color: #33d69f;
  background-color: rgba(51, 214, 160, 0.3);
}
.pending {
  &::before {
    background-color: #ff8f00;
  }
  color: #ff8f00;
  background-color: rgba(255, 145, 0, 0.3);
}
.draft {
  &::before {
    background-color: #dfe3fa;
  }
  color: #dfe3fa;
  background-color: rgba(223, 227, 250, 0.3);
}
</style>