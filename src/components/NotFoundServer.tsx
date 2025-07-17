import { useTranslations } from 'next-intl';

export default function NotFoundServer() {
  const t = useTranslations('NotFound');

  return {
    title: t('title'),
    description: t('description'),
    goBack: t('goBack')
  };
}
