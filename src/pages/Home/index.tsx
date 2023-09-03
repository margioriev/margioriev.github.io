import { Tab, TabList, TabPanel, TabPanels, Tabs, useColorMode } from "@chakra-ui/react";
import { useTranslation, Trans } from "react-i18next";
import ReactMarkdown from "react-markdown";
import './style.css'



export const Home = () => {
  const { t } = useTranslation();
  const { colorMode } = useColorMode()
  const textColor = colorMode==='light'? 'blue.800': 'blue.200'
  return (
    <Tabs variant='soft-rounded' size='lg' >
      <TabList style={{paddingTop: '1rem'}}>
        <Tab fontSize='medium' textColor={textColor}>{t("tab_bar.about")} \(•◡•)/</Tab>
        <Tab fontSize='medium' textColor={textColor}>{t("tab_bar.tecnologies")}  ( ､ᐛ)､＿/ </Tab>
        <Tab fontSize='medium' textColor={textColor}>{t("tab_bar.contact")} ( ^_^)✎</Tab>
      </TabList>
      <TabPanels>
        <TabPanel style={{paddingTop: '1rem'}}>
          <p>{t("tab_panel.about_p1")} </p>
          <p>{t("tab_panel.about_p2")}</p>
          <p>{t("tab_panel.about_p3")}</p>
          <p>{t("tab_panel.about_p4")}</p>
        </TabPanel>
        {/* <TabPanel>
          <p>{t("tab_panel.curricullum")}</p>
        </TabPanel> */}
        <TabPanel>
        <p className="tech-title">{t("tab_panel.tecnologies_p1")}</p>
        <div className="tech-wrapper">
        <ReactMarkdown>
              ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
            </ReactMarkdown>
            <ReactMarkdown>
              ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
            </ReactMarkdown>
            <ReactMarkdown>
              ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
            </ReactMarkdown>
            <ReactMarkdown>
              ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
            </ReactMarkdown>
            <ReactMarkdown>
![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)
            </ReactMarkdown>
            <ReactMarkdown>
              ![Next
              JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
            </ReactMarkdown>
            <ReactMarkdown>
              ![React
              Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
            </ReactMarkdown>
            <ReactMarkdown>
              ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
            </ReactMarkdown>
            <ReactMarkdown>
              ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
            </ReactMarkdown>
            <ReactMarkdown>
              ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
            </ReactMarkdown>
            <ReactMarkdown>
              ![Chakra](https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white)      
            </ReactMarkdown>
</div>

         <p className="tech-title">{t("tab_panel.tecnologies_p2")}</p>
          <div className="tech-wrapper">
            <ReactMarkdown>
            ![DjangoREST](https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray)
            </ReactMarkdown>
            <ReactMarkdown>
              ![jQuery](https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white)
            </ReactMarkdown>
            <ReactMarkdown>
              ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
            </ReactMarkdown>
            <ReactMarkdown>
              ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
            </ReactMarkdown>
            <ReactMarkdown>
              ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
            </ReactMarkdown>
          </div>

          <p className="tech-title">{t("tab_panel.tecnologies_p3")}</p>
          <div className="tech-wrapper">
          <ReactMarkdown>
              ![C++](https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white)
            </ReactMarkdown>
            <ReactMarkdown>
            ![C](https://img.shields.io/badge/c-%2300599C.svg?style=for-the-badge&logo=c&logoColor=white)
            </ReactMarkdown>
            <ReactMarkdown>
            ![C#](https://img.shields.io/badge/c%23-%23239120.svg?style=for-the-badge&logo=c-sharp&logoColor=white)
            </ReactMarkdown>
            <ReactMarkdown>![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)</ReactMarkdown>
            <ReactMarkdown>
            ![Unity](https://img.shields.io/badge/unity-%23000000.svg?style=for-the-badge&logo=unity&logoColor=white)
            </ReactMarkdown>

          </div>

        </TabPanel>
        <TabPanel>
          <p>{t("tab_panel.contact")}</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
