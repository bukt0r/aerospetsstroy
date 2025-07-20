"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useAdminContent } from '@/hooks/useAdminContent';
import { useFirestoreContent } from '@/hooks/useFirestoreContent';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { getPageData, updatePageData, togglePageVisibility } = useAdminContent();
  const { mainPageData, specializationData, updateMainPageData, updateSpecializationData } = useFirestoreContent();
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
                <Link
                  href="/"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  На сайт
                </Link>
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
                  const pageData = section.id === 'main' ? mainPageData :
                                 section.id === 'specialization' ? specializationData :
                                 getPageData(section.id);
                  const isVisible = section.id === 'main' ? true :
                                  section.id === 'specialization' ? specializationData?.visible :
                                  (pageData as any)?.visible !== false;
                  const showVisibilityToggle = section.id !== 'main'; // Don't show toggle for main page

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
                            {showVisibilityToggle ? (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (section.id === 'specialization') {
                                    updateSpecializationData('visible', !isVisible);
                                  } else {
                                    togglePageVisibility(section.id);
                                  }
                                }}
                                className="text-xs px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
                              >
                                {isVisible ? 'Скрыть' : 'Показать'}
                              </button>
                            ) : (
                              <span className="text-xs text-gray-500"></span>
                            )}
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

                                {activeSection === 'main' && !mainPageData ? (
                  <div>Загрузка данных главной страницы...</div>
                ) : activeSection === 'specialization' && !specializationData ? (
                  <div>Загрузка данных специализации...</div>
                ) : (
                  <ContentEditor
                    section={activeSection}
                    pageData={activeSection === 'main' ? mainPageData :
                             activeSection === 'specialization' ? specializationData :
                             getPageData(activeSection)}
                    updatePageData={activeSection === 'main' ? updateMainPageData :
                                  activeSection === 'specialization' ? updateSpecializationData :
                                  updatePageData}
                  />
                )}
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
  updatePageData: ((page: string, key: string, value: any) => void) | ((field: string, value: string) => Promise<void>);
}

function ContentEditor({ section, pageData, updatePageData }: ContentEditorProps) {
  const [formData, setFormData] = useState(pageData);
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  // Update form data when pageData changes
  useEffect(() => {
    setFormData(pageData);
    setIsDirty(false);
  }, [pageData]);

  if (!pageData) {
    return <div>Загрузка...</div>;
  }

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (section === 'main') {
        await (updatePageData as (field: string, value: string) => Promise<void>)('batch', formData);
      } else if (section === 'specialization') {
        await (updatePageData as (field: string, value: any) => Promise<void>)('batch', formData);
      } else {
        // For other sections, update each field individually
        for (const [key, value] of Object.entries(formData)) {
          if (key !== 'page' && key !== 'visible') {
            (updatePageData as (page: string, key: string, value: any) => void)(section, key, value);
          }
        }
      }
      setIsDirty(false);
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      setSaving(false);
    }
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
      {Object.entries(formData).map(([key, value]) => {
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

      {/* Save Button */}
      <div className="pt-6 border-t border-gray-200">
        <button
          onClick={handleSave}
          disabled={!isDirty || saving}
          className={`px-6 py-2 rounded-md font-medium ${
            isDirty && !saving
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {saving ? 'Сохранение...' : 'Сохранить'}
        </button>
        {isDirty && (
          <span className="ml-3 text-sm text-gray-500">
            Есть несохраненные изменения
          </span>
        )}
      </div>
    </div>
  );
}
