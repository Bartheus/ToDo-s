<template lang="html">
  <v-card max-width="300px" align="center" class="todo-card mx-auto rounded-xl">
    <form @submit="addTodo($event)" align="center">
      <v-text-field
        type="text"
        placeholder="+"
        v-model="newTodo"
        class="todo-input"
        color="blue"
        required
      />
      <v-btn type="submit" color="blue" outlined class="mb-5">Add Todo</v-btn>
      <v-text-field
        v-show="show === true"
        color="info"
        loading
        disabled
        class="py-0 my-0"
      ></v-text-field>
    </form>
    <ul class="todo-list">
      <li
        v-for="todo in todos"
        :key="todo._id"
        class="blue--text text--darken-2 font-weight-bold"
      >
        <v-row align="center">
          <v-checkbox color="success" />
          {{ todo.title }}
          <v-icon color="red" @click="deleteTodo(todo._id)" class="ml-5"
            >mdi-trash-can-outline</v-icon
          >
        </v-row>
      </li>
    </ul>
  </v-card>
</template>

<script>
import ToDoAPI from "@/services/ToDoAPI.js";
export default {
  data() {
    return {
      newTodo: "",
      todos: [],
      show: false
    };
  },
  mounted() {
    this.loadTodos();
  },
  methods: {
    async addTodo(evt) {
      evt.preventDefault(); // prevents the form's default action from redirecting the page
      const response = await ToDoAPI.addTodo(this.newTodo);
      setTimeout(() => this.todos.push(response.data), 1200);
      this.newTodo = ""; // clear the input field
      this.show = true;
      setTimeout(() => (this.show = false), 1100);
    },
    async loadTodos() {
      const response = await ToDoAPI.getToDos();
      this.todos = response.data;
    },
    deleteTodo(todoID) {
      ToDoAPI.deleteTodo(todoID);
      // remove the array element with the matching id
      this.todos = this.todos.filter(function(obj) {
        return obj._id !== todoID;
      });
    }
  }
};
</script>

<style lang="css">
.todo-card {
  background-color: #e1f5fe;
  padding: 30px;
  opacity: 0.85;
}
.todo-input input {
  color: #0d47a1 !important;
}
.todo-list {
  list-style: none;
}
</style>
