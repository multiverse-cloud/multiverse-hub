import { permanentRedirect } from "next/navigation";

export default function FreeQrCodeGeneratorAliasPage() {
  permanentRedirect("/tools/image/qr-code-generator");
}
