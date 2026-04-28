// import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';

function t(key: string) {
  return key;
}

export default function HomePage() {
  // const { t } = useTranslation();
  const count = useAppStore((state) => state.count);
  const increment = useAppStore((state) => state.increment);

  return (
    <section className="flex flex-col items-start gap-4">
      <h1 className="text-3xl font-bold">{t('app.welcome')}</h1>
      <p className="text-muted-foreground">Count: {count}</p>
      <Button onPress={increment}>Increment</Button>
    </section>
  );
}
