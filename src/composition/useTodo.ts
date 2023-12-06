import { reactive } from 'vue';
import { Helper } from '@/plugins/helpers';
interface TODO {
  id: string;
  title: string;
  description: string;
}

interface StateTodo {
  items: TODO[];
}

export const useTodo = () => {
  const state: StateTodo = reactive({
    items: [],
  });

  const actions = {
    create(title: string) {
      const todo = {
        id: Helper.generateId(),
        title: title,
        description: '',
      };
      return todo;
    },
    remove(id: string) {
      state.items = state.items.filter((item) => item.id !== id);
    },
    update(id: string, todo: TODO) {
      const index = state.items.findIndex((item) => item.id === id);
      state.items[index] = todo;
    },
  };

  return {
    state,
    actions,
  };
};
