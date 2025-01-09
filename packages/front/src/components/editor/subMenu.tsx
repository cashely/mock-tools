import { createRoot } from 'react-dom/client';
import { useRef, useState } from 'react';
// @ts-ignore
import { LinkedList } from 'monaco-editor/esm/vs/base/common/linkedList';
import { editor, Range } from 'monaco-editor';
import { ConfigProvider, Dropdown } from 'antd';
import { MenuProps } from 'antd/lib';

export function setupContextMenuFeature(editor: editor.IStandaloneCodeEditor) {
    document.querySelector('.view-lines')?.addEventListener('contextmenu', (e) => {
        createContextMenu(e as MouseEvent, editor);
        e.preventDefault();
    })
}

function createContextMenu(e: MouseEvent, editor: editor.IStandaloneCodeEditor) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const root = createRoot(div);
    

    function removePanel() {
        document.body.removeChild(div);
        window.removeEventListener('click', removePanel, false);
    }

    window.addEventListener('click', removePanel, false);

    root.render(<ContextMenuPanel event={e} editor={editor} onRemovePanel={removePanel} />);
}

function ContextMenuPanel(props: { event: globalThis.MouseEvent, editor: editor.IStandaloneCodeEditor, onRemovePanel: () => void }) {
    const { event: { pageX, pageY }, editor, onRemovePanel } = props;
    const [open, setOpen] = useState(true);

    const divRef = useRef<HTMLDivElement>(null);

    const insertActionToEditor = (editor: editor.IStandaloneCodeEditor, text: string) => {
        const currentPosition = editor.getPosition() as any;
        editor?.executeEdits('', [{
          range: new Range(currentPosition?.lineNumber, currentPosition.column, currentPosition.lineNumber, currentPosition?.column),
          text,
        }])
    }

    const closePanel = () => {
        setOpen(false);
    }

    const onOpenChange = (open: boolean) => {
        if (!open) {
            
            closePanel();
            onRemovePanel();
        }
    }

    const commandActions: MenuProps['items'] = [
        {
            key: '数字类型',
            label: '数字类型',
            children: [
                {
                    key: '@natural',
                    label: '自然数',
                    onClick: insertActionToEditor.bind(null, editor, '@natural'),
                },
                { type: 'divider' },
                {
                    key: '@integer',
                    label: '整数类型',
                    onClick: insertActionToEditor.bind(null, editor, '@integer'),
                },
                { type: 'divider' },
                {
                    key: '@float',
                    label: '浮点数类型',
                    onClick: insertActionToEditor.bind(null, editor, '@float'),
                }
            ]
        },
        {  type: 'divider'  },
        {
            key: '@boolean',
            label: '布尔类型',
            onClick: insertActionToEditor.bind(null, editor, '@boolean'),
        },
        {  type: 'divider'  },
        {
            key: '字符',
            label: '字符类型',
            children: [
                {
                    key: '@character',
                    label: '单字符类型',
                    onClick: insertActionToEditor.bind(null, editor, '@character'),
                },
                { type: 'divider' },
                {
                    key: '@string',
                    label: '字符串类型',
                    onClick: insertActionToEditor.bind(null, editor, '@string'),
                }
            ]
        },
        {   type: 'divider' },
        {
            key: '@range',
            label: '数字数组',
            onClick: insertActionToEditor.bind(null, editor, '@range'),
        },
        {  type: 'divider'  },
        {
            key: '时间类型',
            label: '时间类型',
            children: [
                {
                    key: '@date',
                    label: '日期类型',
                    onClick: insertActionToEditor.bind(null, editor, '@date'),
                },
                { type: 'divider' },
                {
                    key: '@time',
                    label: '时间类型',
                    onClick: insertActionToEditor.bind(null, editor, '@time'),
                },
                { type: 'divider' },
                {
                    key: '@datetime',
                    label: '日期时间类型',
                    onClick: insertActionToEditor.bind(null, editor, '@datetime'),
                },
                { type: 'divider' },
                {
                    key: '@now',
                    label: '当前时间',
                    onClick: insertActionToEditor.bind(null, editor, '@now'),
                }
            ]
        },
        {   type: 'divider'  },
        {
            key: '图片类型',
            label: '图片类型',
            children: [
                {
                    key: '@image',
                    label: '链接类型',
                    onClick: insertActionToEditor.bind(null, editor, '@image'),
                },
                {   type: 'divider'  },
                {
                    key: '@dataImage',
                    label: 'base64类型',
                    onClick: insertActionToEditor.bind(null, editor, '@dataImage'),
                }
            ]
        },
        {
            type: 'divider'
        },
        {
            key: '颜色',
            label: '颜色类型',
            children: [
                {
                    key: '@color',
                    label: '颜色类型',
                    onClick: insertActionToEditor.bind(null, editor, '@color'),
                },
                {   type: 'divider'  },
                {
                    key: '@hex',
                    label: 'HEX颜色类型',
                    onClick: insertActionToEditor.bind(null, editor, '@hex'),
                },
                {   type: 'divider'  },
                {
                    key: '@rgba',
                    label: 'RGBA颜色类型',
                    onClick: insertActionToEditor.bind(null, editor, '@rgba'),
                },
                {   type: 'divider'  },
                {
                    key: '@rgb',
                    label: 'RGB颜色类型',
                    onClick: insertActionToEditor.bind(null, editor, '@rgb'),
                }
            ]
        },
        {   type: 'divider'  },
        {
            key: '文本',
            label: '文本类型',
            children: [
                {
                    key: '@paragraph',
                    label: '英文段落类型',
                    onClick: insertActionToEditor.bind(null, editor, '@paragraph'),
                },
                {   type: 'divider'  },
                {
                    key: '@cparagraph',
                    label: '中文段落类型',
                    onClick: insertActionToEditor.bind(null, editor, '@cparagraph'),
                },
                {   type: 'divider'  },
                {
                    key: '@title',
                    label: '英文标题类型',
                    onClick: insertActionToEditor.bind(null, editor, '@title'),
                },
                {   type: 'divider'  },
                {
                    key: '@ctitle',
                    label: '中文标题类型',
                    onClick: insertActionToEditor.bind(null, editor, '@ctitle'),
                },
                {   type: 'divider'  },
                {
                    key: '@sentence',
                    label: '英文句子类型',
                    onClick: insertActionToEditor.bind(null, editor, '@sentence'),
                },
                {   type: 'divider'  },
                {
                    key: '@csentence',
                    label: '中文句子类型',
                    onClick: insertActionToEditor.bind(null, editor, '@csentence'),
                },
                {   type: 'divider'  },
                {
                    key: '@word',
                    label: '英文单词类型',
                    onClick: insertActionToEditor.bind(null, editor, '@word'),
                },
                {   type: 'divider'  },
                {
                    key: '@cword',
                    label: '中文单词类型',
                    onClick: insertActionToEditor.bind(null, editor, '@cword'),
                }
            ]
        },
        {
            type: 'divider'
        },
        {
            key: '人名',
            label: '人名类型',
            children: [
                {
                    key: '@first',
                    label: '英文姓氏',
                    onClick: insertActionToEditor.bind(null, editor, '@first'),
                },
                {   type: 'divider'  },
                {
                    key: '@cfirst',
                    label: '中文姓氏',
                    onClick: insertActionToEditor.bind(null, editor, '@cfirst'),
                },
                {   type: 'divider'  },
                {
                    key: '@last',
                    label: '英文名',
                    onClick: insertActionToEditor.bind(null, editor, '@last'),
                },
                {   type: 'divider'  },
                {
                    key: '@clast',
                    label: '中文名',
                    onClick: insertActionToEditor.bind(null, editor, '@clast'),
                },
                {   type: 'divider'  },
                {
                    key: '@name',
                    label: '英文全名',
                    onClick: insertActionToEditor.bind(null, editor, '@name'),
                },
                {   type: 'divider'  },
                {
                    key: '@cname',
                    label: '中文全名',
                    onClick: insertActionToEditor.bind(null, editor, '@cname'),
                }
            ]
        },
        {
            type: 'divider'
        },
        {
            key: 'web',
            label: 'Web',
            children: [
                {
                    key: '@url',
                    label: 'url',
                    onClick: insertActionToEditor.bind(null, editor, '@url'),
                },
                {   type: 'divider'  },
                {
                    key: '@domain',
                    label: 'domain',
                    onClick: insertActionToEditor.bind(null, editor, '@domain'),
                },
                {   type: 'divider'  },
                {
                    key: '@protocol',
                    label: 'protocol',
                    onClick: insertActionToEditor.bind(null, editor, '@protocol'),
                },
                {   type: 'divider'  },
                {
                    key: '@tld',
                    label: 'tld',
                    onClick: insertActionToEditor.bind(null, editor, '@tld'),
                },
                {   type: 'divider'  },
                {
                    key: '@email',
                    label: 'email',
                    onClick: insertActionToEditor.bind(null, editor, '@email'),
                },
                {   type: 'divider'  },
                {
                    key: '@ip',
                    label: 'ip',
                    onClick: insertActionToEditor.bind(null, editor, '@ip'),
                },
            ]
        },
        {
            type: 'divider'
        },
        {
            key: '地址',
            label: '地址',
            children: [
                {
                    key: '@region',
                    label: '区域',
                    onClick: insertActionToEditor.bind(null, editor, '@region'),
                },
                {   type: 'divider'  },
                {
                    key: '@province',
                    label: '省份',
                    onClick: insertActionToEditor.bind(null, editor, '@province'),
                },
                {   type: 'divider'  },
                {
                    key: '@city',
                    label: '城市',
                    onClick: insertActionToEditor.bind(null, editor, '@city'),
                },
                {   type: 'divider'  },
                {
                    key: '@county',
                    label: '区县',
                    onClick: insertActionToEditor.bind(null, editor, '@county'),
                },
                {   type: 'divider'  },
                {
                    key: '@zip',
                    label: '邮编',
                    onClick: insertActionToEditor.bind(null, editor, '@zip'),
                },
            ]
        },
        {
            type: 'divider'
        },
        {
            key: 'helper',
            label: '其他',
            children: [
                {
                    key: '@guid',
                    label: 'guid',
                    onClick: insertActionToEditor.bind(null, editor, '@guid'),
                },
                {   type: 'divider'  },
                {
                    key: '@id',
                    label: 'id',
                    onClick: insertActionToEditor.bind(null, editor, '@id'),
                },
                {   type: 'divider'  },
                {
                    key: '@capitalize',
                    label: '首字母大写',
                    onClick: insertActionToEditor.bind(null, editor, "@capitalize('hello')"),
                },
                {   type: 'divider'  },
                {
                    key: '@lower',
                    label: '转换为小写',
                    onClick: insertActionToEditor.bind(null, editor, "@lower('HELLO')"),
                },
                {   type: 'divider'  },
                {
                    key: '@upper',
                    label: '转换为大写',
                    onClick: insertActionToEditor.bind(null, editor, "@upper('hello')"),
                },
                {   type: 'divider'  },
                {
                    key: '@pick',
                    label: '数组内随机选择',
                    onClick: insertActionToEditor.bind(null, editor, "@pick(['a', 'e', 'i', 'o', 'u'])"),
                },
                {   type: 'divider'  },
                {
                    key: '@shuffle',
                    label: '范围内随机排序',
                    onClick: insertActionToEditor.bind(null, editor, "@shuffle(['a', 'e', 'i', 'o', 'u'])"),
                },
                {   type: 'divider'  },
                {
                    key: '@increment',
                    label: '递增',
                    onClick: insertActionToEditor.bind(null, editor, '@increment()'),
                },
            ]
        },
        {
            type: 'divider'
        },
        {
            key: 'formate',
            label: '格式化文档',
            onClick: () => {
                editor.getAction('editor.action.formatDocument')?.run();
            }
        }
    ];

    return (
        <div className='fixed text-nowrap' ref={divRef} style={{ top: pageY, left: pageX }}>
            <ConfigProvider
                theme={{
                    token: {
                        fontSize: 12,
                        
                        borderRadius: 2
                    },
                    components: {
                        Dropdown: {
                            paddingBlock: 3,
                            boxShadowSecondary: '0px 2px 5px rgba(0,0,0,.1)',
                        }
                    }
                }}
            >
                <Dropdown menu={{ items: commandActions }} onOpenChange={onOpenChange} destroyPopupOnHide className=' text-sm' open={open}>
                    <span></span>
                </Dropdown>
            </ConfigProvider>
        </div>
    )
}



