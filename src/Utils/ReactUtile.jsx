import { Suspense } from "react";

export const SuspenseCall = (props) => (
    <Suspense fallback={"loading"}>{props.children}</Suspense>
);