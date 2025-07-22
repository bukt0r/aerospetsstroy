"use client"

import MainPage from "@/app/components/Pages/MainPage/MainPage";
import Specialization from "@/app/components/Pages/Specialization/Specialization";
import Services from "@/app/components/Pages/Services/Services";
import ObjectsContainer from "@/app/components/Pages/Objects/ObjectsContainer";
import News from "@/app/components/Pages/News/News";
import Team from "@/app/components/Pages/Team/Team";
import AboutCompany from "@/app/components/Pages/AboutCompany/AboutCompany";
import PartnersContainer from "@/app/components/Pages/Partners/PartnersContainer";
import CertificatesContainer from "@/app/components/Pages/Certificates/CertificatesContainer";
import VacanciesContainer from "@/app/components/Pages/Vacancies/VacanciesContainer";
import AdminNav from "@/components/AdminNav";
import FirestoreStatus from "@/components/FirestoreStatus";


export default function Home() {
  return (
    <main>
        <MainPage />
        <Specialization />
        <Services />
        <ObjectsContainer />
        <News />
        <Team />
        <AboutCompany />
        <PartnersContainer />
        <CertificatesContainer />
        <VacanciesContainer />
        <AdminNav />
        <FirestoreStatus />
    </main>
  );
};
