import HomeContent from "@/components/HomeContent";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/config";

export default async function Home() {
  const dict = await getDictionary(defaultLocale);
  return <HomeContent locale={defaultLocale} dict={dict} />;
}
