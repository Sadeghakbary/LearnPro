import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import type { ReactElement, ReactNode, ReactPortal } from "react";
import { direction } from "../localization/";

const rtlcache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const ltrcache = createCache({
  key: "mui",
});

export default function Rtl(props: {
  children:
    | string
    | number
    | boolean
    | ReactElement
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined;
}) {
  return (
    <CacheProvider value={direction === "rtl" ? rtlcache : ltrcache}>
      {props.children}
    </CacheProvider>
  );
}
