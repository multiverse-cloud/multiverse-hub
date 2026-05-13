import { permanentRedirect } from "next/navigation";

export default function CheckFileHashAliasPage() {
  permanentRedirect("/tools/file/file-hash-checker");
}
