import ToolPage from "@/components/tools/ToolPage";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/config";

export default async function Page() {
  const dict = await getDictionary(defaultLocale);
  return (
    <ToolPage
      slug="merge-pdf"
      content={dict.tools["merge-pdf"]}
      common={dict.common}
    />
  );
}
