<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />
    <div v-else class="row">
      <HomeBill :rates="currency.conversion_rates" />
      <HomeCurrency :rates="currency.conversion_rates" :date="currency.time_last_update_unix*1000" />
    </div>
  </div>
</template>

<script>
import HomeBill from "@/components/HomeBill";
import HomeCurrency from "@/components/HomeCurrency";
export default {
  name: "Home",
  metaInfo() {
    return {
      title: this.$title('Menu_Bill')
    }
  },
  components: { HomeCurrency, HomeBill },
  data: () => ({
    loading: true,
    currency: null
  }),
  mounted() {
    this.refresh();
  },
  methods: {
    async refresh() {
      try {
        this.loading = true;
        this.currency = await this.$store.dispatch("fetchCurrency");
        this.loading = false;
      } catch (e) {}
    }
  }
};
</script>
