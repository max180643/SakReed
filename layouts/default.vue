<template>
  <div>
    <div>
      <b-navbar variant="light" type="light" toggleable="sm">
        <b-navbar-brand>
          <img
            src="/icon-small.png"
            width="30"
            height="30"
            class="d-inline-block align-top"
            alt="SakReed Logo"
          />
          ซักรีด
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" class="" is-nav>
          <b-navbar-nav>
            <nuxt-link to="/" class="nav-link"
              ><font-awesome-icon :icon="['fas', 'home']" /> หน้าหลัก</nuxt-link
            >
            <nuxt-link to="/add" class="nav-link"
              ><font-awesome-icon :icon="['fas', 'tshirt']" /> ส่งผ้า</nuxt-link
            >
            <nuxt-link to="/history" class="nav-link"
              ><font-awesome-icon :icon="['fas', 'history']" />
              ประวัติ</nuxt-link
            >
            <nuxt-link to="/settings" class="nav-link"
              ><font-awesome-icon :icon="['fas', 'cog']" /> ตั้งค่า</nuxt-link
            >
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <!-- content -->
    <nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style>
.round {
  border-radius: 0.25rem;
}

.icon {
  font-size: 3.5rem;
}

.small-placeholder {
  font-size: 1rem !important;
  vertical-align: middle;
  line-height: 2.4;
  padding-top: 0.5rem;
}

html,
body {
  height: 105vh;
}
</style>
