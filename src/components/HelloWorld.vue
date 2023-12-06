<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useTodo } from '@/composition/useTodo';
defineProps<{ msg: string }>();
const currentField = ref<string | null>(null);
const { state, actions } = useTodo();
const newTitle = ref('');

const focusOnInput = async (id: string) => {
  await nextTick();

  const inputElement = document.getElementById(id);
  if (inputElement) {
    inputElement.focus();
  }
};

const selectField = async (id: string) => {
  currentField.value = id;
  await focusOnInput(id);
};

const create = (title: string) => {
  const res = actions.create(title);
  state.items.push(res);
  newTitle.value = '';
};

const eventHandlers = async (e: KeyboardEvent, index: number) => {
  if (e.key === 'Enter') {
    const res = actions.create('');
    state.items.splice(index + 1, 0, res);
    currentField.value = res.id;
    await focusOnInput(res.id);
  }
};
</script>

<template>
  <h1>{{ msg }}</h1>

  <button @click="create('123')">Add</button>
  <div>
    {{ currentField }}
  </div>
  <hr />
  <div>
    <div v-for="(todo, index) in state.items" :key="todo.id" @click="selectField(todo.id)">
      <div v-if="currentField === todo.id">
        <input
          :id="todo.id"
          v-model="todo.title"
          type="text"
          @keydown="(e) => eventHandlers(e, index)"
        />
      </div>
      <div v-else>{{ todo.title }}</div>
    </div>
    <div>
      <input
        v-if="!state.items.length || !currentField"
        v-model="newTitle"
        type="text"
        @keydown="(e) => e.key === 'Enter' && create(newTitle)"
      />
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
