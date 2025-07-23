"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAdminContent } from '@/hooks/useAdminContent';
import { useFirestoreContent } from '@/hooks/useFirestoreContent';
import AdminNav from '@/components/AdminNav';
import RichTextEditor from '@/components/RichTextEditor';
import ImageUploadAdvanced from '@/components/ImageUploadAdvanced';

// Type definitions for page data
interface PageData {
  visible?: boolean;
  title?: string;
  subtitle?: string;
  description?: string;
  [key: string]: unknown;
}

interface ObjectItem {
  title: string;
  description: string;
  address: string;
  adressUrl: string;
  image: string;
  images: string[];
}

interface PartnerItem {
  image: string[];
}

interface CertificateDocument {
  description: string;
  images: string[];
  pdf: string;
}

interface CertificatesDocuments {
  ordering: CertificateDocument[];
  license: CertificateDocument[];
  certificate: CertificateDocument[];
}

interface TeamMember {
  image: string[];
  name: string[];
}

interface VacancyItem {
  id: string;
  mainTitle: string;
  shortInfo: string;
  title1: string;
  description1: string;
  title2: string;
  description2: string;
  title3: string;
  description3: string;
}

interface NewsItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  image: string;
  url: string;
}

// Editor component props interfaces
interface ObjectsEditorProps {
  pageData: PageData & { objectsData: ObjectItem[] };
  updatePageData: (field: string, value: unknown) => Promise<void>;
}

interface PartnersEditorProps {
  pageData: PageData & { baners: PartnerItem[] };
  updatePageData: (field: string, value: unknown) => Promise<void>;
}

interface CertificatesEditorProps {
  pageData: PageData & { documents: CertificatesDocuments };
  updatePageData: (field: string, value: unknown) => Promise<void>;
}

interface NewsEditorProps {
  pageData: PageData & { newsData: NewsItem[] };
  updatePageData: (field: string, value: unknown) => Promise<void>;
}

interface TeamEditorProps {
  pageData: PageData & { members: TeamMember[] };
  updatePageData: (field: string, value: unknown) => Promise<void>;
}

interface VacanciesEditorProps {
  pageData: PageData & { vacancyData: VacancyItem[] };
  updatePageData: (field: string, value: unknown) => Promise<void>;
}

interface ServicesEditorProps {
  pageData: PageData;
  updatePageData: (field: string, value: unknown) => Promise<void>;
}

interface ContentEditorProps {
  pageData: PageData;
  updatePageData: (field: string, value: unknown) => Promise<void> | ((page: string, key: string, value: unknown) => void);
  section: string;
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { getPageData, updatePageData, togglePageVisibility } = useAdminContent();
  const { mainPageData, specializationData, servicesData, objectsData, aboutCompanyData, partnersData, certificatesData, newsData, teamData, vacanciesData, updateMainPageData, updateSpecializationData, updateServicesData, updateObjectsData, updateAboutCompanyData, updatePartnersData, updateCertificatesData, updateNewsData, updateTeamData, updateVacanciesData } = useFirestoreContent();
  const [activeSection, setActiveSection] = useState<string>('main');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Вход в админ панель
            </h2>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Пожалуйста, войдите в систему</p>
          </div>
        </div>
      </div>
    );
  }

  const sections = [
    { id: 'main', name: 'Главная страница' },
    { id: 'specialization', name: 'Специализация' },
    { id: 'services', name: 'Услуги' },
    { id: 'objects', name: 'Объекты' },
    { id: 'news', name: 'Новости' },
    { id: 'team', name: 'Команда' },
    { id: 'aboutCompany', name: 'О компании' },
    { id: 'partners', name: 'Партнеры' },
    { id: 'certificates', name: 'Сертификаты' },
    { id: 'vacancies', name: 'Вакансии' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Админ панель</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Пользователь: {user.email}</span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow rounded-lg p-6 mr-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Разделы</h2>
            <nav className="space-y-2">
              {sections.map((section) => {
                const pageData: PageData = 
                  section.id === 'main' ? (mainPageData as unknown as PageData) :
                  section.id === 'specialization' ? (specializationData as unknown as PageData) :
                  section.id === 'services' ? (servicesData as unknown as PageData) :
                  section.id === 'objects' ? (objectsData as unknown as PageData) :
                  section.id === 'aboutCompany' ? (aboutCompanyData as unknown as PageData) :
                  section.id === 'partners' ? (partnersData as unknown as PageData) :
                  section.id === 'certificates' ? (certificatesData as unknown as PageData) :
                  section.id === 'news' ? (newsData as unknown as PageData) :
                  section.id === 'team' ? (teamData as unknown as PageData) :
                  section.id === 'vacancies' ? (vacanciesData as unknown as PageData) :
                  (getPageData(section.id) as PageData);
                const isVisible = section.id === 'main' ? true : 
                  section.id === 'specialization' ? specializationData?.visible :
                  section.id === 'services' ? servicesData?.visible :
                  section.id === 'objects' ? objectsData?.visible :
                  section.id === 'aboutCompany' ? aboutCompanyData?.visible :
                  section.id === 'partners' ? partnersData?.visible :
                  section.id === 'certificates' ? certificatesData?.visible :
                  section.id === 'news' ? newsData?.visible :
                  section.id === 'team' ? teamData?.visible :
                  section.id === 'vacancies' ? vacanciesData?.visible :
                  (pageData as PageData)?.visible !== false;
                const showVisibilityToggle = section.id !== 'main'; // Don't show toggle for main page

                return (
                  <div key={section.id} className="flex items-center justify-between">
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`flex-1 text-left px-3 py-2 rounded-md text-sm font-medium ${
                        activeSection === section.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {section.name}
                    </button>
                    {showVisibilityToggle && (
                      <button
                        onClick={() => {
                          if (section.id === 'specialization') {
                            updateSpecializationData('visible', !isVisible);
                          } else if (section.id === 'services') {
                            updateServicesData('visible', !isVisible);
                          } else if (section.id === 'objects') {
                            updateObjectsData('visible', !isVisible);
                          } else if (section.id === 'aboutCompany') {
                            updateAboutCompanyData('visible', !isVisible);
                          } else if (section.id === 'partners') {
                            updatePartnersData('visible', !isVisible);
                          } else if (section.id === 'certificates') {
                            updateCertificatesData('visible', !isVisible);
                          } else if (section.id === 'news') {
                            updateNewsData('visible', !isVisible);
                          } else if (section.id === 'team') {
                            updateTeamData('visible', !isVisible);
                          } else if (section.id === 'vacancies') {
                            updateVacanciesData('visible', !isVisible);
                          } else {
                            togglePageVisibility(section.id);
                          }
                        }}
                        className={`ml-2 px-2 py-1 text-xs rounded ${
                          isVisible
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {isVisible ? 'Вкл' : 'Выкл'}
                      </button>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white shadow rounded-lg p-6">
            {activeSection === 'main' && !mainPageData ? (
              <div>Загрузка данных главной страницы...</div>
            ) : activeSection === 'specialization' && !specializationData ? (
              <div>Загрузка данных специализации...</div>
            ) : activeSection === 'services' && !servicesData ? (
              <div>Загрузка данных услуг...</div>
            ) : activeSection === 'objects' && !objectsData ? (
              <div>Загрузка данных объектов...</div>
            ) : activeSection === 'aboutCompany' && !aboutCompanyData ? (
              <div>Загрузка данных о компании...</div>
            ) : activeSection === 'partners' && !partnersData ? (
              <div>Загрузка данных партнеров...</div>
            ) : activeSection === 'certificates' && !certificatesData ? (
              <div>Загрузка данных сертификатов...</div>
            ) : activeSection === 'news' && !newsData ? (
              <div>Загрузка данных новостей...</div>
            ) : activeSection === 'team' && !teamData ? (
              <div>Загрузка данных команды...</div>
            ) : activeSection === 'vacancies' && !vacanciesData ? (
              <div>Загрузка данных вакансий...</div>
            ) : activeSection === 'services' ? (
              <ServicesEditor 
                pageData={servicesData as unknown as PageData}
                updatePageData={updateServicesData}
              />
            ) : activeSection === 'objects' ? (
              <ObjectsEditor 
                pageData={objectsData as PageData & { objectsData: ObjectItem[] }}
                updatePageData={updateObjectsData}
              />
            ) : activeSection === 'partners' ? (
              <PartnersEditor 
                pageData={partnersData as PageData & { baners: PartnerItem[] }}
                updatePageData={updatePartnersData}
              />
            ) : activeSection === 'certificates' ? (
              <CertificatesEditor 
                pageData={certificatesData as PageData & { documents: CertificatesDocuments }}
                updatePageData={updateCertificatesData}
              />
            ) : activeSection === 'news' ? (
              <NewsEditor 
                pageData={newsData as PageData & { newsData: NewsItem[] }}
                updatePageData={updateNewsData}
              />
            ) : activeSection === 'team' ? (
              <TeamEditor 
                pageData={teamData as PageData & { members: TeamMember[] }}
                updatePageData={updateTeamData}
              />
            ) : activeSection === 'vacancies' ? (
              <VacanciesEditor 
                pageData={vacanciesData as PageData & { vacancyData: VacancyItem[] }}
                updatePageData={updateVacanciesData}
              />
            ) : (
              <ContentEditor 
                pageData={
                  activeSection === 'main' ? (mainPageData as PageData) :
                  activeSection === 'specialization' ? (specializationData as PageData) :
                  activeSection === 'services' ? (servicesData as PageData) :
                  activeSection === 'aboutCompany' ? (aboutCompanyData as PageData) :
                  activeSection === 'partners' ? (partnersData as PageData) :
                  activeSection === 'certificates' ? (certificatesData as PageData) :
                  activeSection === 'news' ? (newsData as PageData) :
                  activeSection === 'team' ? (teamData as PageData) :
                  activeSection === 'vacancies' ? (vacanciesData as PageData) :
                  (getPageData(activeSection) as PageData)
                }
                updatePageData={activeSection === 'main' ? updateMainPageData : 
                  activeSection === 'specialization' ? updateSpecializationData :
                  activeSection === 'services' ? updateServicesData :
                  activeSection === 'aboutCompany' ? updateAboutCompanyData :
                  activeSection === 'partners' ? updatePartnersData :
                  activeSection === 'certificates' ? updateCertificatesData :
                  activeSection === 'news' ? updateNewsData :
                  activeSection === 'team' ? updateTeamData :
                  activeSection === 'vacancies' ? updateVacanciesData :
                  updatePageData}
                section={activeSection}
              />
            )}
          </div>
        </div>
      </div>
      <AdminNav />
    </div>
  );
}

function ObjectsEditor({ pageData, updatePageData }: ObjectsEditorProps) {
  const [formData, setFormData] = useState(pageData);
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Update form data when pageData changes
  useEffect(() => {
    setFormData(pageData);
    setIsDirty(false);
  }, [pageData]);

  if (!pageData) {
    return <div>Загрузка...</div>;
  }

  const handleInputChange = (key: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handleObjectChange = (index: number, field: string, value: unknown) => {
    const newObjectsData = [...(formData.objectsData || [])];
    newObjectsData[index] = { ...newObjectsData[index], [field]: value };
    setFormData(prev => ({ ...prev, objectsData: newObjectsData }));
    setIsDirty(true);
  };

  const addObject = () => {
    const newObject = {
      title: "Новый объект",
      description: "Описание объекта",
      address: "Адрес объекта",
      adressUrl: "",
      image: "/objects/objects1-full.svg",
      images: []
    };
    const newObjectsData = [...(formData.objectsData || []), newObject];
    setFormData(prev => ({ ...prev, objectsData: newObjectsData }));
    setIsDirty(true);
  };

  const removeObject = (index: number) => {
    const newObjectsData = [...(formData.objectsData || [])];
    newObjectsData.splice(index, 1);
    setFormData(prev => ({ ...prev, objectsData: newObjectsData }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Update the entire objects data as a batch
      await updatePageData('batch', formData);
      setIsDirty(false);
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Заголовок раздела
        </label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Objects List */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Список объектов
          </label>
          <button
            onClick={addObject}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Добавить объект
          </button>
        </div>

        <div className="space-y-4">
          {(formData.objectsData || []).map((object: ObjectItem, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium">Объект {index + 1}</h4>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    {editingIndex === index ? 'Свернуть' : 'Редактировать'}
                  </button>
                  <button
                    onClick={() => removeObject(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Удалить
                  </button>
                </div>
              </div>

              {editingIndex === index && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Название
                    </label>
                    <input
                      type="text"
                      value={object.title || ''}
                      onChange={(e) => handleObjectChange(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Описание
                    </label>
                    <textarea
                      value={object.description || ''}
                      onChange={(e) => handleObjectChange(index, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Адрес
                    </label>
                    <input
                      type="text"
                      value={object.address || ''}
                      onChange={(e) => handleObjectChange(index, 'address', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL адреса (опционально)
                    </label>
                    <input
                      type="text"
                      value={object.adressUrl || ''}
                      onChange={(e) => handleObjectChange(index, 'adressUrl', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Главное изображение
                    </label>
                    <ImageUploadAdvanced
                      onUploadComplete={(urls) => handleObjectChange(index, 'image', urls[0])}
                      folder="objects/main"
                      label="Загрузить главное изображение"
                      multiple={false}
                      currentImages={object.image ? [object.image] : []}
                      onRemoveImage={() => handleObjectChange(index, 'image', '')}
                    />
                    {object.image && (
                      <div className="mt-2">
                        <img 
                          src={object.image} 
                          alt="Main object image" 
                          className="w-32 h-24 object-cover rounded border"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Дополнительные изображения
                    </label>
                    <ImageUploadAdvanced
                      onUploadComplete={(urls) => {
                        const currentImages = Array.isArray(object.images) ? object.images : [];
                        handleObjectChange(index, 'images', [...currentImages, ...urls]);
                      }}
                      folder="objects/gallery"
                      label="Загрузить дополнительные изображения"
                      multiple={true}
                      maxFiles={10}
                      currentImages={Array.isArray(object.images) ? object.images : []}
                      onRemoveImage={(urlToRemove) => {
                        const currentImages = Array.isArray(object.images) ? object.images : [];
                        handleObjectChange(index, 'images', currentImages.filter(url => url !== urlToRemove));
                      }}
                    />
                  </div>
                </div>
              )}

              {editingIndex !== index && (
                <div className="text-sm text-gray-600">
                  <p><strong>Название:</strong> {object.title}</p>
                  <p><strong>Адрес:</strong> {object.address}</p>
                  <p><strong>Описание:</strong> {object.description?.substring(0, 100)}...</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

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

function PartnersEditor({ pageData, updatePageData }: PartnersEditorProps) {
  const [formData, setFormData] = useState(pageData);
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Update form data when pageData changes
  useEffect(() => {
    setFormData(pageData);
    setIsDirty(false);
  }, [pageData]);

  if (!pageData) {
    return <div>Загрузка...</div>;
  }

  const handleInputChange = (key: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handlePartnerChange = (index: number, field: string, value: unknown) => {
    const newBanersData = [...(formData.baners || [])];
    newBanersData[index] = { ...newBanersData[index], [field]: value };
    setFormData(prev => ({ ...prev, baners: newBanersData }));
    setIsDirty(true);
  };

  const addPartner = () => {
    const newPartner = {
      image: ["/partners/new-partner.svg"]
    };
    const newBanersData = [...(formData.baners || []), newPartner];
    setFormData(prev => ({ ...prev, baners: newBanersData }));
    setIsDirty(true);
  };

  const removePartner = (index: number) => {
    const newBanersData = [...(formData.baners || [])];
    newBanersData.splice(index, 1);
    setFormData(prev => ({ ...prev, baners: newBanersData }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Update the entire partners data as a batch
      await updatePageData('batch', formData);
      setIsDirty(false);
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Заголовок раздела
        </label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Partners List */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Список партнеров
          </label>
          <button
            onClick={addPartner}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Добавить партнера
          </button>
        </div>

        <div className="space-y-4">
          {(formData.baners || []).map((partner: PartnerItem, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium">Партнер {index + 1}</h4>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    {editingIndex === index ? 'Свернуть' : 'Редактировать'}
                  </button>
                  <button
                    onClick={() => removePartner(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Удалить
                  </button>
                </div>
              </div>

              {editingIndex === index && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Изображение партнера
                    </label>
                    <input
                      type="text"
                      value={Array.isArray(partner.image) ? partner.image[0] || '' : partner.image || ''}
                      onChange={(e) => handlePartnerChange(index, 'image', [e.target.value])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="/partners/partner-logo.svg"
                    />
                  </div>
                </div>
              )}

              {editingIndex !== index && (
                <div className="text-sm text-gray-600">
                  <p><strong>Изображение:</strong> {Array.isArray(partner.image) ? partner.image[0] : partner.image}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

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

function CertificatesEditor({ pageData, updatePageData }: CertificatesEditorProps) {
  const [formData, setFormData] = useState(pageData);
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingSection, setEditingSection] = useState<string | null>(null);

  // Update form data when pageData changes
  useEffect(() => {
    setFormData(pageData);
    setIsDirty(false);
  }, [pageData]);

  if (!pageData) {
    return <div>Загрузка...</div>;
  }

  const handleInputChange = (key: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handleDocumentChange = (section: string, index: number, field: string, value: unknown) => {
    const newDocuments = { ...formData.documents };
    const sectionData = [...(newDocuments[section] || [])];
    sectionData[index] = { ...sectionData[index], [field]: value };
    newDocuments[section] = sectionData;
    setFormData(prev => ({ ...prev, documents: newDocuments }));
    setIsDirty(true);
  };

  const addDocument = (section: string) => {
    const newDocument = {
      description: "Описание документа",
      images: ["/certificates/new-document.png"],
      pdf: "/certificates/new-document.pdf"
    };
    const newDocuments = { ...formData.documents };
    const sectionData = [...(newDocuments[section] || []), newDocument];
    newDocuments[section] = sectionData;
    setFormData(prev => ({ ...prev, documents: newDocuments }));
    setIsDirty(true);
  };

  const removeDocument = (section: string, index: number) => {
    const newDocuments = { ...formData.documents };
    const sectionData = [...(newDocuments[section] || [])];
    sectionData.splice(index, 1);
    newDocuments[section] = sectionData;
    setFormData(prev => ({ ...prev, documents: newDocuments }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Update the entire certificates data as a batch
      await updatePageData('batch', formData);
      setIsDirty(false);
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      setSaving(false);
    }
  };

  const renderSection = (sectionName: string, sectionTitle: string) => {
    const documents = formData.documents?.[sectionName] || [];
    
    return (
      <div key={sectionName} className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">{sectionTitle}</h3>
          <button
            onClick={() => addDocument(sectionName)}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
          >
            Добавить документ
          </button>
        </div>

        <div className="space-y-4">
          {documents.map((document: CertificateDocument, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium">Документ {index + 1}</h4>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingIndex(editingIndex === index && editingSection === sectionName ? null : index);
                      setEditingSection(editingIndex === index && editingSection === sectionName ? null : sectionName);
                    }}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    {editingIndex === index && editingSection === sectionName ? 'Свернуть' : 'Редактировать'}
                  </button>
                  <button
                    onClick={() => removeDocument(sectionName, index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Удалить
                  </button>
                </div>
              </div>

              {editingIndex === index && editingSection === sectionName && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Описание
                    </label>
                    <textarea
                      value={document.description || ''}
                      onChange={(e) => handleDocumentChange(sectionName, index, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PDF файл
                    </label>
                    <input
                      type="text"
                      value={document.pdf || ''}
                      onChange={(e) => handleDocumentChange(sectionName, index, 'pdf', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="/certificates/document.pdf"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Изображения (через запятую)
                    </label>
                    <input
                      type="text"
                      value={Array.isArray(document.images) ? document.images.join(', ') : ''}
                      onChange={(e) => handleDocumentChange(sectionName, index, 'images', e.target.value.split(', ').filter(img => img.trim()))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="/certificates/image1.png, /certificates/image2.png"
                    />
                  </div>
                </div>
              )}

              {editingIndex !== index || editingSection !== sectionName ? (
                <div className="text-sm text-gray-600">
                  <p><strong>Описание:</strong> {document.description?.substring(0, 100)}...</p>
                  <p><strong>PDF:</strong> {document.pdf}</p>
                  <p><strong>Изображений:</strong> {Array.isArray(document.images) ? document.images.length : 0}</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Заголовок раздела
        </label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Documents Sections */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Документы по категориям
        </label>

        {renderSection('ordering', 'Выписки из реестра')}
        {renderSection('license', 'Лицензии')}
        {renderSection('certificate', 'Сертификаты')}
      </div>

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

function NewsEditor({ pageData, updatePageData }: NewsEditorProps) {
  const [formData, setFormData] = useState(pageData);
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Update form data when pageData changes
  useEffect(() => {
    setFormData(pageData);
    setIsDirty(false);
  }, [pageData]);

  if (!pageData) {
    return <div>Загрузка...</div>;
  }

  const handleInputChange = (key: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handleNewsChange = (index: number, field: string, value: unknown) => {
    const newNewsData = [...(formData.newsData || [])];
    newNewsData[index] = { ...newNewsData[index], [field]: value };
    setFormData(prev => ({ ...prev, newsData: newNewsData }));
    setIsDirty(true);
  };

  const addNews = () => {
    const newNewsItem = {
      id: `news-${Date.now()}`,
      title: "Новая новость",
      subtitle: "Подзаголовок новости",
      description: "Описание новости",
      date: new Date().toISOString().slice(0, 10),
      image: "/news/news1.jpg",
      url: ""
    };
    const newNewsData = [...(formData.newsData || []), newNewsItem];
    setFormData(prev => ({ ...prev, newsData: newNewsData }));
    setIsDirty(true);
  };

  const removeNews = (index: number) => {
    const newNewsData = [...(formData.newsData || [])];
    newNewsData.splice(index, 1);
    setFormData(prev => ({ ...prev, newsData: newNewsData }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Update the entire news data as a batch
      await updatePageData('batch', formData);
      setIsDirty(false);
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Заголовок раздела
        </label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* News List */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Список новостей
          </label>
          <button
            onClick={addNews}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Добавить новость
          </button>
        </div>

        <div className="space-y-4">
          {(formData.newsData || []).map((newsItem: NewsItem, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium">Новость {index + 1}</h4>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    {editingIndex === index ? 'Свернуть' : 'Редактировать'}
                  </button>
                  <button
                    onClick={() => removeNews(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Удалить
                  </button>
                </div>
              </div>

              {editingIndex === index && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ID новости
                    </label>
                    <input
                      type="text"
                      value={newsItem.id || ''}
                      onChange={(e) => handleNewsChange(index, 'id', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Заголовок новости
                    </label>
                    <input
                      type="text"
                      value={newsItem.title || ''}
                      onChange={(e) => handleNewsChange(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Подзаголовок
                    </label>
                    <input
                      type="text"
                      value={newsItem.subtitle || ''}
                      onChange={(e) => handleNewsChange(index, 'subtitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <RichTextEditor
                      value={newsItem.description || ''}
                      onChange={(value) => handleNewsChange(index, 'description', value)}
                      label="Описание новости"
                      placeholder="Введите описание новости..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Дата публикации (YYYY-MM-DD)
                    </label>
                    <input
                      type="text"
                      value={newsItem.date || ''}
                      onChange={(e) => handleNewsChange(index, 'date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Изображение новости
                    </label>
                    <ImageUploadAdvanced
                      onUploadComplete={(urls) => handleNewsChange(index, 'image', urls[0])}
                      folder="news"
                      label="Загрузить изображение новости"
                      multiple={false}
                      currentImages={newsItem.image ? [newsItem.image] : []}
                      onRemoveImage={() => handleNewsChange(index, 'image', '')}
                    />
                    {newsItem.image && (
                      <div className="mt-2">
                        <img 
                          src={newsItem.image} 
                          alt="News image" 
                          className="w-32 h-24 object-cover rounded border"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL ссылка (опционально)
                    </label>
                    <input
                      type="text"
                      value={newsItem.url || ''}
                      onChange={(e) => handleNewsChange(index, 'url', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/news"
                    />
                  </div>
                </div>
              )}

              {editingIndex !== index && (
                <div className="text-sm text-gray-600">
                  <p><strong>ID:</strong> {newsItem.id}</p>
                  <p><strong>Заголовок:</strong> {newsItem.title}</p>
                  <p><strong>Подзаголовок:</strong> {newsItem.subtitle}</p>
                  <p><strong>Дата:</strong> {newsItem.date}</p>
                  <p><strong>Описание:</strong> {newsItem.description?.substring(0, 100)}...</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

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

function TeamEditor({ pageData, updatePageData }: TeamEditorProps) {
  const [formData, setFormData] = useState(pageData);
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Update form data when pageData changes
  useEffect(() => {
    setFormData(pageData);
    setIsDirty(false);
  }, [pageData]);

  if (!pageData) {
    return <div>Загрузка...</div>;
  }

  const handleInputChange = (key: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handleTeamMemberChange = (index: number, field: string, value: unknown) => {
    const newMembersData = [...(formData.members || [])];
    newMembersData[index] = { ...newMembersData[index], [field]: value };
    setFormData(prev => ({ ...prev, members: newMembersData }));
    setIsDirty(true);
  };

  const addTeamMember = () => {
    const newTeamMember = {
      image: ["/team/avatar1.svg"],
      name: ["Новый сотрудник"],
    };
    const newMembersData = [...(formData.members || []), newTeamMember];
    setFormData(prev => ({ ...prev, members: newMembersData }));
    setIsDirty(true);
  };

  const removeTeamMember = (index: number) => {
    const newMembersData = [...(formData.members || [])];
    newMembersData.splice(index, 1);
    setFormData(prev => ({ ...prev, members: newMembersData }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Update the entire team data as a batch
      await updatePageData('batch', formData);
      setIsDirty(false);
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Заголовок раздела
        </label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Subtitle */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Подзаголовок
        </label>
        <input
          type="text"
          value={formData.subtitle || ''}
          onChange={(e) => handleInputChange('subtitle', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Описание команды
        </label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>

      {/* Team Members List */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Список сотрудников команды
          </label>
          <button
            onClick={addTeamMember}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Добавить сотрудника
          </button>
        </div>

        <div className="space-y-4">
          {(formData.members || []).map((member: TeamMember, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium">Сотрудник {index + 1}</h4>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    {editingIndex === index ? 'Свернуть' : 'Редактировать'}
                  </button>
                  <button
                    onClick={() => removeTeamMember(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Удалить
                  </button>
                </div>
              </div>

              {editingIndex === index && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Имя сотрудника
                    </label>
                    <input
                      type="text"
                      value={Array.isArray(member.name) ? member.name[0] || '' : member.name || ''}
                      onChange={(e) => handleTeamMemberChange(index, 'name', [e.target.value])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Изображение сотрудника
                    </label>
                    <input
                      type="text"
                      value={Array.isArray(member.image) ? member.image[0] || '' : member.image || ''}
                      onChange={(e) => handleTeamMemberChange(index, 'image', [e.target.value])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="/team/avatar1.svg"
                    />
                  </div>
                </div>
              )}

              {editingIndex !== index && (
                <div className="text-sm text-gray-600">
                  <p><strong>Имя:</strong> {Array.isArray(member.name) ? member.name[0] : member.name}</p>
                  <p><strong>Изображение:</strong> {Array.isArray(member.image) ? member.image[0] : member.image}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

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

function VacanciesEditor({ pageData, updatePageData }: VacanciesEditorProps) {
  const [formData, setFormData] = useState(pageData);
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Update form data when pageData changes
  useEffect(() => {
    setFormData(pageData);
    setIsDirty(false);
  }, [pageData]);

  if (!pageData) {
    return <div>Загрузка...</div>;
  }

  const handleInputChange = (key: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handleVacancyChange = (index: number, field: string, value: unknown) => {
    const newVacancyData = [...(formData.vacancyData || [])];
    newVacancyData[index] = { ...newVacancyData[index], [field]: value };
    setFormData(prev => ({ ...prev, vacancyData: newVacancyData }));
    setIsDirty(true);
  };

  const addVacancy = () => {
    const newVacancy = {
      id: `vacancy-${Date.now()}`,
      mainTitle: 'Новая вакансия',
      shortInfo: 'Опыт работы: 3–6 лет\nПолная занятость\nГрафик: 5/2\nРабочие часы: 8',
      title1: 'Обязанности:',
      description1: 'Описание обязанностей для новой вакансии',
      title2: 'Требования:',
      description2: 'Требования к кандидату',
      title3: 'Условия:',
      description3: 'Условия работы и компенсации',
    };
    const newVacancyData = [...(formData.vacancyData || []), newVacancy];
    setFormData(prev => ({ ...prev, vacancyData: newVacancyData }));
    setIsDirty(true);
  };

  const removeVacancy = (index: number) => {
    const newVacancyData = [...(formData.vacancyData || [])];
    newVacancyData.splice(index, 1);
    setFormData(prev => ({ ...prev, vacancyData: newVacancyData }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Update the entire vacancies data as a batch
      await updatePageData('batch', formData);
      setIsDirty(false);
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Заголовок раздела
        </label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Vacancies List */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Список вакансий
          </label>
          <button
            onClick={addVacancy}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Добавить вакансию
          </button>
        </div>

        <div className="space-y-4">
          {(formData.vacancyData || []).map((vacancy: VacancyItem, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium">Вакансия {index + 1}</h4>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    {editingIndex === index ? 'Свернуть' : 'Редактировать'}
                  </button>
                  <button
                    onClick={() => removeVacancy(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Удалить
                  </button>
                </div>
              </div>

              {editingIndex === index && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ID вакансии
                    </label>
                    <input
                      type="text"
                      value={vacancy.id || ''}
                      onChange={(e) => handleVacancyChange(index, 'id', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Основной заголовок
                    </label>
                    <input
                      type="text"
                      value={vacancy.mainTitle || ''}
                      onChange={(e) => handleVacancyChange(index, 'mainTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Краткая информация
                    </label>
                    <textarea
                      value={vacancy.shortInfo || ''}
                      onChange={(e) => handleVacancyChange(index, 'shortInfo', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Заголовок 1 (Обязанности)
                    </label>
                    <input
                      type="text"
                      value={vacancy.title1 || ''}
                      onChange={(e) => handleVacancyChange(index, 'title1', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Описание 1 (Обязанности)
                    </label>
                    <textarea
                      value={vacancy.description1 || ''}
                      onChange={(e) => handleVacancyChange(index, 'description1', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Заголовок 2 (Требования)
                    </label>
                    <input
                      type="text"
                      value={vacancy.title2 || ''}
                      onChange={(e) => handleVacancyChange(index, 'title2', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Описание 2 (Требования)
                    </label>
                    <textarea
                      value={vacancy.description2 || ''}
                      onChange={(e) => handleVacancyChange(index, 'description2', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Заголовок 3 (Условия)
                    </label>
                    <input
                      type="text"
                      value={vacancy.title3 || ''}
                      onChange={(e) => handleVacancyChange(index, 'title3', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Описание 3 (Условия)
                    </label>
                    <textarea
                      value={vacancy.description3 || ''}
                      onChange={(e) => handleVacancyChange(index, 'description3', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {editingIndex !== index && (
                <div className="text-sm text-gray-600">
                  <p><strong>ID:</strong> {vacancy.id}</p>
                  <p><strong>Заголовок:</strong> {vacancy.mainTitle}</p>
                  <p><strong>Краткая информация:</strong> {vacancy.shortInfo?.substring(0, 100)}...</p>
                  <p><strong>Обязанности:</strong> {vacancy.description1?.substring(0, 100)}...</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

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

function ServicesEditor({ pageData, updatePageData }: ServicesEditorProps) {
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

  const handleInputChange = (key: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Update the entire services data as a batch
      await updatePageData('batch', formData);
      setIsDirty(false);
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Редактирование раздела: Услуги
      </h2>

      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Заголовок раздела
          </label>
          <input
            type="text"
            value={formData.title || ''}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* First Service */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Первая услуга</h3>
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.visible1 !== false}
                  onChange={(e) => handleInputChange('visible1', e.target.checked)}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Показать услугу</span>
              </label>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Подзаголовок первой услуги
              </label>
              <input
                type="text"
                value={formData.subtitle1 || ''}
                onChange={(e) => handleInputChange('subtitle1', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <RichTextEditor
                value={formData.description1 || ''}
                onChange={(value) => handleInputChange('description1', value)}
                label="Описание первой услуги"
                placeholder="Введите описание первой услуги..."
              />
            </div>
          </div>
        </div>

        {/* Second Service */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Вторая услуга</h3>
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.visible2 !== false}
                  onChange={(e) => handleInputChange('visible2', e.target.checked)}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Показать услугу</span>
              </label>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Подзаголовок второй услуги
              </label>
              <input
                type="text"
                value={formData.subtitle2 || ''}
                onChange={(e) => handleInputChange('subtitle2', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <RichTextEditor
                value={formData.description2 || ''}
                onChange={(value) => handleInputChange('description2', value)}
                label="Описание второй услуги"
                placeholder="Введите описание второй услуги..."
              />
            </div>
          </div>
        </div>
      </div>

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

function ContentEditor({ pageData, updatePageData, section }: ContentEditorProps) {
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

  const handleInputChange = (key: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (section === 'objects') {
        await (updatePageData as (field: string, value: unknown) => Promise<void>)('batch', formData);
      } else if (section === 'partners') {
        await (updatePageData as (field: string, value: unknown) => Promise<void>)('batch', formData);
      } else if (section === 'certificates') {
        await (updatePageData as (field: string, value: unknown) => Promise<void>)('batch', formData);
      } else if (section === 'news') {
        await (updatePageData as (field: string, value: unknown) => Promise<void>)('batch', formData);
      } else if (section === 'team') {
        await (updatePageData as (field: string, value: unknown) => Promise<void>)('batch', formData);
      } else if (section === 'vacancies') {
        await (updatePageData as (field: string, value: unknown) => Promise<void>)('batch', formData);
      } else {
        // Handle other sections that use the old updatePageData signature
        const oldUpdateFunction = updatePageData as (page: string, key: string, value: unknown) => void;
        oldUpdateFunction(section, 'batch', formData);
      }
      setIsDirty(false);
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      setSaving(false);
    }
  };

  // Get editable fields based on section
  const getEditableFields = () => {
    const fields = [];
    
    if (formData.title !== undefined) {
      fields.push({ key: 'title', label: 'Заголовок', type: 'text' });
    }
    if (formData.subtitle !== undefined) {
      fields.push({ key: 'subtitle', label: 'Подзаголовок', type: 'text' });
    }
    if (formData.description !== undefined) {
      fields.push({ key: 'description', label: 'Описание', type: 'textarea' });
    }
    if (formData.paragraph1 !== undefined) {
      fields.push({ key: 'paragraph1', label: 'Параграф 1', type: 'textarea' });
    }
    if (formData.paragraph2 !== undefined) {
      fields.push({ key: 'paragraph2', label: 'Параграф 2', type: 'textarea' });
    }
    if (formData.row1 !== undefined) {
      fields.push({ key: 'row1', label: 'Строка 1', type: 'text' });
    }
    if (formData.row2 !== undefined) {
      fields.push({ key: 'row2', label: 'Строка 2', type: 'text' });
    }
    if (formData.row3 !== undefined) {
      fields.push({ key: 'row3', label: 'Строка 3', type: 'text' });
    }
    if (formData.row4 !== undefined) {
      fields.push({ key: 'row4', label: 'Строка 4', type: 'text' });
    }

    return fields;
  };

  const editableFields = getEditableFields();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Редактирование раздела: {section}
      </h2>

      {editableFields.length === 0 ? (
        <div className="text-gray-500">
          Нет редактируемых полей для этого раздела.
        </div>
      ) : (
        <div className="space-y-4">
          {editableFields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  value={formData[field.key] || ''}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
              ) : (
                <input
                  type="text"
                  value={formData[field.key] || ''}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          ))}
        </div>
      )}

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
