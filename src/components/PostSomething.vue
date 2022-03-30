<template>
  <div>
    <div class="card">
      <span
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <input type="text" v-model="newPost.author" placeholder="author" />
        <div>{{ newPost.postedOn }}</div>
        <button
          class="btn btn-outline-warning"
          type="button"
          @click="addNewPost()"
        >
          Post
        </button>
      </span>
      <input type="text" v-model="newPost.postTitle" placeholder="Title" />
      <textarea
        class="md-textarea form-control"
        rows="3"
        v-model="newPost.postMsg"
        placeholder="What would you like to share?"
      />
    </div>


    <div class="card" v-for="post in posts" :key="post.id">
      <h2 class="card-title">{{ post.postTitle }}</h2>
      <p class="card-text">
        {{ post.author }} on {{ post.postedOn }} <br />
        {{ post.postMsg }}
      </p>
      <hr />
    </div>
  </div>
</template>

<script>
import postsData from "../data/Posts.json"
// const fs = require('fs');

var date = new Date();

export default {
  name: "PostSomething",
  components: {
  },
  data() {
    return {
      newPost: {
        author: "",
        postTitle: "",
        postMsg: "",
        postedOn: date.getDate() +"/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
      },
      posts: postsData,
    // posts: fs.readFileSync('../data/Posts.json'),
    // object: JSON.parse(this.posts),
    };
  },
  methods: {
    addNewPost() {
      if (this.newPost.author == "") {
        alert("please enter your alias");
      } else if (this.newPost.postTitle == "") {
        alert("Post title cannot be empty");
      } else if (this.newPost.postMsg == "") {
        alert("post cannot be empty");
      } else {
        // this.object.push({ ...this.newPost });
        // console.log(this.object);
        this.posts.push({ ...this.newPost });
        console.log(this.posts);
        this.newPost.author == "";
        this.newPost.postTitle == "";
        this.newPost.postMsg == "";
      }
    },
  },
};
</script>

<style scoped>

</style>