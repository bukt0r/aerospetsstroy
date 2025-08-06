"use client";

import { useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/config/firebaseClient';

// Type definitions for data structures
interface MainPageData {
  title: string;
  subtitle: string;
  email: string;
  phone: string;
}

interface SpecializationData {
  visible: boolean;
  title: string;
  description: string;
  subtitle1: string;
  description1: string;
  subtitle2: string;
  description2: string;
}

interface ServicesData {
  visible: boolean;
  title: string;
  subtitle1: string;
  description1: string;
  visible1: boolean;
  subtitle2: string;
  description2: string;
  visible2: boolean;
}

interface ObjectItem {
  title: string;
  description: string;
  address: string;
  adressUrl: string;
  image: string;
  images: string[];
}

interface ObjectsData {
  visible: boolean;
  title: string;
  objectsData: ObjectItem[];
}

interface AboutCompanyData {
  visible: boolean;
  title: string;
  paragraph1: string;
  subtitle: string;
  row1: string;
  row2: string;
  row3: string;
  row4: string;
  paragraph2: string;
}

interface PartnerItem {
  image: string[];
}

interface PartnersData {
  visible: boolean;
  title: string;
  baners: PartnerItem[];
}

interface CertificateDocument {
  description: string;
  images: string[];
  pdf: string;
  visible: boolean;
}

interface CertificatesDocuments {
  ordering: CertificateDocument[];
  license: CertificateDocument[];
  certificate: CertificateDocument[];
}

interface CertificatesData {
  visible: boolean;
  title: string;
  documents: CertificatesDocuments;
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

interface NewsData {
  visible: boolean;
  title: string;
  newsData: NewsItem[];
}

interface TeamMember {
  image: string[];
  name: string[];
}

interface TeamData {
  visible: boolean;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  members: TeamMember[];
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

interface VacanciesData {
  visible: boolean;
  title: string;
  vacancyData: VacancyItem[];
}

// Update function type
type UpdateFunction = (field: string, value: unknown) => Promise<void>;

// Initial state for main page
const defaultMainPageData: MainPageData = {
  title: "МЫ СОЗДАЕМ БУДУЩЕЕ",
  subtitle: "полный спектр услуг по строительству",
  email: "info@aeross.ru",
  phone: "+7(931)319-25-05",
};

// Initial state for specialization page
const defaultSpecializationData: SpecializationData = {
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
const defaultServicesData: ServicesData = {
  visible: true,
  title: "УСЛУГИ",
  subtitle1: "Строительство",
  description1: "Строим высокотехнологичные производственные комплексы в разных отраслях. ",
  visible1: true,
  subtitle2: "Проектирование",
  description2: "Нами реализовано большое количество посадочных площадок всех типов и сложности на территории РФ и СНГ. Наша компания выполняет работы с соблюдением всех норм, применяя самые современные технологии, материалы и оборудование.",
  visible2: true,
};

// Initial state for objects page
const defaultObjectsData: ObjectsData = {
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
const defaultAboutCompanyData: AboutCompanyData = {
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
const defaultPartnersData: PartnersData = {
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

// Initial state for certificates page
const defaultCertificatesData: CertificatesData = {
  visible: true,
  title: "СЕРТИФИКАТЫ",
  documents: {
    ordering: [
      {
        description:
          'Выписка из реестра членов саморегулируемой организации в составе единого реестра сведений о членах саморегулируемых организаций в области строительства, реконструкции, капитального ремонта, сноса объектов капитального строительства и их обязательствах от 30.05.2025',
        images: ['/certificates/ordering-1.png', '/certificates/ordering-2.png', '/certificates/ordering-3.png', '/certificates/ordering-4.png'],
        pdf: '/certificates/ordering.pdf',
        visible: true,
      },
    ],
    license: [
      {
        description:
          'Информация из реестра лицензий по состоянию на 23.08.2024 г.',
        images: ['/certificates/license_1-1.png', '/certificates/license_1-2.png'],
        pdf: '/certificates/license.pdf',
        visible: true,
      }
    ],
    certificate: [
      {
        description:
          'Сертификат соответсвия',
        images: ['/certificates/certificate_1-1.png', '/certificates/certificate_1-2.png', '/certificates/certificate_1-3.png'],
        pdf: '/certificates/certificate.pdf',
        visible: true,
      }
    ],
  },
};

// Initial state for news page
const defaultNewsData: NewsData = {
  visible: true,
  title: "НОВОСТИ",
  newsData: [
    {
      id: "news-1",
      title: "Наша компания успешно завершила строительство объекта «ПТО на станции Анапа»",
      subtitle: "Завершение проекта",
      description: "Выполнение СМР на строительстве объекта: «ПТО на станции Анапа», включая полный комплекс работ по вертикальной планировке и устройству свайного фундамента, вынос сетей связи и СЦБ из зоны строительства и устройство сетей ЭС, устройство наружных сетей ТС, ВиК , устройство железобетонных буронабивных свай, монтаж ворот и звукоизолирующего шумозащитного ограждения. Краснодарский край, станция Анапа",
      date: "2023-10-27",
      image: "/news/news1.jpg",
      url: "/news/news1",
    },
    {
      id: "news-2",
      title: "Строительство вертолётной площадки, дороги и рулёжные дороги",
      subtitle: "Новый проект",
      description: "Выполнение полного комплекса СМР по инженерной инфраструктуре вертолетной площадки с рулёжными дорожками и дорогами из ж/б конструкций. Краснодарский край, с. Прасковеевка",
      date: "2023-09-15",
      image: "/news/news2.jpg",
      url: "/news/news2",
    },
    {
      id: "news-3",
      title: "Строительство шумозащитных экранов",
      subtitle: "Экологический проект",
      description: "Строительство второго пути на участке Выселки (вкл.) Козырьки (искл.)» Комплекс работ по устройству монолитных ростверков и монтажу шумозащитных экранов. Краснодарский край, Северо-Кавказская ж.д . Выселки Козырьки",
      date: "2023-08-20",
      image: "/news/news3.jpg",
      url: "/news/news3",
    },
  ],
};

// Initial state for team page
const defaultTeamData: TeamData = {
  visible: false,
  title: "КОМАНДА",
  subtitle: "Наша команда профессионалов",
  description: "Мы гордимся нашей командой экспертов",
  coverImage: "/team/teamFullScreen.svg",
  members: [
    {
      image: ["/team/avatar1.svg"],
      name: ["имя1 фамилия1"],
    },
    {
      image: ["/team/avatar2.svg"],
      name: ["имя2 фамилия2"],
    },
    {
      image: ["/team/avatar3.svg"],
      name: ["имя3 фамилия3"],
    },
    {
      image: ["/team/avatar1.svg"],
      name: ["имя4 фамилия4"],
    },
    {
      image: ["/team/avatar2.svg"],
      name: ["имя5 фамилия5"],
    },
    {
      image: ["/team/avatar3.svg"],
      name: ["имя6 фамилия6"],
    },
    {
      image: ["/team/avatar4.svg"],
      name: ["имя7 фамилия7"],
    },
    {
      image: ["/team/avatar5.svg"],
      name: ["имя8 фамилия8"],
    },
    {
      image: ["/team/avatar6.svg"],
      name: ["имя9 фамилия9"],
    },
    {
      image: ["/team/avatar7.svg"],
      name: ["имя10 фамилия10"],
    },
    {
      image: ["/team/avatar8.svg"],
      name: ["имя11 фамилия11"],
    },
    {
      image: ["/team/avatar9.svg"],
      name: ["имя12 фамилия12"],
    },
  ],
};

// Initial state for vacancies page
const defaultVacanciesData: VacanciesData = {
  visible: false,
  title: "ВАКАНСИИ",
  vacancyData: [
    {
      id: "engineer-ws",
      mainTitle: 'Инженер-проектировщик систем водоснабжения и канализации',
      shortInfo: 'Опыт работы: 3–6 лет\n' +
        'Полная занятость\n' +
        'График: 5/2\n' +
        'Рабочие часы: 8',
      title1: 'Обязанности:',
      description1: 'Разработка проектной и рабочей документации разделов водоснабжения и канализации в соответствии с требованиями нормативной документации;\n' +
        'Прохождение государственной экспертизы по разработанным проектам;\n' +
        'Сопровождение проектных работ по объектам строительства и контроль качества выполняемых работ;\n' +
        'Подготовка заданий для разработки смежных разделов проектной документации.',
      title2: 'Требования:',
      description2: 'Высшее образование по специализированному направлению;\n' +
        'Знание общих принципов и методов проектирования;\n' +
        'Опыт работы от 3-х лет (ПГС);\n' +
        'Уверенный пользователь ПК, обязательное владение AutoCAD, MS Office, расчетными программами по данному направлению, приветствуется знание Revit;\n' +
        'Знание методических, нормативно-технических материалов по проектированию; \n' +
        'строительству и эксплуатации объектов ПГС.',
      title3: 'Условия:',
      description3: 'Работа в г. Москве;\n' +
        'Официальное трудоустройство в соответствии с ТК РФ;\n' +
        'Предоставление полного соц. пакета;\n' +
        'Заработная плата от 120 т.р. по результатам собеседования.',
    }
  ],
};

export function useFirestoreContent() {
  const [mainPageData, setMainPageData] = useState<MainPageData>(defaultMainPageData);
  const [specializationData, setSpecializationData] = useState<SpecializationData>(defaultSpecializationData);
  const [servicesData, setServicesData] = useState<ServicesData>(defaultServicesData);
  const [objectsData, setObjectsData] = useState<ObjectsData>(defaultObjectsData);
  const [aboutCompanyData, setAboutCompanyData] = useState<AboutCompanyData>(defaultAboutCompanyData);
  const [partnersData, setPartnersData] = useState<PartnersData>(defaultPartnersData);
  const [certificatesData, setCertificatesData] = useState<CertificatesData>(defaultCertificatesData);
  const [newsData, setNewsData] = useState<NewsData>(defaultNewsData);
  const [teamData, setTeamData] = useState<TeamData>(defaultTeamData);
  const [vacanciesData, setVacanciesData] = useState<VacanciesData>(defaultVacanciesData);
  const [loading, setLoading] = useState<boolean>(true);
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
          const data = docSnapshot.data() as Partial<MainPageData>;
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
  }, []);

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
          const data = docSnapshot.data() as Partial<SpecializationData>;
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
  }, []);

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
          const data = docSnapshot.data() as Partial<ServicesData>;
          setServicesData({
            visible: data.visible !== false,
            title: data.title || defaultServicesData.title,
            subtitle1: data.subtitle1 || defaultServicesData.subtitle1,
            description1: data.description1 || defaultServicesData.description1,
            visible1: data.visible1 !== false,
            subtitle2: data.subtitle2 || defaultServicesData.subtitle2,
            description2: data.description2 || defaultServicesData.description2,
            visible2: data.visible2 !== false,
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
  }, []);

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
          const data = docSnapshot.data() as Partial<ObjectsData>;
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
  }, []);

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
          const data = docSnapshot.data() as Partial<AboutCompanyData>;
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
  }, []);

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
          const data = docSnapshot.data() as Partial<PartnersData>;
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
  }, []);

  // Load certificates data from Firestore
  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    const unsubscribeCertificates = onSnapshot(
      doc(db, 'pages', 'certificates'),
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data() as Partial<CertificatesData>;
          setCertificatesData({
            visible: data.visible !== false,
            title: data.title || defaultCertificatesData.title,
            documents: data.documents || defaultCertificatesData.documents,
          });
        } else {
          // If document doesn't exist, create it with default data
          setDoc(doc(db, 'pages', 'certificates'), defaultCertificatesData);
          setCertificatesData(defaultCertificatesData);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error loading certificates data:', error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribeCertificates();
  }, []);

  // Load news data from Firestore
  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    const unsubscribeNews = onSnapshot(
      doc(db, 'pages', 'news'),
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data() as Partial<NewsData>;
          setNewsData({
            visible: data.visible !== false,
            title: data.title || defaultNewsData.title,
            newsData: data.newsData || defaultNewsData.newsData,
          });
        } else {
          // If document doesn't exist, create it with default data
          setDoc(doc(db, 'pages', 'news'), defaultNewsData);
          setNewsData(defaultNewsData);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error loading news data:', error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribeNews();
  }, []);

  // Load team data from Firestore
  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    const unsubscribeTeam = onSnapshot(
      doc(db, 'pages', 'team'),
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data() as Partial<TeamData>;
          setTeamData({
            visible: data.visible !== false,
            title: data.title || defaultTeamData.title,
            subtitle: data.subtitle || defaultTeamData.subtitle,
            description: data.description || defaultTeamData.description,
            coverImage: data.coverImage || defaultTeamData.coverImage,
            members: data.members || defaultTeamData.members,
          });
        } else {
          // If document doesn't exist, create it with default data
          setDoc(doc(db, 'pages', 'team'), defaultTeamData);
          setTeamData(defaultTeamData);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error loading team data:', error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribeTeam();
  }, []);

  // Load vacancies data from Firestore
  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    const unsubscribeVacancies = onSnapshot(
      doc(db, 'pages', 'vacancies'),
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data() as Partial<VacanciesData>;
          setVacanciesData({
            visible: data.visible !== false,
            title: data.title || defaultVacanciesData.title,
            vacancyData: data.vacancyData || defaultVacanciesData.vacancyData,
          });
        } else {
          // If document doesn't exist, create it with default data
          setDoc(doc(db, 'pages', 'vacancies'), defaultVacanciesData);
          setVacanciesData(defaultVacanciesData);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error loading vacancies data:', error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribeVacancies();
  }, []);

  // Update main page data
  const updateMainPageData: UpdateFunction = async (field: string, value: unknown) => {
    if (!db) return;
    
    try {
      const docRef = doc(db, 'pages', 'main');
      if (field === 'batch') {
        // Handle batch update
        await setDoc(docRef, value, { merge: true });
        setMainPageData(value as MainPageData);
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
  const updateSpecializationData: UpdateFunction = async (field: string, value: unknown) => {
    if (!db) return;
    
    try {
      const docRef = doc(db, 'pages', 'specialization');
      if (field === 'batch') {
        // Handle batch update
        await setDoc(docRef, value, { merge: true });
        setSpecializationData(value as SpecializationData);
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
  const updateServicesData: UpdateFunction = async (field: string, value: unknown) => {
    if (!db) return;
    
    try {
      const docRef = doc(db, 'pages', 'services');
      if (field === 'batch') {
        // Handle batch update
        await setDoc(docRef, value, { merge: true });
        setServicesData(value as ServicesData);
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
  const updateObjectsData: UpdateFunction = async (field: string, value: unknown) => {
    if (!db) return;
    
    try {
      const docRef = doc(db, 'pages', 'objects');
      if (field === 'batch') {
        // Handle batch update
        await setDoc(docRef, value, { merge: true });
        setObjectsData(value as ObjectsData);
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
  const updateAboutCompanyData: UpdateFunction = async (field: string, value: unknown) => {
    if (!db) return;
    
    try {
      const docRef = doc(db, 'pages', 'aboutCompany');
      if (field === 'batch') {
        // Handle batch update
        await setDoc(docRef, value, { merge: true });
        setAboutCompanyData(value as AboutCompanyData);
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
  const updatePartnersData: UpdateFunction = async (field: string, value: unknown) => {
    if (!db) return;
    
    try {
      const docRef = doc(db, 'pages', 'partners');
      if (field === 'batch') {
        // Handle batch update
        await setDoc(docRef, value, { merge: true });
        setPartnersData(value as PartnersData);
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

  // Update certificates data
  const updateCertificatesData: UpdateFunction = async (field: string, value: unknown) => {
    if (!db) return;
    
    try {
      const docRef = doc(db, 'pages', 'certificates');
      if (field === 'batch') {
        // Handle batch update
        await setDoc(docRef, value, { merge: true });
        setCertificatesData(value as CertificatesData);
      } else {
        // Handle single field update
        await setDoc(docRef, { ...certificatesData, [field]: value }, { merge: true });
        setCertificatesData(prev => ({ ...prev, [field]: value }));
      }
    } catch (error) {
      console.error('Error updating certificates data:', error);
      setError('Failed to update data');
    }
  };

  // Update news data
  const updateNewsData: UpdateFunction = async (field: string, value: unknown) => {
    if (!db) return;
    
    try {
      const docRef = doc(db, 'pages', 'news');
      if (field === 'batch') {
        // Handle batch update
        await setDoc(docRef, value, { merge: true });
        setNewsData(value as NewsData);
      } else {
        // Handle single field update
        await setDoc(docRef, { ...newsData, [field]: value }, { merge: true });
        setNewsData(prev => ({ ...prev, [field]: value }));
      }
    } catch (error) {
      console.error('Error updating news data:', error);
      setError('Failed to update data');
    }
  };

  // Update team data
  const updateTeamData: UpdateFunction = async (field: string, value: unknown) => {
    if (!db) return;
    
    try {
      const docRef = doc(db, 'pages', 'team');
      if (field === 'batch') {
        // Handle batch update
        await setDoc(docRef, value, { merge: true });
        setTeamData(value as TeamData);
      } else {
        // Handle single field update
        await setDoc(docRef, { ...teamData, [field]: value }, { merge: true });
        setTeamData(prev => ({ ...prev, [field]: value }));
      }
    } catch (error) {
      console.error('Error updating team data:', error);
      setError('Failed to update data');
    }
  };

  // Update vacancies data
  const updateVacanciesData: UpdateFunction = async (field: string, value: unknown) => {
    if (!db) return;
    
    try {
      const docRef = doc(db, 'pages', 'vacancies');
      if (field === 'batch') {
        // Handle batch update
        await setDoc(docRef, value, { merge: true });
        setVacanciesData(value as VacanciesData);
      } else {
        // Handle single field update
        await setDoc(docRef, { ...vacanciesData, [field]: value }, { merge: true });
        setVacanciesData(prev => ({ ...prev, [field]: value }));
      }
    } catch (error) {
      console.error('Error updating vacancies data:', error);
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
    certificatesData,
    newsData,
    teamData,
    vacanciesData,
    updateMainPageData,
    updateSpecializationData,
    updateServicesData,
    updateObjectsData,
    updateAboutCompanyData,
    updatePartnersData,
    updateCertificatesData,
    updateNewsData,
    updateTeamData,
    updateVacanciesData,
    loading,
    error
  };
} 