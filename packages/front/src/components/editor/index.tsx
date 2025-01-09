import MonocoEditor, { useMonaco } from '@monaco-editor/react';
import { useRef, useEffect, useCallback } from 'react';
import { loader } from '@monaco-editor/react';

import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

import {  setupContextMenuFeature } from './subMenu.tsx';

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
  getWorkerUrl: function (moduleId, label) {
		if (label === 'json') {
			return './json.worker.bundle.js';
		}
		if (label === 'css' || label === 'scss' || label === 'less') {
			return './css.worker.bundle.js';
		}
		if (label === 'html' || label === 'handlebars' || label === 'razor') {
			return './html.worker.bundle.js';
		}
		if (label === 'typescript' || label === 'javascript') {
			return './ts.worker.bundle.js';
		}
		return './editor.worker.bundle.js';
	}
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
    width?: number,
    onChange?: (value?: string) => any;
}

function Editor(props: IProps) {
    const divRef = useRef<HTMLDivElement | null>(null);

    const { value = '', language = 'json', width = 300 } = props;
    
    const onChange = (value?: string) => {
        props.onChange && props.onChange(value);
    }

    const editorInstance = useMonaco();

    const onHandleEditorMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
      setupContextMenuFeature(editor);
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
                width={width}
                defaultLanguage={language}
                value={value}
                theme="hcLight"
                onChange={onChange}
                options={{
                    minimap: {
                        enabled: false
                    },
                    renderLineHighlight: 'line',
                    scrollbar: {
                        alwaysConsumeMouseWheel: false,
                        vertical: 'auto',
                        verticalScrollbarSize: 5,
                        horizontalScrollbarSize: 5
                    },
                    stickyScroll: {
                        enabled: true,
                        maxLineCount: 10000,
                    },
                    contextmenu: false
                    // automaticLayout: true,
                }}
                loading="加载中..."
                onMount={onHandleEditorMount}
            />
        </div>
    )
}

export default Editor;