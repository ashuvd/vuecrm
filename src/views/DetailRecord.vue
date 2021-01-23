<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a class="breadcrumb">
          <!--          В шаблоне лучше не писать логику, показано для примера-->
          {{ record.type === "income" ? "Доход" : "Расход" }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="{
              red: record.type === 'outcome',
              green: record.type === 'income'
            }"
          >
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма: {{ record.amount | fCurrency }}</p>
              <p>Категория: {{ record.categoryName }}</p>

              <small>{{ record.date | fDate("datetime") }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>
      Запись с id=<strong>{{ $route.params.id }}</strong> не найдена
    </p>
  </div>
</template>

<script>
export default {
  name: "DetailRecord",
  metaInfo() {
    return {
      title: this.$title('DetailRecord')
    }
  },
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted() {
    try {
      const record = await this.$store.dispatch(
        "fetchRecordById",
        this.$route.params.id
      );
      const category = await this.$store.dispatch(
        "fetchCategoryById",
        record.categoryId
      );

      this.record = {
        ...record,
        categoryName: category.title
      };
    } catch (e) {}
    this.loading = false;
  }
};
</script>

<style scoped></style>
