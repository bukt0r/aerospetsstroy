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

// Initial state for objects page
const defaultObjectsData = {
  visible: true,
  title: "НАШИ ОБЪЕКТЫ",
  objectsData: [
    {
      title: "Пункт технического осмотра станции Анапа Северо-Кавказской железной дороги",
      description: "Выполнение СМР на строительстве объекта: «ПТО на станции Анапа», включая полный комплекс работ по вертикальной планировке и устройству свайного фундамента, вынос сетей связи и СЦБ из зоны строительства и устройство сетей ЭС, устройство наружных сетей ТС, ВиК , устройство железобетонных буронабивных свай, монтаж ворот и звукоизолирующего шумозащитного ограждения. Краснодарский край, станция Анапа",
      address: "г. Анапа улица Дмитрия Орехова, 2",
      adressUrl: "",
      image: "/objects/objects1-full.svg",
      images: ["/objects/images/1-1.svg","/objects/images/1-2.svg","/objects/images/1-3.svg","/objects/images/1-4.svg","/objects/images/1-5.svg","/objects/images/1-6.svg","/objects/images/1-7.svg","/objects/images/1-8.svg","/objects/images/1-9.svg","/objects/images/1-10.svg"],
    },
    {
      title: "Строительство вертолётной площадки, дороги и рулёжные дороги",
      description: "Выполнение полного комплекса СМР по инженерной инфраструктуре вертолетной площадки с рулёжными дорожками и дорогами из ж/б конструкций. Краснодарский край, с. Прасковеевка",
      address: "с. Прасковеевка, ул. Партизанская, 12",
      adressUrl: "",
      image: "/objects/objects2-full.svg",
      images: [],
    },
    {
      title: "Строительство шумозащитных экранов",
      description: "Строительство второго пути на участке Выселки (вкл.) Козырьки (искл.)» Комплекс работ по устройству монолитных ростверков и монтажу шумозащитных экранов. Краснодарский край, Северо-Кавказская ж.д . Выселки Козырьки",
      address: "Кореновское городское поселение",
      adressUrl: "",
      image: "/objects/objects3-full.svg",
      images: ["/objects/images/3-1.svg",],
    },
    {
      title: "Строительство причала",
      description: "Выполнение комплекса СМР по объекту № 112, включая комплекс бетонных работ по причалу. Краснодарский край, г. Геленджик",
      address: "г. Геленджик, Приморский бульвар",
      adressUrl: "",
      image: "/objects/objects4-full.svg",
      images: ["/objects/images/4-1.svg"],
    },
    {
      title: "Строительство вертолетной площадки",
      description: "Выполнение комплекса СМР по объекту № 2 и инженерной инфраструктуры вертолётной площадки с рулёжными дорожками и дорогами из ж/б конструкций. Краснодарский край, пос. Дивноморское",
      address: "пос. Дивноморское, ул. Кирова",
      adressUrl: "",
      image: "/objects/objects5-full.svg",
      images: ["/objects/images/5-1.svg", "/objects/images/5-2.svg"],
    },
    {
      title: "Строительство прудов испарителей",
      description: "Выполнение полного комплекса СМР по устройству прудов испарителей. Краснодарский край, г-к Анапа",
      address: "г. Анапа, площадь Советов",
      adressUrl: "",
      image: "/objects/objects6-full.svg",
      images: ["/objects/images/6-1.svg", "/objects/images/6-2.svg","/objects/images/6-3.svg", "/objects/images/6-4.svg"],
    },
    {
      title: "Строительство «Терминально логистического центра»",
      description: "Комплекс работ по вертикальной планировке на объекте «ТЛЦ. КТ Усады» Городской округ Домодедово, Московская область.",
      address: "деревня Глотаево",
      adressUrl: "",
      image: "/objects/objects7-full.svg",
      images: ["/objects/images/7-1.svg", "/objects/images/7-2.svg","/objects/images/7-3.svg", "/objects/images/7-4.svg"],
    },
    {
      title: "Строительство «Тermoland » ТРЦ OZ MALL",
      description: "Полный комплекс работ по демонтажу и кладке перегородок из кирпича и керамзитобетонных блоков, монтаж стоек фахверка и металлоконструкций. Краснодарский край, г. Краснодар",
      address: "г. Краснодар, ул. Крылатая, 2",
      adressUrl: "",
      image: "/objects/objects8-full.svg",
      images: ["/objects/images/8-1.svg", "/objects/images/8-2.svg","/objects/images/8-3.svg"],
    },
    {
      title: "Строительство коттеджного комплекса",
      description: "Полный комплекс работ по устройству ж.б. конструкций беседок, навесов, детского бассейна, основания террасы и основания под забор в составе реконструкции коттеджного комплекса. Краснодарский край, г. Адлер",
      address: "г. Анапа, микрорайон Центральный",
      adressUrl: "",
      image: "/objects/objects9-full.svg",
      images: ["/objects/images/9-1.svg", "/objects/images/9-2.svg","/objects/images/9-3.svg"],
    },
    {
      title: "Строительство коттеджного комплекса",
      description: "Полный комплекс работ по устройству ж.б. конструкций беседок, навесов, детского бассейна, основания террасы и основания под забор в составе реконструкции коттеджного комплекса. Краснодарский край, г. Адлер",
      address: "Село Береговое, ул. Мира",
      adressUrl: "",
      image: "/objects/objects10-full.svg",
      images: ["/objects/images/10-1.svg",],
    },
  ],
};

// Initial state for aboutCompany page
const defaultAboutCompanyData = {
  visible: true,
  title: "О КОМПАНИИ",
  paragraph1: "ООО «АэроСпецСтрой» — надежный подрядчик в сфере промышленного строительства.\n" +
    "            За годы работы компания зарекомендовала себя как эксперт в выполнении строительно-монтажных\n" +
    "            работ (СМР) любого уровня сложности.",
  subtitle: "Ключевые преимущества",
  row1: "Членство в СРО с третьим уровнем ответственности для реализации сложных и уникальных проектов.",
  row2: "Лицензия МЧС России на монтаж, обслуживание и ремонт систем пожарной безопасности.",
  row3: "Высококвалифицированный инженерно-технический персонал с подтвержденной аттестацией.",
  row4: "Собственная материально-техническая база для выполнения проектов любого масштаба.",
  paragraph2: "На сегодняшний день компания успешно реализует контракты на сумму\n" +
    "            свыше 1,718 млрд рублей, а также активно участвует в тендерах на\n" +
    "            крупнейших электронных площадках. География деятельности расширяется:\n" +
    "            помимо Центрального и Южного федеральных округов, работы планируются\n" +
    "            в Приволжском и Северо-Западном ФО.",
};

// Initial state for partners page
const defaultPartnersData = {
  visible: true,
  title: "НАШИ ПАРТНЕРЫ",
  baners: [
    { image: ["/partners/1-1.svg"] },
    { image: ["/partners/1-2.svg"] },
    { image: ["/partners/1-3.svg"] },
    { image: ["/partners/1-4.svg"] },
    { image: ["/partners/1-5.svg"] },
    { image: ["/partners/1-6.svg"] },
    { image: ["/partners/1-7.svg"] },
    { image: ["/partners/1-8.svg"] },
    { image: ["/partners/1-9.svg"] },
    { image: ["/partners/2-1.svg"] },
    { image: ["/partners/2-2.svg"] },
    { image: ["/partners/2-3.svg"] },
    { image: ["/partners/2-4.svg"] },
    { image: ["/partners/2-5.svg"] },
    { image: ["/partners/2-6.svg"] },
    { image: ["/partners/2-7.svg"] },
    { image: ["/partners/2-8.svg"] },
    { image: ["/partners/2-9.svg"] },
    { image: ["/partners/3-1.svg"] },
    { image: ["/partners/3-2.svg"] },
    { image: ["/partners/3-3.svg"] },
    { image: ["/partners/3-4.svg"] },
    { image: ["/partners/3-5.svg"] },
    { image: ["/partners/3-6.svg"] },
  ],
};

export function useFirestoreContent() {
  const [mainPageData, setMainPageData] = useState(defaultMainPageData);
  const [specializationData, setSpecializationData] = useState(defaultSpecializationData);
  const [servicesData, setServicesData] = useState(defaultServicesData);
  const [objectsData, setObjectsData] = useState(defaultObjectsData);
  const [aboutCompanyData, setAboutCompanyData] = useState(defaultAboutCompanyData);
  const [partnersData, setPartnersData] = useState(defaultPartnersData);
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

  // Load objects data from Firestore
  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    const unsubscribeObjects = onSnapshot(
      doc(db, 'pages', 'objects'),
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setObjectsData({
            visible: data.visible !== false,
            title: data.title || defaultObjectsData.title,
            objectsData: data.objectsData || defaultObjectsData.objectsData,
          });
        } else {
          // If document doesn't exist, create it with default data
          setDoc(doc(db, 'pages', 'objects'), defaultObjectsData);
          setObjectsData(defaultObjectsData);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error loading objects data:', error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribeObjects();
  }, [db]);

  // Load aboutCompany data from Firestore
  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    const unsubscribeAboutCompany = onSnapshot(
      doc(db, 'pages', 'aboutCompany'),
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setAboutCompanyData({
            visible: data.visible !== false,
            title: data.title || defaultAboutCompanyData.title,
            paragraph1: data.paragraph1 || defaultAboutCompanyData.paragraph1,
            subtitle: data.subtitle || defaultAboutCompanyData.subtitle,
            row1: data.row1 || defaultAboutCompanyData.row1,
            row2: data.row2 || defaultAboutCompanyData.row2,
            row3: data.row3 || defaultAboutCompanyData.row3,
            row4: data.row4 || defaultAboutCompanyData.row4,
            paragraph2: data.paragraph2 || defaultAboutCompanyData.paragraph2,
          });
        } else {
          // If document doesn't exist, create it with default data
          setDoc(doc(db, 'pages', 'aboutCompany'), defaultAboutCompanyData);
          setAboutCompanyData(defaultAboutCompanyData);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error loading aboutCompany data:', error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribeAboutCompany();
  }, [db]);

  // Load partners data from Firestore
  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    const unsubscribePartners = onSnapshot(
      doc(db, 'pages', 'partners'),
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setPartnersData({
            visible: data.visible !== false,
            title: data.title || defaultPartnersData.title,
            baners: data.baners || defaultPartnersData.baners,
          });
        } else {
          // If document doesn't exist, create it with default data
          setDoc(doc(db, 'pages', 'partners'), defaultPartnersData);
          setPartnersData(defaultPartnersData);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error loading partners data:', error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribePartners();
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

  // Update objects data
  const updateObjectsData = async (field: string, value: any) => {
    if (!db) return;
    
    try {
      const docRef = doc(db, 'pages', 'objects');
      if (field === 'batch') {
        // Handle batch update
        await setDoc(docRef, value, { merge: true });
        setObjectsData(value);
      } else {
        // Handle single field update
        await setDoc(docRef, { ...objectsData, [field]: value }, { merge: true });
        setObjectsData(prev => ({ ...prev, [field]: value }));
      }
    } catch (error) {
      console.error('Error updating objects data:', error);
      setError('Failed to update data');
    }
  };

  // Update aboutCompany data
  const updateAboutCompanyData = async (field: string, value: any) => {
    if (!db) return;
    
    try {
      const docRef = doc(db, 'pages', 'aboutCompany');
      if (field === 'batch') {
        // Handle batch update
        await setDoc(docRef, value, { merge: true });
        setAboutCompanyData(value);
      } else {
        // Handle single field update
        await setDoc(docRef, { ...aboutCompanyData, [field]: value }, { merge: true });
        setAboutCompanyData(prev => ({ ...prev, [field]: value }));
      }
    } catch (error) {
      console.error('Error updating aboutCompany data:', error);
      setError('Failed to update data');
    }
  };

  // Update partners data
  const updatePartnersData = async (field: string, value: any) => {
    if (!db) return;
    
    try {
      const docRef = doc(db, 'pages', 'partners');
      if (field === 'batch') {
        // Handle batch update
        await setDoc(docRef, value, { merge: true });
        setPartnersData(value);
      } else {
        // Handle single field update
        await setDoc(docRef, { ...partnersData, [field]: value }, { merge: true });
        setPartnersData(prev => ({ ...prev, [field]: value }));
      }
    } catch (error) {
      console.error('Error updating partners data:', error);
      setError('Failed to update data');
    }
  };

  return {
    mainPageData,
    specializationData,
    servicesData,
    objectsData,
    aboutCompanyData,
    partnersData,
    updateMainPageData,
    updateSpecializationData,
    updateServicesData,
    updateObjectsData,
    updateAboutCompanyData,
    updatePartnersData,
    loading,
    error
  };
} 