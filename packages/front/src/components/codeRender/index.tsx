import hljs from "highlight.js";
import { useState } from 'react';
import { Splitter, Button } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import JsonToTS from "json-to-ts";
import "highlight.js/styles/rainbow.min.css"

const CodeRender = (props: { selectedDocument: Record<any, any>}) => {
    const { selectedDocument } = props;
    const [code, setCode] = useState<any>({});

    const onFetchMock = async () => {
        const result = await fetch(
            // 拼接的规则: 后端访问host + /mock + /项目别名 + /文档路径
            `${import.meta.env.VITE_API_BASE_URI}/mock/${selectedDocument.project.alias}/${selectedDocument.path}`,
            {
                method: selectedDocument.method === 'all' ? 'get' : selectedDocument.method,
            }
        )
        const data = await result.json();
        setCode(data);
    }

    return (
        <div className="flex flex-col h-full">
            <div className="py-1 border-b">
                {/** 当前文档为新节点的时候按钮不可点击  */}
                <Button disabled={selectedDocument.nodeType === 'new'} type="link" icon={<PlayCircleOutlined />} variant="text" onClick={onFetchMock}>预览</Button>
            </div>
            <Splitter layout="vertical" className="flex-1">
                <Splitter.Panel max="80%" min="20%" className="relative p-2 overflow-auto after:content-['Mock'] after:absolute after:block after:top-0 after:right-0 after:py-1 after:px-2 after:bg-[black] after:text-white">
                    <div className="overflow-auto h-full">
                        <pre dangerouslySetInnerHTML={{
                            __html: hljs.highlightAuto(JSON.stringify(code, null, 2), ['json']).value
                        }}>
                        </pre>
                    </div>
                </Splitter.Panel>
                <Splitter.Panel max="80%" min="20%" className="relative p-2 overflow-auto after:content-['TypeScript'] after:absolute after:block after:top-0 after:right-0 after:py-1 after:px-2 after:bg-[black] after:text-white">
                    <div className="overflow-auto h-full">
                        <pre dangerouslySetInnerHTML={{
                            __html: hljs.highlightAuto(JsonToTS(code, { rootName: 'Root' })?.join('\n'), ['typescript']).value
                        }}>
                        </pre>
                    </div>
                </Splitter.Panel>
            </Splitter>
        </div>
    )
}

export default CodeRender;