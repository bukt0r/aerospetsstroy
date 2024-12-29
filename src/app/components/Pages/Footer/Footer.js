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
    <div className="">
      <div
        className="flex flex-col pl-[15px] pr-[19px] pt-[44px] pb-[60px] bg-gradient-to-b from-[#9FBBD9] to-[#467CB6]">
        <div className="flex items-center gap-[9px]">
          <img src="/footerLogo.svg" alt="logo"/>
          <p className="text-[20px] font-[500]">АэроСпецСтрой</p>
        </div>
        <div className="flex gap-[69px] mt-[29px] mb-[52px] font-[400] text-[#111111B2]">
          <div className="flex flex-col gap-[8px]">
            <div class="transition-transform duration-300 hover:scale-110 "><a href="#Specialization">специализация</a></div>
            <div class="transition-transform duration-300 hover:scale-110 "><a href="#Services">услуги</a></div>
            <div class="transition-transform duration-300 hover:scale-110 "><a href="#ObjectsContainer">проекты</a></div>
            <div class="transition-transform duration-300 hover:scale-110 "><a href="#News">новости</a></div>
            <div class="transition-transform duration-300 hover:scale-110 "><a href="#TeamContainer">команда</a></div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <div class="transition-transform duration-300 hover:scale-110"><a href="#AboutСompany">о компании</a></div>
            <div class="transition-transform duration-300 hover:scale-110"><a href="#PartnersContainer">партнеры</a></div>
            <div class="transition-transform duration-300 hover:scale-110"><a href="#Certificates">сертификаты</a></div>
            <div class="transition-transform duration-300 hover:scale-110"><a href="#Vacancies">вакансии</a></div>
          </div>
        </div>
        <div className="flex flex-col gap-[8px] mb-[58px] font-[400] text-[#111111B2]">
          <div>инн / кпп : 2304076809 / 230401001</div>
          <div>огрн : 1202300054967</div>
          <div>р/с : 40702810402100005017</div>
          <div>к/с : З0101810745250000769</div>
          <div>бик : 044525769</div>
          <div>банк : ДО ББР Банка (АО), г.Санкт-Петербург</div>
        </div>
        <div className="flex flex-col gap-[8px] font-[500]">
          <div>офис в Санкт-Петербурге : +7(931)319-25-05</div>
          <div>отдел снабжения : +7(928)435-56-00</div>
          <div>email : info@aeross.ru</div>
          <div>Фактический адрес :196084, г. Санкт-Петербург, ул. Смоленская, д. 7 лит. Б, оф. 205, 206, 207</div>
          <div>Юридический адрес : 353460, Краснодарский край, г. Геленджик, ул. Тельмана, д. 137, ком. 36</div>
        </div>
      </div>

      <footer className="pl-[15px] py-[12px]">
        <p className="text-[#46484980]">ООО “АэроСпецСтрой”</p>
      </footer>
    </div>
  );
};

export default Footer;