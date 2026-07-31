/**
 * Client-side form delivery via FormSubmit (https://formsubmit.co).
 * Configured in src/config/formConfig.ts
 */

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

export async function submitFormSubmit(
  payload: Record<string, string>,
  turnstileToken: string
): Promise<{ success: boolean }> {
  try {
    const url = `/api/submit`;
    
    // Default form submit attributes
    const formSubmitPayload = {
      ...payload,
      _template: "table",
      _captcha: false,
      turnstileToken,
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formSubmitPayload),
    });
    
    return { success: res.ok };
  } catch {
    return { success: false };
  }
}
