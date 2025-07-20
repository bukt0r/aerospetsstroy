"use client";

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/config/firebaseClient';

// Initial state for main page
const defaultMainPageData = {
  title: "МЫ СОЗДАЕМ БУДУЩЕЕ",
  subtitle: "полный спектр услуг по строительству",
  email: "info@aeross.ru",
  phone: "+7(931)319-25-05",
};

// Initial state for specialization page
const defaultSpecializationData = {
  visible: true,
  title: "СПЕЦИАЛИЗАЦИЯ",
  description: "ООО «АэроСпецСтрой» специализируется на промышленном строительстве.\n" +
    "            Компания выполняет подрядные работы по созданию объектов железнодорожной и\n" +
    "            авиационной инфраструктуры, водоотводных сооружений и гражданского строительства.",
  subtitle1: "Виды услуг",
  description1: "Строительство и реконструкция капитальных и некапитальных объектов;\n" +
    "Земляные работы и устройство свайных оснований;\n" +
    "Монтаж железобетонных и металлических конструкций;\n" +
    "Устройство инженерных коммуникаций;\n" +
    "Пусконаладочные работы и ввод объектов в эксплуатацию.",
  subtitle2: "Приоритеты компании",
  description2: "Оптимизация проектных решений;\n" +
    "            Соблюдение сроков выполнения работ; Высокий уровень качества и безопасности строительства.\n" +
    "            Такой подход позволяет минимизировать риски и гарантировать надежную эксплуатацию построенных объектов.",
};

// Initial state for services page
const defaultServicesData = {
  visible: true,
  title: "УСЛУГИ",
  subtitle1: "Строительство",
  description1: "Строим высокотехнологичные производственные комплексы в разных отраслях. ",
  subtitle2: "Проектирование",
  description2: "Нами реализовано большое количество посадочных площадок всех типов и сложности на территории РФ и СНГ. Наша компания выполняет работы с соблюдением всех норм, применяя самые современные технологии, материалы и оборудование.",
};

export function useFirestoreContent() {
  const [mainPageData, setMainPageData] = useState(defaultMainPageData);
  const [specializationData, setSpecializationData] = useState(defaultSpecializationData);
  const [servicesData, setServicesData] = useState(defaultServicesData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load main page data from Firestore
  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    const unsubscribeMain = onSnapshot(
      doc(db, 'pages', 'main'),
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setMainPageData({
            title: data.title || defaultMainPageData.title,
            subtitle: data.subtitle || defaultMainPageData.subtitle,
            email: data.email || defaultMainPageData.email,
            phone: data.phone || defaultMainPageData.phone,
          });
        } else {
          // If document doesn't exist, create it with default data
          setDoc(doc(db, 'pages', 'main'), defaultMainPageData);
          setMainPageData(defaultMainPageData);
        }
      },
      (error) => {
        console.error('Error loading main page data:', error);
        setError(error.message);
      }
    );

    return () => unsubscribeMain();
  }, [db]);

  // Load specialization data from Firestore
  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    const unsubscribeSpecialization = onSnapshot(
      doc(db, 'pages', 'specialization'),
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setSpecializationData({
            visible: data.visible !== false,
            title: data.title || defaultSpecializationData.title,
            description: data.description || defaultSpecializationData.description,
            subtitle1: data.subtitle1 || defaultSpecializationData.subtitle1,
            description1: data.description1 || defaultSpecializationData.description1,
            subtitle2: data.subtitle2 || defaultSpecializationData.subtitle2,
            description2: data.description2 || defaultSpecializationData.description2,
          });
        } else {
          // If document doesn't exist, create it with default data
          setDoc(doc(db, 'pages', 'specialization'), defaultSpecializationData);
          setSpecializationData(defaultSpecializationData);
        }
      },
      (error) => {
        console.error('Error loading specialization data:', error);
        setError(error.message);
      }
    );

    return () => unsubscribeSpecialization();
  }, [db]);

  // Load services data from Firestore
  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    const unsubscribeServices = onSnapshot(
      doc(db, 'pages', 'services'),
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setServicesData({
            visible: data.visible !== false,
            title: data.title || defaultServicesData.title,
            subtitle1: data.subtitle1 || defaultServicesData.subtitle1,
            description1: data.description1 || defaultServicesData.description1,
            subtitle2: data.subtitle2 || defaultServicesData.subtitle2,
            description2: data.description2 || defaultServicesData.description2,
          });
        } else {
          // If document doesn't exist, create it with default data
          setDoc(doc(db, 'pages', 'services'), defaultServicesData);
          setServicesData(defaultServicesData);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error loading services data:', error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribeServices();
  }, [db]);

  // Update main page data
  const updateMainPageData = async (field: string, value: any) => {
    if (!db) return;
    
    try {
      const docRef = doc(db, 'pages', 'main');
      if (field === 'batch') {
        // Handle batch update
        await setDoc(docRef, value, { merge: true });
        setMainPageData(value);
      } else {
        // Handle single field update
        await setDoc(docRef, { ...mainPageData, [field]: value }, { merge: true });
        setMainPageData(prev => ({ ...prev, [field]: value }));
      }
    } catch (error) {
      console.error('Error updating main page data:', error);
      setError('Failed to update data');
    }
  };

  // Update specialization data
  const updateSpecializationData = async (field: string, value: any) => {
    if (!db) return;
    
    try {
      const docRef = doc(db, 'pages', 'specialization');
      if (field === 'batch') {
        // Handle batch update
        await setDoc(docRef, value, { merge: true });
        setSpecializationData(value);
      } else {
        // Handle single field update
        await setDoc(docRef, { ...specializationData, [field]: value }, { merge: true });
        setSpecializationData(prev => ({ ...prev, [field]: value }));
      }
    } catch (error) {
      console.error('Error updating specialization data:', error);
      setError('Failed to update data');
    }
  };

  // Update services data
  const updateServicesData = async (field: string, value: any) => {
    if (!db) return;
    
    try {
      const docRef = doc(db, 'pages', 'services');
      if (field === 'batch') {
        // Handle batch update
        await setDoc(docRef, value, { merge: true });
        setServicesData(value);
      } else {
        // Handle single field update
        await setDoc(docRef, { ...servicesData, [field]: value }, { merge: true });
        setServicesData(prev => ({ ...prev, [field]: value }));
      }
    } catch (error) {
      console.error('Error updating services data:', error);
      setError('Failed to update data');
    }
  };

  return {
    mainPageData,
    specializationData,
    servicesData,
    updateMainPageData,
    updateSpecializationData,
    updateServicesData,
    loading,
    error
  };
} 