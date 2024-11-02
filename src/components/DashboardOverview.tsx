import React from 'react'
import { Target, Zap, TrendingUp } from 'lucide-react'
import { useTaskStore } from '../store/taskStore'

export function DashboardOverview() {
  const { tasks } = useTaskStore()
  const completedTasks = tasks.filter(task => task.completed)
  const mainTask = tasks[0]
  const totalPoints = tasks.length * 6
  const earnedPoints = completedTasks.length * 6
  const todayProgress = tasks.length ? (completedTasks.length / tasks.length) * 100 : 0
  const weekProgress = tasks.length ? (completedTasks.length / (tasks.length * 7)) * 100 : 0

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-indigo-50">
              <Target className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Main Priority</h3>
              <p className="text-gray-900 font-medium mt-1">{mainTask?.title || 'No task set'}</p>
              {mainTask?.completed && (
                <span className="inline-flex items-center gap-1 text-sm text-green-600 mt-1">
                  Completed
                </span>
              )}
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-purple-50">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Points Today</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {earnedPoints}<span className="text-sm font-normal text-gray-500 ml-1">/ {totalPoints}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg text-yellow-600 bg-yellow-50">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Today's Progress</h3>
              <p className="text-2xl font-bold mt-1 text-yellow-600">{todayProgress.toFixed(0)}%</p>
              <p className="text-sm text-gray-500">{completedTasks.length} of {tasks.length} tasks completed</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg text-red-600 bg-red-50">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Week's Progress</h3>
              <p className="text-2xl font-bold mt-1 text-red-600">{weekProgress.toFixed(0)}%</p>
              <p className="text-sm text-gray-500">{completedTasks.length} of {tasks.length * 7} tasks completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}