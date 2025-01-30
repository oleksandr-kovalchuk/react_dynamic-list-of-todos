/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(todos => setAllTodos(todos))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    return allTodos.filter(todo => {
      if (filter === 'active' && todo.completed) {
        return false;
      }

      if (filter === 'completed' && !todo.completed) {
        return false;
      }

      return todo.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [filter, allTodos, searchQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                currentFilter={filter}
                setFilter={setFilter}
                query={searchQuery}
                setQuery={setSearchQuery}
              />
            </div>

            {isLoading ? <Loader /> : <TodoList todos={filteredTodos} />}
          </div>
        </div>
      </div>
    </>
  );
};
