import { Suspense } from "react";

export const SuspenseCall = (props) => (
    <Suspense fallback={<Skeleton/>}>{props.children}</Suspense>
);

const Skeleton =()=>{
    return <div className="skeleton">
        <div className="left-pan"></div>
        <div className="right-pan"></div>
    </div>
}