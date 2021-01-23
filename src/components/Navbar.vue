<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('click')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{date | fDate('datetime')}}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "Navbar",
    data: () => ({
      date: new Date(),
      interval: null,
      dropdown: null
    }),
    computed: {
      name() {
        return this.$store.getters.info.name;
      }
    },
    mounted() {
      this.interval = setInterval(() => {
        this.date = new Date();
      }, 1000)
      const elem = this.$refs['dropdown'];
      // eslint-disable-next-line no-undef
      this.dropdown = M.Dropdown.init(elem, {
        constrainWidth: true
      });
    },
    beforeDestroy() {
      clearInterval(this.interval);
      // Если мы быстро откроем страницу и слишком быстро закроем, то не успеет инитциализироваться M, делаем проверку
      if (this.dropdown && this.dropdown.destroy) {
        this.dropdown.destroy();
      }
    },
    methods: {
      async logout() {
        await this.$store.dispatch('logout');
        await this.$router.push('/login?message=logout')
      }
    }
  }
</script>

<style scoped>

</style>
