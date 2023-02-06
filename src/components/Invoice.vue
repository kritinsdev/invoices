<template>
    <router-link class="invoice" :to="{ name: 'Invoice', params: { invoiceId: invoice.invoiceId } }">
        <div class="flex meta">
            <span class="person">{{ invoice.clientName }}</span>
            <span class="due-date">{{ invoice.paymentDueDate }}</span>
        </div>

        <div class="price">€{{ invoice.invoiceTotal }}</div>

        <div class="status-button flex"
            :class="{ paid: invoice.invoicePaid, draft: invoice.invoiceDraft, pending: invoice.invoicePending }">
            <span v-if="invoice.invoicePaid">Paid</span>
            <span v-if="invoice.invoiceDraft">Draft</span>
            <span v-if="invoice.invoicePending">Pending</span>
        </div>
    </router-link>
</template>

<script>
export default {
    name: 'invoice',
    props: ['invoice']
};
</script>

<style lang="scss" scoped>
.invoice {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    color:#000;
    border-radius: 10px;
    flex: 0 0 calc(33% - 16px);
    background-color: white;
    text-decoration: none;
    cursor: pointer;
    gap: 16px;
    padding:8px;
    position: relative;
    display: flex;
    flex-direction: column;

    .price {
        font-size: 24px;
        font-weight: bold;
    }

    .meta {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .person {
            font-weight: bold;
            font-size: 14px;
        }

        .due-date {
            font-size: 12px;
            color:#c8c8c8;
        }
    }

    .tracking-number {
    }

    .data {
        flex-direction: column;
    }
}
</style>