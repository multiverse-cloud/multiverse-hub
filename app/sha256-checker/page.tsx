import { permanentRedirect } from "next/navigation";

export default function Sha256CheckerAliasPage() {
  permanentRedirect("/tools/file/file-hash-checker");
}
