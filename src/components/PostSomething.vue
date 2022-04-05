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
        <input type="text" disabled v-model="newPost.author" :placeholder=this.$user.toString() />
        <!-- <i>{{ this.$user }}</i> -->
        <i>{{ newPost.postedOn }}</i>
        <button
          v-if="this.$user"
          class="btn btn-outline-warning"
          type="button"
          @click="addNewPost()"
        >
          Post
        </button>
        <button
          v-else
          class="btn btn-outline-danger"
          type="button"
          @click="addNewPost()"
        >
          log in to post
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
        <button
          v-if="post.merchant"
          type="button"
          class="btn btn-outline-warning"
          @click="findDeals(post)"
        >
          {{ post.merchant }}
        </button>
      </p>

      <p>{{ post.postMsg }}</p>
      <i>by {{ post.author }} on {{ post.postedOn }} </i> <br />

      <hr />
    </div>
  </div>
</template>

<script>
import postsData from "../data/Posts.json";
import { createPost } from "../firebase";
import { getCurrentLoggedInUser } from "../auth-me.js";
// import * as authentication from "../auth-me.js";

var date = new Date();

export default {
  name: "PostSomething",
  components: {},
  data() {
    return {
      merchant: this.$route.params.merchant,
      // author: this.$user,
      newPost: {
        author: this.$user,
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
  created: function () {
    // this.authenticated = authentication.loggedIn();
    this.$user = getCurrentLoggedInUser();
    if (!this.$user) {
      // alert("please log in to see the feed");
      // this.$router.push("/");
    }
      console.log("$user:" + this.$user)
    console.log("$user.toString(): "+ this.$user.toString());
  },
  methods: {
    addNewPost() {
      //check if not logged in
      if (!this.$user) {
        alert("please log in to post in feed");
      } else {
        //logged in
        //validate input
        if (this.newPost.postTitle == "") {
          alert("Post title cannot be empty");
        } else if (this.newPost.postMsg == "") {
          alert("post cannot be empty");
        } else {
          // local json db
          this.posts.push({ ...this.newPost });
          console.log(this.posts);
          //reset the form
          this.newPost.postTitle = "";
          this.newPost.postMsg = "";
          //firestore db
          createPost(this.posts);
        }
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
h2 {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.badge {
  padding: 10px;
  color: black;
  border: 1px solid yellow;
  width: 50%;
  overflow: hidden;
}
</style>