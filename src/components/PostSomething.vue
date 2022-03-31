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
        <i>{{ newPost.postedOn }}</i>
        <button
          class="btn btn-outline-warning"
          type="button"
          @click="addNewPost()"
        >
          Post
        </button>
      </span>

      <span
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <input type="text" v-model="newPost.postTitle" placeholder="Title" />
        <i> {{ merchant }}</i>
      </span>

      <textarea
        class="md-textarea form-control"
        rows="3"
        v-model="newPost.postMsg"
        placeholder="What would you like to share?"
      />
    </div>

    <br /><br /><br />

    <div class="card" v-for="post in posts" :key="post.id">
      <h2 class="card-title">{{ post.postTitle }}</h2>
      <p class="card-text">
      <button v-if="post.merchant" type="button" class="btn btn-outline-warning" @click="findDeals(post)">{{post.merchant}}</button>
      <p>{{ post.postMsg }}</p>
      <i>by {{ post.author }} on {{ post.postedOn }} </i> <br>

      <hr />
    </div>
  </div>
</template>

<script>
import postsData from "../data/Posts.json";

var date = new Date();

export default {
  name: "PostSomething",
  components: {},
  data() {
    return {
      merchant: this.$route.params.merchant,
      newPost: {
        author: "",
        postTitle: "",
        postMsg: "",
        postedOn:
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear(),
          merchant: this.$route.params.merchant,
      },
      posts: postsData,
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
        this.posts.push({ ...this.newPost });
        console.log(this.posts);
        this.newPost.author = "";
        this.newPost.postTitle = "";
        this.newPost.postMsg = "";
      }
    },
    findDeals(post) {
      console.log("find deals in " + post.merchant);
      this.$router.push({
        path: "/compare/" + post.merchant,
      });
    },
  },
};
</script>

<style scoped>
h2{
  display:flex;
  align-items: center;
  justify-content: space-around;
}
.badge{
  padding:10px;
  color:black;
  border: 1px solid yellow;
  width:50%;
  overflow:hidden;
}
</style>