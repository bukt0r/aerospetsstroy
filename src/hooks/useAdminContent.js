'use client';
import { useEffect, useState } from "react";

const LOCAL_STORAGE_KEY = "adminContent";
const LOCAL_STORAGE_VERSION_KEY = "adminContentVersion";

const defaultVersion = "1.0.1";
const defaultContent = [
    {
        page: "main",
        title: "МЫ СОЗДАЕМ БУДУЩЕЕ",
        subtitle: "полный спектр услуг по проектированию и строительству",
        email: "info@aeross.ru",
        phone: "+7(931)319-25-05",
    },
    {
        page: "specialization",
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
            "            Соблюдение сроков выполнения работ;Высокий уровень качества и безопасности строительства.\n" +
            "            Такой подход позволяет минимизировать риски и гарантировать надежную эксплуатацию построенных объектов.",
    },
    {
        page: "services",
        visible: true,
        title: "УСЛУГИ",
        subtitle1: "Строительство",
        description1: "Строим высокотехнологичные производственные комплексы в разных отраслях",
        subtitle2: "Проектирование",
        description2: "Нами реализовано большое количество посадочных площадок всех типов и сложности на территории РФ и СНГ. Наша компания выполняет работы с соблюдением всех норм, применяя самые современные технологии, материалы и оборудование.",
    },
    {
        page: "objects",
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

    },
    {
        page: "news",
        visible: true,
        title: "НОВОСТИ",
        subtitle: "",
        description: "",
    },
    {
        page: "team",
        visible: true,
        title: "КОМАНДА",
        subtitle: "Наша команда профессионалов",
        description: "Мы гордимся нашей командой экспертов",
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
        ]
    },
    {
        page: "aboutCompany",
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
    },
    {
        page: "partners",
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
        ]
    },
    {
        page: "certificates",
        visible: true,
        title: "СЕРТИФИКАТЫ",
        documents: {
            ordering: [
                {
                    description:
                        'Выписка из реестра членов саморегулируемой организации в составе единого реестра сведений о членах саморегулируемых организаций в области строительства, реконструкции, капитального ремонта, сноса объектов капитального строительства и их обязательствах от 06.03.2025',
                    images: ['/certificates/ordering_1-1.png', '/certificates/ordering_1-2.png'],
                    pdf: '/certificates/ordering.pdf',
                },
                {
                    description:
                        'Выписка из реестра членов саморегулируемой организации в составе единого реестра сведений о членах саморегулируемых организаций в области строительства, реконструкции, капитального ремонта, сноса объектов капитального строительства и их обязательствах от 06.03.2025',
                    images: ['/certificates/ordering_1-3.png', '/certificates/ordering_1-4.png'],
                    pdf: '/certificates/ordering.pdf',
                },
            ],
            license: [
                {
                    description:
                        'Информация из реестра лицензий по состоянию на 23.08.2024 г.',
                    images: ['/certificates/license_1-1.png', '/certificates/license_1-2.png'],
                    pdf: '/certificates/license.pdf',
                }
            ],
            certificate: [
                {
                    description:
                        'Сертификат соответсвия',
                    images: ['/certificates/certificate_1-1.png', '/certificates/certificate_1-2.png'],
                    pdf: '/certificates/certificate.pdf',
                },
                {
                    description:
                        'Сертификат соответсвия',
                    images: ['/certificates/certificate_1-3.png'],
                    pdf: '/certificates/certificate.pdf',
                },
            ],
            opd: [
                {
                    description:
                        'Политика общества с ограниченной ответственностью "АэроСпецСтрой" (ООО «АСС») в отношении обработки персональных данных',
                    images: ['/certificates/opd.png',],
                    pdf: '/certificates/opd.pdf',
                },
            ],
        },
    },
    {
        page: "vacancies",
        visible: true,
        title: "ВАКАНСИИ",
        vacancyData:[
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

    },
];

export function useAdminContent() {
    const [content, setContent] = useState(defaultContent);

    useEffect(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        const savedVersion = localStorage.getItem(LOCAL_STORAGE_VERSION_KEY);

        if (saved && savedVersion === defaultVersion) {
            try {
                setContent(JSON.parse(saved));
            } catch (e) {
                console.error("Ошибка чтения localStorage", e);
                resetToDefault();
            }
        } else {
            resetToDefault();
        }
    }, []);

    const togglePageVisibility = (page) => {
        setContent((prev) =>
            prev.map((item) =>
                item.page === page ? { ...item, visible: !item.visible } : item
            )
        );
    };

    const resetToDefault = () => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultContent));
        localStorage.setItem(LOCAL_STORAGE_VERSION_KEY, defaultVersion);
        setContent(defaultContent);
    };

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(content));
    }, [content]);

    const getPageData = (page) => content.find((item) => item.page === page);
    const updatePageData = (page, key, value) => {
        setContent((prev) =>
            prev.map((item) =>
                item.page === page ? { ...item, [key]: value } : item
            )
        );
    };

    return { content, getPageData, updatePageData, togglePageVisibility };
}
