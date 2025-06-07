'use client';

import { useAdminContent } from "@/hooks/useAdminContent";

const Admin = () => {
    const { content, updatePageData, togglePageVisibility } = useAdminContent();

    const handleChange = (page, key) => (e) => {
        updatePageData(page, key, e.target.value);
    };

    return (
        <div className="flex flex-col gap-8 p-4">
            {content.map((pageData) => (
                <div
                    key={pageData.page}
                    className="border p-4 rounded bg-gray-50 shadow-md"
                >
                    <h2 className="text-xl font-bold mb-4">
                        Редактирование: {pageData.page}
                    </h2>

                    {"visible" in pageData && (
                        <button
                            className={`mb-4 text-sm p-2 border rounded-lg w-fit ${
                                pageData.visible ? "bg-gray-300" : "bg-blue-500 text-white"
                            }`}
                            onClick={() => togglePageVisibility(pageData.page)}
                        >
                            {pageData.visible ? "Скрыть блок" : "Показать блок"}
                        </button>
                    )}

                    {/* Обработка team.members */}
                    {pageData.page === "team" && pageData.members && (
                        <div className="flex flex-col gap-4 mb-4">
                            <label className="font-medium mb-2">Участники:</label>
                            {pageData.members.map((member, idx) => (
                                <div key={idx} className="flex flex-col border p-2 rounded gap-2">
                                    <input
                                        className="p-1 border rounded"
                                        value={member.name}
                                        placeholder="Имя"
                                        onChange={(e) => {
                                            const updated = [...pageData.members];
                                            updated[idx].name = e.target.value;
                                            updatePageData(pageData.page, "members", updated);
                                        }}
                                    />

                                    {member.image && (
                                        <img
                                            src={member.image}
                                            alt="preview"
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                    )}

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                const updated = [...pageData.members];
                                                updated[idx].image = reader.result;
                                                updatePageData(pageData.page, "members", updated);
                                            };
                                            reader.readAsDataURL(file);
                                        }}
                                    />

                                    <button
                                        className="text-red-500 text-sm self-start"
                                        onClick={() => {
                                            const updated = pageData.members.filter((_, i) => i !== idx);
                                            updatePageData(pageData.page, "members", updated);
                                        }}
                                    >
                                        Удалить
                                    </button>
                                </div>
                            ))}

                            <button
                                className="text-sm text-blue-600 border p-1 w-fit rounded"
                                onClick={() =>
                                    updatePageData(pageData.page, "members", [...pageData.members, { name: "", image: "" }])
                                }
                            >
                                Добавить участника
                            </button>
                        </div>
                    )}

                    {/* Обработка partners.baners */}
                    {pageData.page === "partners" && pageData.baners && (
                        <div className="flex flex-col gap-4 mb-4">
                            <label className="font-medium mb-2">Партнёры (баннеры):</label>
                            {pageData.baners.map((banner, idx) => (
                                <div key={idx} className="flex items-center gap-4 border p-2 rounded">
                                    {banner.image && (
                                        <img
                                            src={banner.image}
                                            alt="partner"
                                            className="w-20 h-20 object-contain bg-white border rounded"
                                        />
                                    )}

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                const updated = [...pageData.baners];
                                                updated[idx].image = reader.result;
                                                updatePageData(pageData.page, "baners", updated);
                                            };
                                            reader.readAsDataURL(file);
                                        }}
                                    />

                                    <button
                                        className="text-red-500 text-sm"
                                        onClick={() => {
                                            const updated = pageData.baners.filter((_, i) => i !== idx);
                                            updatePageData(pageData.page, "baners", updated);
                                        }}
                                    >
                                        Удалить
                                    </button>
                                </div>
                            ))}

                            <button
                                className="text-sm text-blue-600 border p-1 w-fit rounded"
                                onClick={() =>
                                    updatePageData(pageData.page, "baners", [...pageData.baners, { image: "" }])
                                }
                            >
                                Добавить баннер
                            </button>
                        </div>
                    )}

                    {/* Обработка vacancies.vacancyData */}
                    {pageData.page === "vacancies" && pageData.vacancyData && (
                        <div className="flex flex-col gap-4 mb-4">
                            <label className="font-medium mb-2">Вакансии:</label>
                            {pageData.vacancyData.map((vacancy, idx) => (
                                <div key={vacancy.id} className="flex flex-col gap-2 border p-2 rounded">
                                    <input
                                        className="p-1 border rounded"
                                        placeholder="mainTitle"
                                        value={vacancy.mainTitle}
                                        onChange={(e) => {
                                            const updated = [...pageData.vacancyData];
                                            updated[idx].mainTitle = e.target.value;
                                            updatePageData(pageData.page, "vacancyData", updated);
                                        }}
                                    />
                                    <textarea
                                        className="p-1 border rounded"
                                        placeholder="shortInfo"
                                        value={vacancy.shortInfo}
                                        onChange={(e) => {
                                            const updated = [...pageData.vacancyData];
                                            updated[idx].shortInfo = e.target.value;
                                            updatePageData(pageData.page, "vacancyData", updated);
                                        }}
                                    />
                                    <input
                                        className="p-1 border rounded"
                                        placeholder="title1"
                                        value={vacancy.title1}
                                        onChange={(e) => {
                                            const updated = [...pageData.vacancyData];
                                            updated[idx].title1 = e.target.value;
                                            updatePageData(pageData.page, "vacancyData", updated);
                                        }}
                                    />
                                    <textarea
                                        className="p-1 border rounded"
                                        placeholder="description1"
                                        value={vacancy.description1}
                                        onChange={(e) => {
                                            const updated = [...pageData.vacancyData];
                                            updated[idx].description1 = e.target.value;
                                            updatePageData(pageData.page, "vacancyData", updated);
                                        }}
                                    />
                                    <input
                                        className="p-1 border rounded"
                                        placeholder="title2"
                                        value={vacancy.title2}
                                        onChange={(e) => {
                                            const updated = [...pageData.vacancyData];
                                            updated[idx].title2 = e.target.value;
                                            updatePageData(pageData.page, "vacancyData", updated);
                                        }}
                                    />
                                    <textarea
                                        className="p-1 border rounded"
                                        placeholder="description2"
                                        value={vacancy.description2}
                                        onChange={(e) => {
                                            const updated = [...pageData.vacancyData];
                                            updated[idx].description2 = e.target.value;
                                            updatePageData(pageData.page, "vacancyData", updated);
                                        }}
                                    />
                                    <input
                                        className="p-1 border rounded"
                                        placeholder="title3"
                                        value={vacancy.title3}
                                        onChange={(e) => {
                                            const updated = [...pageData.vacancyData];
                                            updated[idx].title3 = e.target.value;
                                            updatePageData(pageData.page, "vacancyData", updated);
                                        }}
                                    />
                                    <textarea
                                        className="p-1 border rounded"
                                        placeholder="description3"
                                        value={vacancy.description3}
                                        onChange={(e) => {
                                            const updated = [...pageData.vacancyData];
                                            updated[idx].description3 = e.target.value;
                                            updatePageData(pageData.page, "vacancyData", updated);
                                        }}
                                    />

                                    <button
                                        className="text-red-500 text-sm self-start"
                                        onClick={() => {
                                            const updated = pageData.vacancyData.filter((_, i) => i !== idx);
                                            updatePageData(pageData.page, "vacancyData", updated);
                                        }}
                                    >
                                        Удалить вакансию
                                    </button>
                                </div>
                            ))}

                            <button
                                className="text-sm text-blue-600 border p-1 w-fit rounded"
                                onClick={() => {
                                    const newVacancy = {
                                        id: Date.now().toString(),
                                        mainTitle: '',
                                        shortInfo: 'Опыт работы:\n' +
                                            'Полная занятость\n' +
                                            'График: 5/2\n' +
                                            'Рабочие часы: 8',
                                        title1: 'Обязанности:',
                                        description1: '',
                                        title2: 'Требования:',
                                        description2: '',
                                        title3: 'Условия:',
                                        description3: '',
                                    };
                                    updatePageData(pageData.page, "vacancyData", [...pageData.vacancyData, newVacancy]);
                                }}
                            >
                                Добавить вакансию
                            </button>
                        </div>
                    )}

                    {/* Универсальные текстовые поля */}
                    {Object.entries(pageData).map(([key, value]) => {
                        if (["page", "visible", "members", "baners", "vacancyData"].includes(key)) return null;

                        return (
                            <div className="flex flex-col mb-4" key={key}>
                                <label className="mb-1 font-medium">{key}:</label>
                                <textarea
                                    className="p-2 border rounded"
                                    rows={2}
                                    value={value}
                                    onChange={handleChange(pageData.page, key)}
                                />
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default Admin;







