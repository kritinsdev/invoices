<template>
    <div v-if="currentInvoice" class="invoice-view container">
        <router-link class="nav-link flex" :to="{ name: 'Home' }">
            Go back
        </router-link>
        <div class="header flex">
            <div class="flex left">
                <div class="status-button flex"
                    :class="{ paid: currentInvoice.invoicePaid, draft: currentInvoice.invoiceDraft, pending: currentInvoice.invoicePending }">
                    <span v-if="currentInvoice.invoicePaid">Paid</span>
                    <span v-if="currentInvoice.invoiceDraft">Draft</span>
                    <span v-if="currentInvoice.invoicePending">Pending</span>
                </div>
            </div>
            <div class="flex right">
                <button @click="toggleEditInvoice(currentInvoice.docId)" class="dark-purple">Edit</button>
                <button @click="deleteInvoice(currentInvoice.docId)" class="red">Delete</button>
                <button v-if="currentInvoice.invoicePending" @click="updateStatusToPaid(currentInvoice.docId)"
                    class="green">Mark as paid</button>
                <button v-if="currentInvoice.invoiceDraft || currentInvoice.invoicePaid" @click="updateStatusToPending"
                    class="orange">Mark as pending</button>
            </div>
        </div>

        <div class="invoice-details flex flex-column">
            <div class="top flex">
                <div class="left flex">
                    <p><span>#</span> {{ currentInvoice.invoiceId }}</p>
                    <p>{{ currentInvoice.productDescription }}</p>
                </div>

                <div class="right flex flex-column">
                    <p>{{ currentInvoice.billerStreetAdress }}</p>
                    <p>{{ currentInvoice.billerCity }}</p>
                </div>
            </div>
            <div class="middle flex">
                <div class="payment flex flex-column">
                    <h4>Invoice date</h4>
                    <p>
                        {{ currentInvoice.invoiceDate }}
                    </p>
                    <h4>Payment date</h4>
                    <p>
                        {{ currentInvoice.paymentDueDate }}
                    </p>
                </div>
                <div class="bill flex flex-column">
                    <h4>Bill To</h4>
                    <p>{{ currentInvoice.clientName }}</p>
                    <p>{{ currentInvoice.clientStreetAddress }}</p>
                    <p>{{ currentInvoice.clientCity }}</p>
                </div>

                <div class="send-to flex flex-column">
                    <h4>Sent To</h4>
                    <p>{{ currentInvoice.clientEmail }}</p>
                </div>
            </div>
            <div class="bottom flex flex-column">
                <div class="billing-items">
                    <div class="heading flex">
                        <p>Item Name</p>
                        <p>Qty</p>
                        <p>Price</p>
                        <p>Total</p>
                    </div>
                    <div v-for="{item, index} in currentInvoice.invoiceItemList" :key="index" class="item flex">
                        <p>{{ item.itemName }}</p>
                        <p>{{ item.qty }}</p>
                        <p>{{ item.price }}</p>
                        <p>{{ item.total }}</p>
                    </div>
                    <div class="total flex">
                        <p>Amount</p>
                        <p>{{ currentInvoice.invoiceTotal }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
    name: "invoiceView",
    data() {
        return {
            currentInvoice: null,
        }
    },
    created() {
        this.getCurrentInvoice();
        console.log(this.currentInvoice);
    },
    methods: {
        ...mapMutations(['SET_CURRENT_INVOICE']),

        getCurrentInvoice() {
            this.SET_CURRENT_INVOICE(this.$route.params.invoiceId);
            this.currentInvoice = this.currentInvoiceArray[0];
        }
    },
    computed: {
        ...mapState(['currentInvoiceArray'])
    }
};
</script>

<style lang="scss" scoped>

</style>