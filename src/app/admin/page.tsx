"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useAdminContent } from '@/hooks/useAdminContent';
import { useState } from 'react';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { getPageData, updatePageData, togglePageVisibility } = useAdminContent();
  const [activeSection, setActiveSection] = useState('main');

  const sections = [
    { id: 'main', title: 'Главная страница' },
    { id: 'specialization', title: 'Специализация' },
    { id: 'services', title: 'Услуги' },
    { id: 'objects', title: 'Объекты' },
    { id: 'news', title: 'Новости' },
    { id: 'team', title: 'Команда' },
    { id: 'aboutCompany', title: 'О компании' },
    { id: 'partners', title: 'Партнеры' },
    { id: 'certificates', title: 'Сертификаты' },
    { id: 'vacancies', title: 'Вакансии' },
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-bold text-gray-900">Админ панель</h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {user?.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Выйти
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <nav className="space-y-2">
                {sections.map((section) => {
                  const pageData = getPageData(section.id);
                  const isVisible = pageData?.visible !== false;
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{section.title}</span>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`w-3 h-3 rounded-full ${
                              isVisible ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              togglePageVisibility(section.id);
                            }}
                            className="text-xs px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
                          >
                            {isVisible ? 'Скрыть' : 'Показать'}
                          </button>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-6">
                  {sections.find(s => s.id === activeSection)?.title}
                </h2>
                
                <ContentEditor 
                  section={activeSection} 
                  pageData={getPageData(activeSection)}
                  updatePageData={updatePageData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

interface ContentEditorProps {
  section: string;
  pageData: any;
  updatePageData: (page: string, key: string, value: any) => void;
}

function ContentEditor({ section, pageData, updatePageData }: ContentEditorProps) {
  if (!pageData) {
    return <div>Загрузка...</div>;
  }

  const handleInputChange = (key: string, value: any) => {
    updatePageData(section, key, value);
  };

  const renderField = (key: string, value: any, label: string, type: string = 'text') => {
    if (typeof value === 'string') {
      return (
        <div key={key} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
          {type === 'textarea' ? (
            <textarea
              value={value}
              onChange={(e) => handleInputChange(key, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          ) : (
            <input
              type={type}
              value={value}
              onChange={(e) => handleInputChange(key, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {Object.entries(pageData).map(([key, value]) => {
        if (key === 'page' || key === 'visible') return null;
        
        const label = key.charAt(0).toUpperCase() + key.slice(1);
        
        if (typeof value === 'string') {
          return renderField(key, value, label, value.length > 100 ? 'textarea' : 'text');
        }
        
        return (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {label} (объект)
            </label>
            <div className="text-sm text-gray-500">
              {JSON.stringify(value, null, 2)}
            </div>
          </div>
        );
      })}
    </div>
  );
}