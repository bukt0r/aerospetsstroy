"use client"

import MainPage from "@/app/components/Pages/MainPage/MainPage";
import Specialization from "@/app/components/Pages/Specialization/Specialization";
import Services from "@/app/components/Pages/Services/Services";
import ObjectsContainer from "@/app/components/Pages/Objects/ObjectsContainer";
import News from "@/app/components/Pages/News/News";
import TeamContainer from "@/app/components/Pages/Team/TeamContainer";
import AboutCompany from "@/app/components/Pages/AboutСompany/AboutСompany";
import PartnersContainer from "@/app/components/Pages/Partners/PartnersContainer";
import CertificatesContainer from "@/app/components/Pages/Certificates/CertificatesContainer";
import VacanciesContainer from "@/app/components/Pages/Vacancies/VacanciesContainer";
import { useAdminContent } from "@/hooks/useAdminContent"
import AdminNav from "@/components/AdminNav";


export default function Home() {
    const { getPageData } = useAdminContent();
    const main = getPageData("main");
    const specialization = getPageData("specialization");
    const services = getPageData("services");
    const objects = getPageData("objects");
    const news = getPageData("news");
    const team = getPageData("team");
    const aboutCompany = getPageData("aboutCompany");
    const partners = getPageData("partners");
    const certificates = getPageData("certificates");
    const vacancies = getPageData("vacancies");
  return (
    <main>
        {main && <MainPage title={main.title} email={main.email} phone={main.phone} />}
        {specialization && <Specialization title={specialization.title} description={specialization.description} subtitle1={specialization.subtitle1} description1={specialization.description1} subtitle2={specialization.subtitle2} description2={specialization.description2} />}

        {services?.visible && services && (
            <Services
                title={services.title}
                subtitle1={services.subtitle1}
                description1={services.description1}
                description2={services.description2}
            />
        )}

        {objects?.visible && (
            <ObjectsContainer
                title={objects.title}
                objectsData={objects.objectsData}
            />
        )}

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

        {aboutCompany?.visible && (
            <AboutCompany
                title={aboutCompany.title}
                paragraph1={aboutCompany.paragraph1}
                subtitle={aboutCompany.subtitle}
                row1={aboutCompany.row1}
                row2={aboutCompany.row2}
                row3={aboutCompany.row3}
                row4={aboutCompany.row4}
                paragraph2={aboutCompany.paragraph2}
            />
        )}


        {partners?.visible && (
            <PartnersContainer
                title={partners.title}
                baners={partners.baners}
            />
        )}

        {certificates?.visible && (
            <CertificatesContainer
                title={certificates.title}
                documents={certificates.documents}
            />
        )}

        {vacancies?.visible && (
            <VacanciesContainer
                title={vacancies.title}
                vacancyData={vacancies.vacancyData}
            />
        )}
        <AdminNav />
    </main>
  );
};
