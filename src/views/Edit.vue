<template>
  <div>
    <div class="btn-group" role="group">
      <button type="button" class="btn btn-outline-warning" @click="back()">
        Back
      </button>
      <h1>Edit</h1>
      <button type="button" class="btn btn-outline-warning" @click="update()">
        save
      </button>
    </div>

    <br />

    <input
      type="text"
      id="postTitle"
      v-model="title"
      :placeholder="post.slice(0, 15) + '...'"
    />
    <textarea v-model="msg" :placeholder="post" id="postMsg"></textarea>
  </div>
</template>

<script>
import { updatePost } from "../firebase";

export default {
  name: "edit",
  data() {
    return {
      post: this.$route.params.post,
      title: "",
      msg: ""
    };
  },
  created() {
    console.log("updating post " + this.post);
  },
  methods: {
    back() {
      this.$router.push("/account");
    },
    update() {
      updatePost(this.title, this.msg);
      alert("updated!");
      this.$router.push("/account");
    },
  },
};
</script>

<style scoped>
input,
textarea {
  width: 100%;
  text-align: center;
}
</style>