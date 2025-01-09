import React from 'react';
import hljs from "highlight.js";
import "highlight.js/styles/rainbow.min.css";

type TProps = {
    code: string;
    lang?: string;
}

const CodeLight: React.FC<TProps> = function CodeLight(props = { code: '', lang: 'typescript' }) {
    const { code, lang } = props;
    return (
        <pre
            dangerouslySetInnerHTML={{
                __html: hljs.highlightAuto(code, [lang as any]).value
            }}
            onClick={(e) => { e.stopPropagation()}}
        >
        </pre>
    )
}

export default CodeLight;