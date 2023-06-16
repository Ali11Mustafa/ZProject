import { useLanguageStore } from 'App'
import { useTranslation } from 'react-i18next'


import englishFlag from '../assets/img/EN.png'
import kurdishFlag from '../assets/img/KU.png'
import arabicFlag from '../assets/img/AR.png'
import {  useMemo } from 'react'

function useLangs(){


    const language = useLanguageStore(state=>state.language);
    const {t} = useTranslation()

    const langsDetails = useMemo(()=>[{
        code:'en',
        flag:englishFlag,
        active: language === 'en' ? true : false
      },
      {
        code:'ku',
        flag:kurdishFlag,
        active: language === 'ku' ? true : false
      }
      ,{
        code:'ar',
        flag:arabicFlag,
        active: language === 'ar' ? true : false
      }
      ], [language])

      const languageNames = {
        en: t('langs.en'),
        ku: t('langs.ku'),
        ar: t('langs.ar'),
      }

        const langsList = langsDetails.map((lang) => ({
          ...lang,
          name: languageNames[lang.code],
        }));

        
    return {langsList}
}

export default useLangs