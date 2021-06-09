import Vue from "vue";
import Router from "vue-router";
import ToDo from "@/components/ToDo";
import Home from "@/components/Home";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/todos",
      name: "ToDo",
      component: ToDo
    }
  ]
});
