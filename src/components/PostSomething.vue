<template>
  <div>
    <span style="display:flex; justify-content:space-between;">
      <input type="text" v-model="newPost.author" placeholder="author" />
      <input disabled v-model="newPost.postedOn"/>
      <button class="btn btn-outline-warning" type="button" @click="addNewPost()">Post</button>
    </span>
    <textarea class="md-textarea form-control" rows="3" v-model="newPost.postMsg" placeholder="Post Something"></textarea>
    <div v-for="post in posts" :key="post.id">
        <b>{{post.author}}</b> on {{post.postedOn}} <br>
        {{post.postMsg}}
        <hr>
    </div>
  </div>
</template>

<script>
var date = new Date();

export default {
  data() {
    return {
        newPost: {
            author: null,
            postedOn: date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
            postMsg: null,
        },
      posts: [
          {
              "author": "yuuchin",
              "postMsg": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe odit velit amet et quo commodi atque iste veniam ipsam quidem?",
              "postedOn": "03/03/2022"
          },
           {
              "author": "yuuchin",
              "postMsg": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui numquam necessitatibus cupiditate nostrum vero? Tempora porro tenetur ex dolores quasi veniam, voluptas voluptate iste dolor illum, expedita quidem accusamus explicabo?",
              "postedOn": "04/03/2022"
          }
        ],
    };
  },
  methods: {
      addNewPost(){
          if (this.newPost.author=="") {
              alert("pelase enter your alias");
          } else if ( this.newPost.postMsg=="") {
              alert("post cannot be empty");
          } else {
                this.posts.push({...this.newPost});
              console.log(this.posts);
          }
      }
  },
};
</script>

<style>
</style>