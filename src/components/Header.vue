<template>
  <header>
    <h1>AppName</h1>
    <div>
      <input type="text" placeholder="search" />
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
header {
  background-color: darkorange;
  padding: 10px;
  box-shadow: -1px -5px 5px black;
}
input,
button {
  border: 0;
  background-color: white;
}
div {
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  padding: 5px;
  background-color: white;
  border-radius: 10px;
}
</style>