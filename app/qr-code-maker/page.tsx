import { permanentRedirect } from "next/navigation";

export default function QrCodeMakerAliasPage() {
  permanentRedirect("/tools/image/qr-code-generator");
}
