/**
 * Client-side form delivery via Web3Forms (https://web3forms.com).
 * The access key is public by design (it only identifies the destination
 * inbox) and lives in NEXT_PUBLIC_WEB3FORMS_KEY.
 */
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

type FormLanguage = "sv" | "en";

/** Structured template used when the visitor asks for a complete team. */
export function buildFullTeamMessage(language: FormLanguage, serviceLabel?: string): string {
  if (language === "sv") {
    const intro = serviceLabel
      ? `Hej! Vi vill bygga ett komplett team inom ${serviceLabel}.`
      : "Hej! Vi vill bygga ett komplett team.";
    return `${intro}\n\nRoller vi behöver: \nAntal personer: \nÖnskad start: \nUppdragets längd: `;
  }
  const intro = serviceLabel
    ? `Hello! We would like to build a complete team within ${serviceLabel}.`
    : "Hello! We would like to build a complete team.";
  return `${intro}\n\nRoles we need: \nNumber of people: \nDesired start date: \nAssignment length: `;
}

/** Default message prefill for a chosen service (empty for general enquiries). */
export function buildServiceMessage(slug: string, language: FormLanguage, serviceLabel: string): string {
  if (slug === "fullteam") return buildFullTeamMessage(language);
  if (slug === "general") return "";
  return language === "sv"
    ? `Hej, jag är intresserad av tjänsten ${serviceLabel} och vill gärna få mer information.`
    : `Hello, I am interested in the ${serviceLabel} service and would like to receive more information.`;
}

export async function submitWeb3Form(
  payload: Record<string, string>
): Promise<{ success: boolean }> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (!accessKey || accessKey === "YOUR_KEY_HERE") {
    return { success: false };
  }

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        ...payload,
      }),
    });
    const data = await res.json();
    return { success: Boolean(data?.success) };
  } catch {
    return { success: false };
  }
}
