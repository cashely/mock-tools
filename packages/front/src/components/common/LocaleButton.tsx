import { useCallback } from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { setLocaleToLocalStorage } from '../../utils';

function LocaleButton() {
    const { i18n } = useTranslation();

    const language = i18n.language;

    const onClick = useCallback(() => {
        const newLanguage = language === 'en'? 'zh' : 'en';
        i18n.changeLanguage(newLanguage);
        setLocaleToLocalStorage(newLanguage);
    }, [language]);
    return (
        <Button variant='link' color='primary' className='border rounded-md px-4 py-2 relative' onClick={onClick}>
            <span className='absolute -translate-x-[3px] p-0 bg-gray-500 px-1 leading-1 text-[10px] text-white z-10'>{language === 'en' ? 'EN' : '中'}</span>
            <span className='absolute text-[10px] text-gray-500 translate-y-[8px] translate-x-[5px]'>{language === 'en' ? '中' : 'EN'}</span>
        </Button>
    );
}

export default LocaleButton;