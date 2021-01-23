<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div v-else class="row">
        <CategoryCreate @created="addNewCategory" />
        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          @updated="updateCategory"
          :key="categories.length + updateCount"
        />
        <p v-else class="center">Категорий пока нет</p>
        <!--categories.length будет изменятся при добавлении новой категории и нам нужно будет перерендерить компонент редактирования-->
        <!--updateCount будет изменятся при обновлении категории и нам нужно будет перерендерить компонент редактирования-->
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "../components/CategoryCreate";
import CategoryEdit from "../components/CategoryEdit";
export default {
  name: "Categories",
  metaInfo() {
    return {
      title: this.$title('Menu_Categories')
    }
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateCategory({ id, title, limit }) {
      const idx = this.categories.findIndex(c => c.id === id);
      this.categories[idx].title = title;
      this.categories[idx].limit = limit;
      this.updateCount++;
    }
  },
  components: { CategoryEdit, CategoryCreate }
};
</script>

<style scoped></style>
