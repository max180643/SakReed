<template>
  <div class="loading">
    <h1 class="text-light">
      <b-spinner style="width: 3rem; height: 3rem;" class="mr-1"></b-spinner>
    </h1>
  </div>
</template>

<style scoped>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(90vh - 56px);
}
</style>
