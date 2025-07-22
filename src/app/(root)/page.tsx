"use client"

import MainPage from "@/app/components/Pages/MainPage/MainPage";
import Specialization from "@/app/components/Pages/Specialization/Specialization";
import Services from "@/app/components/Pages/Services/Services";
import ObjectsContainer from "@/app/components/Pages/Objects/ObjectsContainer";
import News from "@/app/components/Pages/News/News";
import TeamContainer from "@/app/components/Pages/Team/TeamContainer";
import AboutCompany from "@/app/components/Pages/AboutCompany/AboutCompany";
import PartnersContainer from "@/app/components/Pages/Partners/PartnersContainer";
import CertificatesContainer from "@/app/components/Pages/Certificates/CertificatesContainer";
import VacanciesContainer from "@/app/components/Pages/Vacancies/VacanciesContainer";
import { useAdminContent } from "@/hooks/useAdminContent"
import AdminNav from "@/components/AdminNav";
import FirestoreStatus from "@/components/FirestoreStatus";


export default function Home() {
    const { getPageData } = useAdminContent();
    const news = getPageData("news");
    const team = getPageData("team");
    const vacancies = getPageData("vacancies");
  return (
    <main>
        <MainPage />
        <Specialization />
        <Services />
        <ObjectsContainer />

        {news?.visible && (
            <News
                title={news.title}
                subtitle={news.subtitle}
                description={news.description}
            />
        )}

        {team?.visible && (
            <TeamContainer
                title={team.title}
                subtitle={team.subtitle}
                description={team.description}
                members={team.members}
            />
        )}

        <AboutCompany />
        <PartnersContainer />
        <CertificatesContainer />

        {vacancies?.visible && (
            <VacanciesContainer
                title={vacancies.title}
                vacancyData={vacancies.vacancyData}
            />
        )}
        <AdminNav />
        <FirestoreStatus />
    </main>
  );
};
