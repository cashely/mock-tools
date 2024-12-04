import MonocoEditor, { useMonaco } from '@monaco-editor/react';
import { useRef, useEffect, useCallback } from 'react';
import { loader } from '@monaco-editor/react';
import actions from './actions.json';

import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker();
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker();
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker();
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

loader.config({
  monaco,
});

loader.config({
  'vs/nls': { availableLanguages: { '*': 'zh-cn' } },
  paths: {
    vs: 'vs',
  },
});



interface IProps {
    value?: string;
    language?: string;
    onChange?: (value?: string) => any;
}

function Editor(props: IProps) {
    const divRef = useRef<HTMLDivElement | null>(null);

    const { value = '', language = 'json'} = props;
    
    const onChange = (value?: string) => {
        props.onChange && props.onChange(value);
    }

    const editorInstance = useMonaco();

    const onHandleEditorMount = (editor: any) => {
      actions.forEach((action) => {
        editor.addAction({
          id: action.id,
          label: action.label,
          contextMenuGroupId: 'actions',
          contextMenuOrder: 1.5,
          run: () => {
            const model = editor.getModel();
            const currentPosition = editor.getPosition() as any;
            const text = action.id;
            model?.applyEdits([{
              range: new monaco.Range(currentPosition?.lineNumber, currentPosition.column, currentPosition.lineNumber, currentPosition?.column + text.length),
              text
            }])
          }
        })
      });
    }

    /**
     * @name 监听窗口变化，重新渲染编辑器大小
     */
    const onResize = useCallback(() => {
      window.requestAnimationFrame(() => {
        const { width = 0, height = 0 } = divRef.current?.getBoundingClientRect() || {};
        
        editorInstance?.editor.getEditors()[0].layout({ width, height })
      })
    }, [editorInstance, divRef.current]);

    useEffect(() => {
      if (!editorInstance) {
        return;
      }


      window.addEventListener('resize', onResize);

      return () => {
        window.removeEventListener('resize', onResize);
      }
    }, [editorInstance])

    return (
        <div className='h-full w-full overflow-hidden' ref={divRef}>
            <MonocoEditor
                height="100%"
                // width={'100%'}
                defaultLanguage={language}
                value={value}
                theme="hcLight"
                onChange={onChange}
                options={{
                    minimap: {
                        enabled: false
                    },
                    renderLineHighlight: 'line',
                    // automaticLayout: true,
                }}
                loading="加载中..."
                onMount={onHandleEditorMount}
            />
        </div>
    )
}

export default Editor;