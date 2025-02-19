import MainPage from "@/app/components/Pages/MainPage/MainPage";
import Specialization from "@/app/components/Pages/Specialization/Specialization";
import Services from "@/app/components/Pages/Services/Services";
import ObjectsContainer from "@/app/components/Pages/Objects/ObjectsContainer";
// import News from "@/app/components/Pages/News/News";
// import TeamContainer from "@/app/components/Pages/Team/TeamContainer";
import AboutСompany from "@/app/components/Pages/AboutСompany/AboutСompany";
import PartnersContainer from "@/app/components/Pages/Partners/PartnersContainer";
import CertificatesContainer from "@/app/components/Pages/Certificates/CertificatesContainer";
import VacanciesContainer from "@/app/components/Pages/Vacancies/VacanciesContainer";



export default function Home() {
  return (
    <main>
      <MainPage/>
      <Specialization/>
      <Services/>
      <ObjectsContainer/>
      {/*<News/>*/}
      {/*<TeamContainer/>*/}
      <AboutСompany/>
      <PartnersContainer/>
      <CertificatesContainer/>
      <VacanciesContainer/>
    </main>
  );
};
