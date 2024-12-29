'use client';

import React from 'react';
import ImageCarusel from '../../ImageCarusel/ImageCarusel';
import Certificates from './Certificates';

const CertificatesContainer = () => {
  const certificatesData1 = [
    {
      description:
        'Выписка из реестра членов саморегулируемой организации в составе единого реестра сведений о членах саморегулируемых организаций в области строительства, реконструкции, капитального ремонта, сноса объектов капитального строительства и их обязательствах от 13.09.2024',
      images: ['/certificates/certificates1-1-1.svg', '/certificates/certificates1-1-2.svg'],
    },
    {
      description:
        'Выписка из реестра членов саморегулируемой организации в составе единого реестра сведений о членах саморегулируемых организаций в области строительства, реконструкции, капитального ремонта, сноса объектов капитального строительства и их обязательствах от 13.09.2024',
      images: ['/certificates/certificates2-1-1.svg', '/certificates/certificates2-1-2.svg'],
    },
  ];

  const certificatesData2 = [
    {
      description:
        'Выписка о подаче результатов проведения специальной оценки условий труда в Федеральную государственную информационную систему учета результатов проведения специальной оценки условий труда 27.07.2023',
      images: ['/certificates/certificates1-2-1.svg', '/certificates/certificates1-2-2.svg'],
    },
    {
      description:
        'Выписка о подаче результатов проведения специальной оценки условий труда в Федеральную государственную информационную систему учета результатов проведения специальной оценки условий труда 27.07.2023',
      images: ['/certificates/certificates2-2-1.svg', '/certificates/certificates2-2-2.svg'],
    },
    {
      description:
        'Выписка о подаче результатов проведения специальной оценки условий труда в Федеральную государственную информационную систему учета результатов проведения специальной оценки условий труда 27.07.2023',
      images: ['/certificates/certificates3-2-1.svg'],
    },
  ];

  return (
    <div
      className="pl-[15px] pr-[19px] pt-[60px] pb-[60px]"
      id="CertificatesContainer"
    >
      <h2 className="text-[30px] font-[500] mb-[24px]">СЕРТИФИКАТЫ</h2>
      <div className="mb-[60px]">
        <ImageCarusel
          blocks={certificatesData1.map((data, index) => (
            <Certificates key={index} data={[data]}/>
          ))}
        />
      </div>

      <div>
        <ImageCarusel
          blocks={certificatesData2.map((data, index) => (
            <Certificates key={index} data={[data]}/>
          ))}
        />
      </div>
    </div>
  );
};

export default CertificatesContainer;


