import { permanentRedirect } from "next/navigation";

export default function QrVerseAliasPage() {
  permanentRedirect("/tools/image/qr-code-generator");
}
