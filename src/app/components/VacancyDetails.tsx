'use client';

import React from "react";

export default function VacancyDetails({ vacancy, onClose }) {
    if (!vacancy) return <p className="text-red-500">Вакансия не найдена.</p>;

    return (
        <>
            <div className="flex justify-between lg:items-center mb-[20px]">
                <p className="font-[600] text-[20px] xl:text-[32px]">{vacancy.mainTitle || 'Без названия'}</p>
                <button
                    onClick={onClose}
                    className="text-[#6095AB] px-[21px] border-[#6095AB] border-[1px] rounded-2xl xl:text-[20px] hover:bg-[#6095AB99] hover:text-[#FFFFFF] hover:border-none"
                >
                    закрыть
                </button>
            </div>

            {vacancy.shortInfo && <p className="mb-[30px] xl:text-[20px]">{vacancy.shortInfo}</p>}
            {vacancy.title1 && (
                <div className="mb-[30px]">
                    <p className="font-[600]">{vacancy.title1}</p>
                    <p className="xl:text-[20px] whitespace-pre-line">{vacancy.description1}</p>
                </div>
            )}
            {vacancy.title2 && (
                <div className="mb-[30px]">
                    <p className="font-[600]">{vacancy.title2}</p>
                    <p className="xl:text-[20px] whitespace-pre-line">{vacancy.description2}</p>
                </div>
            )}
            {vacancy.title3 && (
                <div className="mb-[60px]">
                    <p className="font-[600]">{vacancy.title3}</p>
                    <p className="xl:text-[20px] whitespace-pre-line">{vacancy.description3}</p>
                </div>
            )}

            <a
                href={`mailto:info@aeross.ru?subject=${encodeURIComponent(`Отклик на вакансию: ${vacancy.mainTitle}`)}`}
                className="inline-block text-[#FFFFFF] px-[21px] py-[4px] xl:px-[40px] bg-[#6095AB] border-[1px] rounded-2xl xl:text-[20px] hover:bg-[#6095AB99]"
            >
                отправить резюме
            </a>
        </>
    );
}



