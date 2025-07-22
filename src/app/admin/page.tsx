"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useAdminContent } from '@/hooks/useAdminContent';
import { useFirestoreContent } from '@/hooks/useFirestoreContent';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { getPageData, updatePageData, togglePageVisibility } = useAdminContent();
  const { mainPageData, specializationData, servicesData, objectsData, aboutCompanyData, partnersData, certificatesData, updateMainPageData, updateSpecializationData, updateServicesData, updateObjectsData, updateAboutCompanyData, updatePartnersData, updateCertificatesData } = useFirestoreContent();
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
                                 section.id === 'services' ? servicesData : 
                                 section.id === 'objects' ? objectsData :
                                 section.id === 'aboutCompany' ? aboutCompanyData :
                                 section.id === 'partners' ? partnersData :
                                 section.id === 'certificates' ? certificatesData :
                                 getPageData(section.id);
                  const isVisible = section.id === 'main' ? true : 
                                  section.id === 'specialization' ? specializationData?.visible : 
                                  section.id === 'services' ? servicesData?.visible : 
                                  section.id === 'objects' ? objectsData?.visible :
                                  section.id === 'aboutCompany' ? aboutCompanyData?.visible :
                                  section.id === 'partners' ? partnersData?.visible :
                                  section.id === 'certificates' ? certificatesData?.visible :
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
                ) : activeSection === 'objects' ? (
                  <ObjectsEditor 
                    pageData={objectsData}
                    updatePageData={updateObjectsData}
                  />
                ) : activeSection === 'partners' ? (
                  <PartnersEditor 
                    pageData={partnersData}
                    updatePageData={updatePartnersData}
                  />
                ) : activeSection === 'certificates' ? (
                  <CertificatesEditor 
                    pageData={certificatesData}
                    updatePageData={updateCertificatesData}
                  />
                ) : (
                  <ContentEditor 
                    section={activeSection} 
                    pageData={activeSection === 'main' ? mainPageData : 
                             activeSection === 'specialization' ? specializationData : 
                             activeSection === 'services' ? servicesData : 
                             activeSection === 'aboutCompany' ? aboutCompanyData :
                             activeSection === 'partners' ? partnersData :
                             activeSection === 'certificates' ? certificatesData :
                             getPageData(activeSection)}
                    updatePageData={activeSection === 'main' ? updateMainPageData : 
                                  activeSection === 'specialization' ? updateSpecializationData : 
                                  activeSection === 'services' ? updateServicesData : 
                                  activeSection === 'aboutCompany' ? updateAboutCompanyData :
                                  activeSection === 'partners' ? updatePartnersData :
                                  activeSection === 'certificates' ? updateCertificatesData :
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

interface ObjectsEditorProps {
  pageData: any;
  updatePageData: (field: string, value: any) => Promise<void>;
}

interface PartnersEditorProps {
  pageData: any;
  updatePageData: (field: string, value: any) => Promise<void>;
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

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handleObjectChange = (index: number, field: string, value: any) => {
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
          {(formData.objectsData || []).map((object: any, index: number) => (
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
                    <input
                      type="text"
                      value={object.image || ''}
                      onChange={(e) => handleObjectChange(index, 'image', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="/objects/objects1-full.svg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Дополнительные изображения (через запятую)
                    </label>
                    <input
                      type="text"
                      value={Array.isArray(object.images) ? object.images.join(', ') : ''}
                      onChange={(e) => handleObjectChange(index, 'images', e.target.value.split(', ').filter(img => img.trim()))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="/objects/images/1-1.svg, /objects/images/1-2.svg"
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

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handlePartnerChange = (index: number, field: string, value: any) => {
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
          {(formData.baners || []).map((partner: any, index: number) => (
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

interface CertificatesEditorProps {
  pageData: any;
  updatePageData: (field: string, value: any) => Promise<void>;
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

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handleDocumentChange = (section: string, index: number, field: string, value: any) => {
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
          {documents.map((document: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium">Документ {index + 1}</h4>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      const key = `${sectionName}-${index}`;
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
      } else if (section === 'services') {
        await (updatePageData as (field: string, value: any) => Promise<void>)('batch', formData);
      } else if (section === 'aboutCompany') {
        await (updatePageData as (field: string, value: any) => Promise<void>)('batch', formData);
      } else if (section === 'partners') {
        await (updatePageData as (field: string, value: any) => Promise<void>)('batch', formData);
      } else if (section === 'certificates') {
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
