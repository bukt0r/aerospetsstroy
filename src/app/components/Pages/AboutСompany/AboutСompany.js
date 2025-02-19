const AboutСompany = () => {
  return(
    <div
      id="AboutСompany"
      className="flex flex-col lg:flex-row pl-[15px] pr-[19px] pt-[60px] pb-[60px] text-[#FFFFFFCC] bg-[url('/aboutCompanyBackground.svg')] bg-cover bg-center h-[100vh] w-full lg:bg-[url('/aboutCompanyFullScreen.svg')] lg:px-[60px] xl:px-[100px] lg:py-[100px] lg:justify-between">
      <div>
        <h2 className="text-[30px] font-semibold mb-[40px] xl:text-[64px] xl:leading-none">О КОМПАНИИ</h2>
      </div>
      <div className="xl:text-[20px] lg:w-[560px]">
        <div className="mb-[36px] ">
          <p>
            ООО «АэроСпецСтрой» — надежный подрядчик в сфере промышленного строительства.
            За годы работы компания зарекомендовала себя как эксперт в выполнении строительно-монтажных
            работ (СМР) любого уровня сложности.
          </p>
        </div>

        <div className="mb-[36px]">
          <span>Ключевые преимущества</span>
          <div className="ml-[24px] lg:ml-[32px]">
            <ul className="list-disc">
              <li>Членство в СРО с третьим уровнем ответственности для реализации сложных
                и уникальных проектов.
              </li>
              <li>Лицензия МЧС России на монтаж, обслуживание и ремонт систем пожарной безопасности.</li>
              <li>Высококвалифицированный инженерно-технический персонал с подтвержденной аттестацией.</li>
              <li>Собственная материально-техническая база для выполнения проектов любого масштаба.</li>
            </ul>
          </div>
        </div>

        <div>
          <p>
            На сегодняшний день компания успешно реализует контракты на сумму
            свыше 1,718 млрд рублей, а также активно участвует в тендерах на
            крупнейших электронных площадках. География деятельности расширяется:
            помимо Центрального и Южного федеральных округов, работы планируются
            в Приволжском и Северо-Западном ФО.
          </p>
        </div>
      </div>

    </div>
  );
};

export default AboutСompany;