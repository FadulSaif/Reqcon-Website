/**
 * Client-side form delivery via Web3Forms (https://web3forms.com).
 * The access key is public by design (it only identifies the destination
 * inbox) and lives in NEXT_PUBLIC_WEB3FORMS_KEY.
 */
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

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
