import React from 'react'
import { LayoutPanelTop, ChevronLeft, ChevronRight } from 'lucide-react'
import { TaskList } from './components/TaskList'
import { AddTask } from './components/AddTask'
import { DashboardOverview } from './components/DashboardOverview'
import { Snackbar } from './components/Snackbar'

export function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <LayoutPanelTop className="w-6 h-6 text-indigo-600" />
            <h1 className="text-xl font-bold text-gray-900">Six Things</h1>
          </div>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </h2>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <DashboardOverview />
        <AddTask />
        <TaskList />
      </main>
      <Snackbar />
    </div>
  )
}