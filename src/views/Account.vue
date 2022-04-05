<template>
  <div>
    <header class="navbar navbar-light bg-warning">
      <img
        src="../assets/Account.png"
        alt="Account"
        style="width: 40%; height: auto"
      />
    </header>
    <hr />

    <!-- ACCORDION -->
    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-1 variant="outline-secondary"
            >About</b-button
          >
        </b-card-header>
        <b-collapse
          id="accordion-1"
          visible
          accordion="my-accordion"
          role="tabpanel"
        >
          <b-card-body>
            <b-card-text><b>FIND THE BEST DEAL EVER</b></b-card-text>
            <b-card-text
              >Compare prices across Food Delivery Services</b-card-text
            >
            <img
              src="../assets/foodpanda.png"
              alt="food panda"
              style="width: 20%; height: auto"
            />
            <img
              src="../assets/grabfood.png"
              alt="grab food"
              style="width: 20%; height: auto"
            />
            <img
              src="../assets/airasia.png"
              alt="air asia eats"
              style="width: 20%; height: auto"
            />
          </b-card-body>
          <b-card-body>
            <b-card-text>This app was developed as part of an academic assessment</b-card-text>
            <b-card-text>
              A Final Year Project (FYP) is a project or academic task that must
              be accomplished individually by every undergraduate student to
              obtain the attributions to graduate. Its aim is to demonstrate the
              skills and knowledge students have acquired in their studies.
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-3 variant="outline-secondary"
            >Feedback</b-button
          >
        </b-card-header>
        <b-collapse
          id="accordion-3"
          visible
          accordion="my-accordion"
          role="tabpanel"
        >
          <b-card-body>
            <b-card-text></b-card-text>
            <b-card-text
              ><a
                href="https://forms.gle/CEFk9a4s8YtW9qoj6"
                alt="user acceptance form"
                target="blank"
                >Fill up a survey for me :)</a
              ></b-card-text
            >
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-4 variant="outline-secondary"
            >Manage my posts</b-button
          >
        </b-card-header>
        <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text v-for="(post,idx) in posts" :key="`${idx}-ax`">
              <h2 class="card-title">{{ post.postTitle }}</h2>
              <button
                v-if="post.merchant"
                type="button"
                class="btn btn-outline-warning"
                @click="findDeals(post)"
              >
                {{ post.merchant }}
              </button>
              <button
                type="button"
                class="btn btn-outline-warning"
                @click="Update(idx)"
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-outline-warning"
                @click="Delete(post)"
              >
                Delete
              </button>
              <p>{{ post.postMsg }}</p>
              <i>by {{ post.author }} on {{ post.postedOn }} </i> <br />
              <hr />
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-5 variant="outline-secondary"
            >Login / Logout</b-button
          >
        </b-card-header>
        <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              <button
                type="button"
                class="btn btn-outline-success"
                @click="login()"
              >
                Login
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="logout()"
              >
                Logout
              </button>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
import * as authentication from "../auth-me.js";
import postsData from "../data/Posts.json";
import { deletePost } from "../firebase"
export default {
  name: "Account",
  data() {
    return {
      posts: postsData,
    };
  },
  methods: {
    logout() {
      authentication
        .logout()
        .then(() => alert("signed out succesfully"))
        .catch((error) => alert("sign out failed" + error));
      console.log(authentication.logout);
    },
    login() {
      authentication
        .tryToAuth()
        .then(() => alert("signed in succesfully"))
        .catch((error) => alert("signed in failed" + error));
      console.log(authentication.loggedIn);
    },
    findDeals(post) {
      console.log("find deals in " + post.merchant);
      this.$router.push({
        path: "/compare/" + post.merchant,
      });
    },
    Update(post){
      console.log(post)
      this.$router.push('/edit/' + post)
    },
    Delete(post) {
      deletePost(post)
    },
  },
};
</script>

<style scoped>
/* override the global styling header shadow */
header {
  box-shadow: none;
}
a {
  text-decoration: none;
  color: orange;
}
</style>