import AboutСompany from "@/app/components/Pages/AboutСompany/AboutСompany";
import Certificates from "@/app/components/Pages/Certificates/Certificates";
import News from "@/app/components/Pages/News/News";
import Partners from "@/app/components/Pages/Partners/Partners";
import Services from "@/app/components/Pages/Services/Services";
import Specialization from "@/app/components/Pages/Specialization/Specialization";
import Team from "@/app/components/Pages/Team/Team";
import Vacancies from "@/app/components/Pages/Vacancies/Vacancies";

const Footer =()=>{
  return(
    <div id="Footer">
      <div
        className="flex flex-col pl-[15px] pr-[19px] pt-[44px] pb-[60px] bg-gradient-to-b from-[#9FBBD9] to-[#467CB6] lg:px-[60px]">
        <div className="flex items-center gap-[9px] lg:justify-between lg:gap-[0px]">
          <div className="lg:w-[33%]">
            <img className="xl:w-[100px] xl:h-[100px] cursor-pointer" onClick={() => (window.location.href = '#MainPage')} src="/footerLogo.svg" alt="logo"/>
          </div>
          <div className="hidden lg:block lg:w-[30%]"></div>
          <div className="lg:w-[34%]"><p className="text-[#464849] text-[20px] xl:text-[32px] font-[500]">АэроСпецСтрой</p></div>
        </div>
        <div className="mt-[29px] xl:mt-[41px] lg:flex xl:text-[20px]">
          <div className="flex gap-[69px] mb-[52px] font-[400] text-[#111111B2] lg:w-[33%]">
            <div className="flex flex-col gap-[8px]">
              <div className="hover:underline"><a
                href="#Specialization">специализация</a></div>
              <div className="hover:underline"><a href="#Services">услуги</a></div>
              <div className="hover:underline"><a href="#ObjectsContainer">проекты</a>
              </div>
              <div className="hover:underline"><a href="#News">новости</a></div>
              <div className="hover:underline"><a href="#TeamContainer">команда</a></div>
            </div>
            <div className="flex flex-col gap-[8px]">
              <div className="hover:underline"><a href="#AboutСompany">о компании</a>
              </div>
              <div className="hover:underline"><a href="#PartnersContainer">партнеры</a>
              </div>
              <div className="hover:underline">
                <a href="#CertificatesContainer">сертификаты</a></div>
              <div className="hover:underline"><a href="#VacanciesContainer">вакансии</a></div>
            </div>
          </div>
          <div className="flex flex-col gap-[8px] mb-[58px] font-[400] text-[#111111B2] lg:w-[33%]">
            <div>инн / кпп : 2304076809 / 230401001</div>
            <div>огрн : 1202300054967</div>
            <div>р/с : 40702810402100005017</div>
            <div>к/с : З0101810745250000769</div>
            <div>бик : 044525769</div>
            <div>банк : ДО ББР Банка (АО), г.Санкт-Петербург</div>
          </div>
          <div className="flex flex-col gap-[8px] font-[500] lg:w-[33%]">
            <div>офис в Санкт-Петербурге : +7(931)319-25-05</div>
            <div>отдел снабжения : +7(928)435-56-00</div>
            <div>email : info@aeross.ru</div>
            <div>Фактический адрес :196084, г. Санкт-Петербург, ул. Смоленская, д. 7 лит. Б, оф. 205, 206, 207</div>
            <div>Юридический адрес : 353460, Краснодарский край, г. Геленджик, ул. Тельмана, д. 137, ком. 36</div>
          </div>
        </div>
      </div>

      <footer className="pl-[15px] py-[12px] xl:px-[60px]">
        <p className="text-[#46484980] xl:text-[20px]">ООО “АэроСпецСтрой”</p>
      </footer>
    </div>
  );
};

export default Footer;