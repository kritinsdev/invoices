<template>
    <div @click="checkClick" ref="invoiceWrap" class="invoice-wrap flex flex-column">
      <form @submit.prevent="submitForm" class="invoice-content">
        <Spinner v-show="loading" />
        <h1 v-if="!editInvoice">New Invoice</h1>
        <h1 v-else>Edit Invoice</h1>
  
        <!-- Bill From -->
        <div class="bill-from flex flex-column">
          <h4>Bill From</h4>
          <div class="input flex flex-column">
            <label for="billerStreetAddress">Street Address</label>
            <input required type="text" id="billerStreetAddress" v-model="billerStreetAddress" />
          </div>
          <div class="location-details flex">
            <div class="input flex flex-column">
              <label for="billerCity">City</label>
              <input required type="text" id="billerCity" v-model="billerCity" />
            </div>
            <div class="input flex flex-column">
              <label for="billerZipCode">Zip Code</label>
              <input required type="text" id="billerZipCode" v-model="billerZipCode" />
            </div>
            <div class="input flex flex-column">
              <label for="billerCountry">Country</label>
              <input required type="text" id="billerCountry" v-model="billerCountry" />
            </div>
          </div>
        </div>
  
        <!-- Bill To -->
        <div class="bill-to flex flex-column">
          <h4>Bill To</h4>
          <div class="input flex flex-column">
            <label for="clientName">Client's Name</label>
            <input required type="text" id="clientName" v-model="clientName" />
          </div>
          <div class="input flex flex-column">
            <label for="clientEmail">Client's Email</label>
            <input required type="text" id="clientEmail" v-model="clientEmail" />
          </div>
          <div class="input flex flex-column">
            <label for="clientStreetAddress">Street Address</label>
            <input required type="text" id="clientStreetAddress" v-model="clientStreetAddress" />
          </div>
          <div class="location-details flex">
            <div class="input flex flex-column">
              <label for="clientCity">City</label>
              <input required type="text" id="clientCity" v-model="clientCity" />
            </div>
            <div class="input flex flex-column">
              <label for="clientZipCode">Zip Code</label>
              <input required type="text" id="clientZipCode" v-model="clientZipCode" />
            </div>
            <div class="input flex flex-column">
              <label for="clientCountry">Country</label>
              <input required type="text" id="clientCountry" v-model="clientCountry" />
            </div>
          </div>
        </div>
  
        <!-- Invoice Work Details -->
        <div class="invoice-work flex flex-column">
          <div class="payment flex">
            <div class="input flex flex-column">
              <label for="invoiceDate">Invoice Date</label>
              <input disabled type="text" id="invoiceDate" v-model="invoiceDate" />
            </div>
            <div class="input flex flex-column">
              <label for="paymentDueDate">Payment Due</label>
              <input disabled type="text" id="paymentDueDate" v-model="paymentDueDate" />
            </div>
          </div>
          <div class="input flex flex-column">
            <label for="paymentTerms">Payment Terms</label>
            <select required type="text" id="paymentTerms" v-model="paymentTerms">
              <option value="30">Net 30 Days</option>
              <option value="60">Net 60 Days</option>
            </select>
          </div>
          <div class="input flex flex-column">
            <label for="productDescription">Project Description</label>
            <input required type="text" id="productDescription" v-model="productDescription" />
          </div>
          <div class="work-items">
            <h3>Project pricing</h3>
            <table class="item-list">
              <tr class="table-heading flex">
                <th class="item-name">Task name</th>
                <th class="qty">Qty</th>
                <th class="price">Price</th>
                <th class="total">Total</th>
              </tr>
              <tr class="table-items flex" v-for="(item, index) in invoiceItemList" :key="index">
                <td class="item-name"><input type="text" v-model="item.itemName" /></td>
                <td class="qty"><input type="text" v-model="item.qty" /></td>
                <td class="price"><input type="text" v-model="item.price" /></td>
                <td class="total flex">€{{ (item.total = item.qty * item.price) }}</td>
                <div @click="deleteInvoiceItem(item.id)" class="delete-item">X</div>
              </tr>
            </table>
  
            <div @click="addNewInvoiceItem" class="button new-item">
              <span>+</span> Add New Task
            </div>
          </div>
        </div>
  
        <!-- Save/Exit -->
        <div class="save flex">
          <div class="left">
            <button type="button" @click="closeInvoice" class="red">Cancel</button>
          </div>
          <div class="right flex">
            <button v-if="!editInvoice" type="submit" @click="saveDraft" class="dark-purple">Save Draft</button>
            <button v-if="!editInvoice" type="submit" @click="publishInvoice" class="purple">Create Invoice</button>
            <button v-if="editInvoice" type="sumbit" class="purple">Update Invoice</button>
          </div>
        </div>
      </form>
    </div>
</template>
<script>
import db from '../firebase/firebaseInit';
import Spinner from '../components/Spinner.vue';
import { mapMutations } from 'vuex';
import {uid} from 'uid';
import { doc, setDoc } from '@firebase/firestore';
export default {
    name: "InvoiceModal",
    data() {
        return {
            dateOptions: { year: "numeric", month: "short", day: "numeric" },
            docId: null,
            loading: null,
            billerStreetAddress: null,
            billerCity: null,
            billerZipCode: null,
            billerCountry: null,
            clientName: null,
            clientEmail: null,
            clientStreetAddress: null,
            clientCity: null,
            clientZipCode: null,
            clientCountry: null,
            invoiceDateUnix: null,
            invoiceDate: null,
            paymentTerms: null,
            paymentDueDateUnix: null,
            paymentDueDate: null,
            productDescription: null,
            invoicePending: null,
            invoiceDraft: null,
            invoiceItemList: [],
            invoiceTotal: 0,
        }
    },
    components: {
      Spinner
    },
    created() {
      //get current date
      this.invoiceDateUnix = Date.now();
      this.invoiceDate = new Date(this.invoiceDateUnix).toLocaleDateString('en-us', this.dateOptions);
    },
    methods: {
      ...mapMutations(['TOGGLE_INVOICE', 'TOGGLE_MODAL']),

      checkClick(e) {
          console.log(this.TOGGLE_INVOICE);
      },

      closeInvoice() {
        
      },

      calcTotal() {
        this.invoiceTotal = 0;
        this.invoiceItemList.forEach((el) => {
          this.invoiceTotal += el.total
        });
      },

      addNewInvoiceItem() {
        this.invoiceItemList.push({
          id: uid(),
          itemName: "",
          qty:"",
          price:0,
          total:0
        });
      },

      deleteInvoiceItem(id) {
          this.invoiceItemList = this.invoiceItemList.filter(item => item.id !== id);
      },
      publishInvoice() {
        this.invoicePending = true;
      },

      saveDraft() {
        this.invoiceDraft = true;
      },

      async uploadInvoice() {
        if(this.invoiceItemList.length <= 0) {
          alert('Please ensure you filled out work items!');
          return;
        }

        this.loading = true;

        this.calcTotal();

        const invoiceId = uid(6);

        await setDoc(doc(db, "invoices", invoiceId), {
          invoiceId: invoiceId,
          billerStreetAddress: this.billerStreetAddress,
          billerCity: this.billerCity,
          billerZipCode: this.billerZipCode,
          billerCountry: this.billerCountry,
          clientName: this.clientName,
          clientEmail: this.clientEmail,
          clientStreetAddress: this.clientStreetAddress,
          clientCity: this.clientCity,
          clientZipCode: this.clientZipCode,
          clientCountry: this.clientCountry,
          invoiceDate: this.invoiceDate,
          invoiceDateUnix: this.invoiceDateUnix,
          paymentTerms: this.paymentTerms,
          paymentDueDate: this.paymentDueDate,
          paymentDueDateUnix: this.paymentDueDateUnix,
          productDescription: this.productDescription,
          invoiceItemList: this.invoiceItemList,
          invoiceTotal: this.invoiceTotal,
          invoicePending: this.invoicePending,
          invoiceDraft: this.invoiceDraft,
          invoicePaid: null,
        });
        
        this.loading = false;

        this.TOGGLE_INVOICE();
      },

      submitForm() {
        this.uploadInvoice();
      }
    },
    watch: {
      paymentTerms() {
        const futureDate = new Date();
        this.paymentDueDateUnix = futureDate.setDate(futureDate.getDate() + parseInt(this.paymentTerms));
        this.paymentDueDate = new Date(this.paymentDueDateUnix).toLocaleDateString('en-us', this.dateOptions);
      }
    }
}
</script>

<style lang="scss" scoped>
  .invoice-wrap {
    z-index: 50;
    position:fixed;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    background-color: transparent;
    height: 90vh;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    overflow-y: scroll;
    border-radius: 10px;

    &::-webkit-scrollbar {
      display: none;
    }

    .invoice-content {
      position: relative;
      padding:28px;
      width:100%;
      max-width: 600px;
      background-color: white;

      h1 {
        margin-bottom: 48px;
      }

      h3 {
        margin-bottom: 16px;
        font-size:18px;
      }

      h4 {
        margin-bottom: 16px;
        font-size: 14px;
      }

      .bill-to, .bill-from {
        margin-bottom: 24px;

        .location-details {
          gap:16px;

          div {
            flex:1;
          }
        }
      }

      .invoice-work {
        .payment {
          gap:16px;
          
          div {
            flex:1;
          }
        }

        .work-items {
          .item-list {
            width:100%;

            input {
              margin-bottom: 0;
            }

            .table-heading,
            .table-items {
              gap:16px;
              font-size: 12px;

              .item-name {
                flex-basis:50%;
              }

              .qty {
                  flex-basis: 10%;
                }
                
                .price {
                  flex-basis: 20%;
                }

                .total {
                  flex-basis: 20%;
                  align-self: center;
                }
            }

            .table-heading {
              margin-bottom: 16px;

              th {
                text-align: left;
              }
            }

            .table-items {
              position: relative;
              margin-bottom: 16px;
              align-items: center;
              
              .delete-item {
                cursor: pointer;
              }
            }
          }

          .new-item {
            display: flex;
            color:#000;
            background-color: #eeeeee;
            justify-content: center;
            font-weight: bold;
            text-transform: uppercase;
          }
        }
      }

      .save {
          margin-top: 16px;

          div {
            flex:1;
          }

          .right {
            justify-content: flex-end;
          }
        }
    }
    label {
      font-size: 12px;
      margin-bottom: 6px;
    }

    input, select {
      width:100%;
      background-color: #eeeeee;
      border-radius: 4px;
      border:none;
      padding:12px 0 12px 8px;
      margin-bottom: 24px;

      &:focus {
        outline: none;
      }
    }
  }
</style>