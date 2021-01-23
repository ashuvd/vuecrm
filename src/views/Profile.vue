<template>
  <div>
    <div class="page-title">
      <h3>{{'ProfileTitle' | fLocalize}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{
            invalid: $v.name.$dirty && !$v.name.required
          }"
        />
        <label for="description">{{'Name' | fLocalize}}</label>
        <span
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
        >
          {{'EnterName' | fLocalize}}
        </span>
      </div>

      <div class="switch">
        <label>
          English
          <input v-model="isRuLocale" type="checkbox" />
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'Update' | fLocalize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {required} from "vuelidate/lib/validators";
export default {
  name: 'Profile',
  metaInfo() {
    return {
      title: this.$title('ProfileTitle')
    }
  },
  data: () => ({
    name: '',
    isRuLocale: true
  }),
  mounted() {
    this.name = this.info.name;
    this.isRuLocale = this.info.locale === 'ru-RU';
    setImmediate(() => {
      // eslint-disable-next-line no-undef
      M.updateTextFields();
    })
  },
  validations: {
    name: { required }
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        await this.$store.dispatch('updateInfo', {
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
      } catch (e) {}
    }
  }
};
</script>

<style lang="scss" scoped>
  .switch{
    margin-bottom: 2rem;
  }
</style>
