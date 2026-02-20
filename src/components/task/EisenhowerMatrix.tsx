'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Check } from 'lucide-react';
import { useTaskStore } from '@/store/taskStore';

const quadrants = [
  {
    id: 'q1',
    title: 'Penting & Mendesak',
    subtitle: 'Kerjakan Sekarang',
    importance: true,
    urgency: true,
    color: 'from-red-500/20 to-red-600/20',
    borderColor: 'border-red-500',
    bgColor: 'bg-red-500/10',
  },
  {
    id: 'q2',
    title: 'Penting & Tidak Mendesak',
    subtitle: 'Jadwalkan',
    importance: true,
    urgency: false,
    color: 'from-blue-500/20 to-blue-600/20',
    borderColor: 'border-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    id: 'q3',
    title: 'Tidak Penting & Mendesak',
    subtitle: 'Delegasi',
    importance: false,
    urgency: true,
    color: 'from-orange-500/20 to-orange-600/20',
    borderColor: 'border-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    id: 'q4',
    title: 'Tidak Penting & Tidak Mendesak',
    subtitle: 'Hapus',
    importance: false,
    urgency: false,
    color: 'from-gray-500/20 to-gray-600/20',
    borderColor: 'border-gray-500',
    bgColor: 'bg-gray-500/10',
  },
];

export default function EisenhowerMatrix() {
  const { tasks, addTask, deleteTask, toggleTask } = useTaskStore();
  const [newTaskTitles, setNewTaskTitles] = useState<Record<string, string>>({});

  const handleAddTask = (quadrantId: string, importance: boolean, urgency: boolean) => {
    const title = newTaskTitles[quadrantId]?.trim() || '';
    if (title) {
      addTask({
        title,
        isCompleted: false,
        importance,
        urgency,
      });
      setNewTaskTitles({ ...newTaskTitles, [quadrantId]: '' });
    }
  };

  const getTasksForQuadrant = (importance: boolean, urgency: boolean) => {
    return tasks.filter(
      (task) => task.importance === importance && task.urgency === urgency
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {quadrants.map((q, idx) => {
        const quadrantTasks = getTasksForQuadrant(q.importance, q.urgency);

        return (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-4 rounded-xl border-2 ${q.borderColor} bg-gradient-to-br ${q.color} max-h-80 flex flex-col`}
          >
            <div className="mb-3">
              <h3 className="font-bold text-sm">{q.title}</h3>
              <p className="text-xs text-gray-400">{q.subtitle}</p>
            </div>

            {/* Task List */}
            <div className="flex-1 space-y-1.5 mb-3 overflow-y-auto min-h-0">
              <AnimatePresence>
                {quadrantTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className={`flex items-center gap-2 p-2 rounded-lg ${q.bgColor} border border-current border-opacity-30 group text-xs`}
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleTask(task.id)}
                      className={`flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition ${task.isCompleted
                        ? 'bg-green-500 border-green-500'
                        : 'border-current border-opacity-50'
                        }`}
                    >
                      {task.isCompleted && <Check size={12} />}
                    </motion.button>
                    <span
                      className={`flex-1 text-xs truncate transition ${task.isCompleted
                        ? 'line-through text-gray-500'
                        : 'text-gray-200'
                        }`}
                    >
                      {task.title}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteTask(task.id)}
                      className="flex-shrink-0 p-0.5 opacity-0 group-hover:opacity-100 text-red-400 hover:bg-red-500/20 rounded transition"
                    >
                      <Trash2 size={12} />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Add Task Input */}
            <div className="space-y-1.5 pt-2 border-t border-current border-opacity-20 mt-auto">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Tambah tugas..."
                  value={newTaskTitles[q.id] || ''}
                  onChange={(e) =>
                    setNewTaskTitles({
                      ...newTaskTitles,
                      [q.id]: e.target.value,
                    })
                  }
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddTask(q.id, q.importance, q.urgency);
                    }
                  }}
                  className="flex-1 px-3 py-1.5 text-xs bg-slate-800/80 text-white border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner placeholder-slate-500 dark:placeholder-gray-500"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAddTask(q.id, q.importance, q.urgency)}
                  className="px-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors flex items-center justify-center shadow-md"
                  disabled={!newTaskTitles[q.id]?.trim()}
                >
                  <Plus size={16} className={!newTaskTitles[q.id]?.trim() ? 'opacity-50' : 'text-white'} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
