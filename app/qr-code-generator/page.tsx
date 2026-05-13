import { permanentRedirect } from "next/navigation";

export default function QrCodeGeneratorAliasPage() {
  permanentRedirect("/tools/image/qr-code-generator");
}
